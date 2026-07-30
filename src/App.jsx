import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar.jsx';
import GameBoard from './components/GameBoard.jsx';
import DmTerminal from './components/DmTerminal.jsx';
import DiceRoller from './components/DiceRoller.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import RulesModal from './components/RulesModal.jsx';
import StartSplash from './components/StartSplash.jsx';
import GameOverModal from './components/GameOverModal.jsx';
import VercelAiSetupModal from './components/VercelAiSetupModal.jsx';

import { CARD_TYPES } from './data/cards.js';
import { initializeNewGame, getProcedureBonus, getInjectModifiers, getRandomInject, processProcedureCardPlay, getNextUndiscoveredCategory } from './engine/gameEngine.js';
import {
  getDefaultConfig,
  testConnection,
  selectScenarioCardsWithAi,
  generateScenarioBrief,
  evaluateTurnAction,
  generateInjectNarrative,
  generateGameEndNarrative,
  chatWithIM
} from './engine/aiService.js';

export default function App() {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('bb_ai_config');
    const defaultConfig = getDefaultConfig();
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultConfig, ...parsed };
      } catch (e) {
        console.warn('Failed to parse saved config:', e);
      }
    }
    return defaultConfig;
  });

  const [savedGameData, setSavedGameData] = useState(() => {
    try {
      const saved = localStorage.getItem('bb_saved_game_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved game state from localStorage:', e);
    }
    return null;
  });

  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({ connected: false, message: 'Checking...' });
  const [gameState, setGameState] = useState(() => {
    if (savedGameData && savedGameData.gameState) {
      return savedGameData.gameState;
    }
    return initializeNewGame();
  });
  const [selectedTargetCategory, setSelectedTargetCategory] = useState(() => {
    if (savedGameData && savedGameData.selectedTargetCategory) {
      return savedGameData.selectedTargetCategory;
    }
    return CARD_TYPES.INITIAL;
  });
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [customActionText, setCustomActionText] = useState('');
  
  const [isDiceModalOpen, setIsDiceModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [isVercelSetupOpen, setIsVercelSetupOpen] = useState(() => {
    const chosen = localStorage.getItem('bb_vercel_ai_mode_chosen');
    return !chosen;
  });
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    if (gameState && gameState.phase === 'GAME_OVER') {
      setIsGameOverModalOpen(true);
    }
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem('bb_ai_config', JSON.stringify(config));
    checkConnection(config);
  }, [config]);

  // Persist game state automatically to local storage
  useEffect(() => {
    if (hasGameStarted && gameState) {
      const payload = {
        gameState,
        selectedTargetCategory,
        customActionText,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('bb_saved_game_v1', JSON.stringify(payload));
      setSavedGameData(payload);
    }
  }, [hasGameStarted, gameState, selectedTargetCategory, customActionText]);

  const checkConnection = async (conf) => {
    const result = await testConnection(conf);
    setConnectionStatus({ connected: result.success, message: result.message });
  };



  const handleResumeGame = () => {
    if (savedGameData && savedGameData.gameState) {
      setGameState(savedGameData.gameState);
      if (savedGameData.selectedTargetCategory) {
        setSelectedTargetCategory(savedGameData.selectedTargetCategory);
      }
      if (savedGameData.customActionText) {
        setCustomActionText(savedGameData.customActionText);
      }
      setHasGameStarted(true);
    }
  };

  const handleStartGame = async (customPrompt = '', deckId = 'core-bnh') => {
    localStorage.removeItem('bb_saved_game_v1');
    setSavedGameData(null);
    setHasGameStarted(true);
    setIsGameOverModalOpen(false);
    setIsAiThinking(true);
    const timeStr = new Date().toLocaleTimeString();

    const pendingGame = initializeNewGame(null, deckId);
    pendingGame.customPrompt = customPrompt;
    pendingGame.logs = [
      {
        id: 'brief-pending',
        role: 'dm',
        text: `[INITIALIZING INCIDENT SCENARIO]\n\nAI Incident Master is designing the attack kill-chain and incident briefing${customPrompt ? ` customized for: "${customPrompt}"` : ''}...\n\nPlease stand by while threat vectors and initial SIEM telemetry are selected.`,
        timestamp: timeStr,
        isPending: true
      }
    ];
    setGameState(pendingGame);
    setSelectedTargetCategory(CARD_TYPES.INITIAL);
    setSelectedProcedure(null);
    setCustomActionText('');

    // AI selects scenario cards matching custom prompt & dataset
    const secretCards = await selectScenarioCardsWithAi(customPrompt, config, deckId);
    const configuredGame = initializeNewGame(secretCards, deckId);
    configuredGame.customPrompt = customPrompt;

    // Generate scenario briefing
    const briefText = await generateScenarioBrief(secretCards, config, customPrompt);
    configuredGame.phase = 'PLAYING';
    configuredGame.logs = [
      {
        id: `brief-${Date.now()}`,
        role: 'dm',
        text: briefText,
        timestamp: timeStr
      }
    ];

    setGameState(configuredGame);
    setIsAiThinking(false);
  };

  const handleNewGame = () => {
    if (window.confirm('Start a new game? This will reset your current incident progress.')) {
      handleStartGame();
    }
  };

  const handleReturnToMenu = () => {
    setHasGameStarted(false);
  };

  const handlePlayProcedure = (card) => {
    if (!selectedTargetCategory || gameState.discovered[selectedTargetCategory]) {
      return;
    }
    setSelectedProcedure(card);
    setCustomActionText('');
    setIsDiceModalOpen(true);
  };

  const handleTriggerCustomRoll = () => {
    if (!selectedTargetCategory || gameState.discovered[selectedTargetCategory]) {
      return;
    }
    setSelectedProcedure(null);
    setCustomActionText('');
    setIsDiceModalOpen(true);
  };

  const handleChatMessage = async (text) => {
    if (!text.trim() || isAiThinking) return;
    setIsAiThinking(true);
    const timeStr = new Date().toLocaleTimeString();

    // Log the user's message immediately
    setGameState((prev) => ({
      ...prev,
      logs: [
        ...prev.logs,
        {
          id: `chat-user-${Date.now()}`,
          role: 'chat',
          text: text.trim(),
          timestamp: timeStr
        }
      ]
    }));

    const imResponse = await chatWithIM({
      userMessage: text.trim(),
      secretCards: gameState.secretCards,
      discoveredState: gameState.discovered,
      turnNumber: gameState.turn,
      pastLogs: gameState.logs,
      config
    });

    setGameState((prev) => ({
      ...prev,
      logs: [
        ...prev.logs,
        {
          id: `chat-im-${Date.now()}`,
          role: 'chat_im',
          text: imResponse,
          timestamp: timeStr
        }
      ]
    }));

    setIsAiThinking(false);
  };

  const handleRollComplete = async ({ d20Roll, totalRoll, isSuccess }) => {
    setIsDiceModalOpen(false);
    setIsAiThinking(true);

    const timeStr = new Date().toLocaleTimeString();
    const activeTargetCard = gameState.secretCards[selectedTargetCategory];
    // Inject modifiers: pass activeInject so getProcedureBonus can respect blockedCategories
    const activeInject = gameState.activeInject;
    const { rollPenalty } = getInjectModifiers(activeInject);
    const procedureBonus = selectedProcedure
      ? getProcedureBonus(selectedProcedure, selectedTargetCategory, activeInject)
      : 0;
    const modifier = procedureBonus + rollPenalty; // rollPenalty is negative or 0

    const playerLogText = selectedProcedure
      ? `[PROCEDURE EXECUTED]: "${selectedProcedure.title}" targeting ${selectedTargetCategory.toUpperCase()}`
      : `[CUSTOM ACTION]: "${customActionText || 'General Forensic Scan'}" targeting ${selectedTargetCategory.toUpperCase()}`;

    setGameState((prev) => ({
      ...prev,
      phase: 'AI_THINKING',
      logs: [
        ...prev.logs,
        {
          id: `player-${Date.now()}`,
          role: 'player',
          text: playerLogText,
          timestamp: timeStr,
          rollData: { d20Roll, modifier, totalRoll, isSuccess }
        }
      ]
    }));

    const aiNarrative = await evaluateTurnAction({
      procedureCard: selectedProcedure,
      targetCategory: selectedTargetCategory,
      d20Roll,
      modifier,
      totalRoll,
      isSuccess,
      secretCards: gameState.secretCards,
      discoveredState: gameState.discovered,
      targetCard: activeTargetCard,
      customActionText,
      turnNumber: gameState.turn,
      pastLogs: gameState.logs,
      config
    });

    let updatedDiscovered = { ...gameState.discovered };
    let updatedFailureCount = gameState.failureCount;

    if (isSuccess) {
      updatedDiscovered[selectedTargetCategory] = true;
      updatedFailureCount = 0;
      // Auto advance to next unrevealed target vector
      const nextCategory = getNextUndiscoveredCategory(updatedDiscovered, selectedTargetCategory);
      setSelectedTargetCategory(nextCategory);
    } else {
      updatedFailureCount += 1;
    }

    let injectLog = null;
    let newInject = null;
    const isNat1 = d20Roll === 1;
    const isNat20 = d20Roll === 20;
    const isThreeFails = updatedFailureCount >= 3;

    if (isNat1 || isNat20 || isThreeFails) {
      const injectCard = getRandomInject();
      if (isThreeFails) updatedFailureCount = 0;

      // Wrap with duration tracking
      newInject = { card: injectCard, turnsRemaining: injectCard.mechanic?.duration ?? 1 };

      const triggerReason = isNat1
        ? 'FUMBLE! Natural 1 rolled!'
        : isNat20
        ? 'CRITICAL REACTION! Natural 20 rolled!'
        : '3 Consecutive Failed Investigation Turns!';

      const injectText = await generateInjectNarrative(injectCard, gameState.turn, config);
      injectLog = {
        id: `inject-${Date.now()}`,
        role: 'inject',
        text: `[INJECT TRIGGERED - ${triggerReason}]\n${injectText}`,
        timestamp: timeStr
      };
    }

    const allDiscovered = Object.values(updatedDiscovered).every(Boolean);
    const nextTurn = gameState.turn + 1;
    const isGameOver = allDiscovered || nextTurn > gameState.maxTurns;
    const isWin = allDiscovered;

    let gameEndLog = null;
    if (isGameOver) {
      const endText = await generateGameEndNarrative(isWin, gameState.secretCards, gameState.turn, config);
      gameEndLog = {
        id: `end-${Date.now()}`,
        role: 'dm',
        text: endText,
        timestamp: timeStr
      };

      if (isWin) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }

    setGameState((prev) => {
      let hand = prev.procedureHand;
      let deck = prev.procedureDeck;
      let discard = prev.procedureDiscard;

      if (selectedProcedure) {
        const cardResult = processProcedureCardPlay(selectedProcedure, hand, deck, discard);
        hand = cardResult.procedureHand;
        deck = cardResult.procedureDeck;
        discard = cardResult.procedureDiscard;
      }

      const newLogs = [
        ...prev.logs,
        {
          id: `dm-${Date.now()}`,
          role: 'dm',
          text: aiNarrative,
          timestamp: timeStr
        }
      ];

      if (injectLog) newLogs.push(injectLog);
      if (gameEndLog) newLogs.push(gameEndLog);

      return {
        ...prev,
        turn: isGameOver ? prev.turn : nextTurn,
        phase: isGameOver ? 'GAME_OVER' : 'PLAYING',
        discovered: updatedDiscovered,
        procedureHand: hand,
        procedureDeck: deck,
        procedureDiscard: discard,
        failureCount: updatedFailureCount,
        // Inject lifecycle: new inject takes precedence; otherwise decrement duration
        activeInject: newInject
          ? newInject
          : (prev.activeInject && prev.activeInject.turnsRemaining > 1)
            ? { ...prev.activeInject, turnsRemaining: prev.activeInject.turnsRemaining - 1 }
            : null,
        logs: newLogs,
        isWin,
        stats: {
          totalRolls: prev.stats.totalRolls + 1,
          successes: prev.stats.successes + (isSuccess ? 1 : 0),
          failures: prev.stats.failures + (isSuccess ? 0 : 1)
        }
      };
    });

    setIsAiThinking(false);
  };

  // Derive inject modifiers for pre-roll display (outside handleRollComplete)
  const activeInjectSnap = gameState.activeInject;
  const { rollPenalty: displayPenalty, thresholdDelta: displayThresholdDelta } = getInjectModifiers(activeInjectSnap);
  const calculatedProcedureBonus = selectedProcedure
    ? getProcedureBonus(selectedProcedure, selectedTargetCategory, activeInjectSnap)
    : 0;
  const calculatedModifier = calculatedProcedureBonus; // shown as procedure bonus in breakdown
  const calculatedInjectPenalty = displayPenalty;      // shown separately
  const successThreshold = 11 + displayThresholdDelta;

  if (!hasGameStarted) {
    return (
      <>
        <StartSplash
          config={config}
          connectionStatus={connectionStatus}
          savedGameData={savedGameData}
          onResumeGame={handleResumeGame}
          onStartGame={handleStartGame}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenRules={() => setIsRulesOpen(true)}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          config={config}
          onSave={(newConf) => setConfig(newConf)}
          onClose={() => setIsSettingsOpen(false)}
        />
        <RulesModal
          isOpen={isRulesOpen}
          onClose={() => setIsRulesOpen(false)}
        />
        <VercelAiSetupModal
          isOpen={isVercelSetupOpen}
          config={config}
          onSave={(newConf) => setConfig(newConf)}
          onClose={() => setIsVercelSetupOpen(false)}
        />
      </>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      <Navbar
        gameState={gameState}
        connectionStatus={connectionStatus}
        config={config}
        onNewGame={handleNewGame}
        onReturnToMenu={handleReturnToMenu}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenDebrief={() => setIsGameOverModalOpen(true)}
      />

      <main style={{ flex: 1, padding: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 552px', gap: '0.85rem', overflow: 'hidden' }}>
        
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <GameBoard
            gameState={gameState}
            selectedTargetCategory={selectedTargetCategory}
            onSelectTargetCategory={setSelectedTargetCategory}
            onPlayProcedure={handlePlayProcedure}
            onTriggerCustomRoll={handleTriggerCustomRoll}
          />
        </div>

        <div style={{ height: '100%', overflow: 'hidden' }}>
          <DmTerminal
            logs={gameState.logs}
            isAiThinking={isAiThinking}
            config={config}
            onSendChatMessage={handleChatMessage}
            onClearLogs={() => setGameState((prev) => ({ ...prev, logs: [] }))}
          />
        </div>

      </main>

      <DiceRoller
        isOpen={isDiceModalOpen}
        procedureCard={selectedProcedure}
        targetCategory={selectedTargetCategory}
        modifier={calculatedModifier}
        injectPenalty={calculatedInjectPenalty}
        activeInject={activeInjectSnap}
        successThreshold={successThreshold}
        customActionText={customActionText}
        onChangeCustomAction={setCustomActionText}
        onRollComplete={handleRollComplete}
        onCancel={() => setIsDiceModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        config={config}
        onSave={(newConf) => setConfig(newConf)}
        onClose={() => setIsSettingsOpen(false)}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      <GameOverModal
        isOpen={isGameOverModalOpen}
        gameState={gameState}
        onClose={() => setIsGameOverModalOpen(false)}
        onNewGame={handleNewGame}
      />

      <VercelAiSetupModal
        isOpen={isVercelSetupOpen}
        config={config}
        onSave={(newConf) => setConfig(newConf)}
        onClose={() => setIsVercelSetupOpen(false)}
      />

    </div>
  );
}
