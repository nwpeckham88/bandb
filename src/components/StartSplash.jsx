import React, { useState } from 'react';
import { Shield, Play, Settings, HelpCircle, Cpu, CheckCircle2, AlertCircle, Sparkles, FileText, Layers } from 'lucide-react';
import { AVAILABLE_DECKS } from '../data/cards.js';

export default function StartSplash({
  config,
  connectionStatus,
  savedGameData,
  onResumeGame,
  onStartGame,
  onOpenSettings,
  onOpenRules
}) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedDeckId, setSelectedDeckId] = useState('core-bnh');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartGame(customPrompt, selectedDeckId);
  };

  const hasSavedGame = savedGameData && savedGameData.gameState && savedGameData.gameState.turn > 0;
  const savedTurn = hasSavedGame ? savedGameData.gameState.turn : 1;
  const savedDiscovered = hasSavedGame ? Object.values(savedGameData.gameState.discovered).filter(Boolean).length : 0;

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 30%, rgba(15, 23, 42, 0.95), rgba(5, 8, 14, 0.98))',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* Background Cyber Grid Lines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Main Splash Container Card */}
      <div className="cyber-card" style={{
        maxWidth: '680px',
        width: '100%',
        padding: '2.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 0 50px rgba(0, 243, 255, 0.15)',
        border: '1px solid rgba(0, 243, 255, 0.3)',
        zIndex: 2
      }}>
        
        {/* Brand Shield Badge */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,243,255,0.2), rgba(59,130,246,0.2))',
          padding: '0.85rem',
          borderRadius: '16px',
          border: '2px solid var(--neon-cyan)',
          boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
          marginBottom: '1rem',
          display: 'inline-flex'
        }}>
          <Shield size={42} color="var(--neon-cyan)" />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-header)',
          fontSize: '2.1rem',
          fontWeight: 800,
          letterSpacing: '1px',
          color: '#fff',
          marginBottom: '0.2rem',
          textShadow: '0 0 15px rgba(0, 243, 255, 0.5)'
        }}>
          BACKDOORS <span className="text-cyan-glow">&</span> BREACHES
        </h1>

        <div style={{
          fontSize: '0.82rem',
          color: 'var(--neon-green)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          letterSpacing: '2px',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Sparkles size={14} /> AI INCIDENT MASTER SIMULATOR
        </div>

        <p style={{
          color: 'var(--text-main)',
          fontSize: '0.88rem',
          lineHeight: 1.5,
          maxWidth: '520px',
          marginBottom: '1.25rem'
        }}>
          Step into the Incident Commander seat. Lead your Incident Response team through an AI-narrated cyber attack scenario with strict operational secrecy and tabletop strategy.
        </p>

        {/* AI Provider Status Card */}
        <div style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(15, 21, 35, 0.8)',
          border: `1px solid ${connectionStatus.connected ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 51, 102, 0.3)'}`,
          borderRadius: '8px',
          padding: '0.65rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Cpu size={18} color={connectionStatus.connected ? 'var(--neon-green)' : 'var(--neon-red)'} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                AI PROVIDER: {config.provider === 'ollama' ? 'LOCAL OLLAMA' : 'OPENAI API'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                Model: {config.provider === 'ollama' ? config.ollamaModel : config.openaiModel}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: connectionStatus.connected ? 'var(--neon-green)' : 'var(--neon-red)' }}>
            {connectionStatus.connected ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>
              {connectionStatus.connected ? 'READY' : 'OFFLINE'}
            </span>
          </div>
        </div>

        {/* Deck Selection Component */}
        <div style={{ width: '100%', maxWidth: '480px', marginBottom: '1rem', textAlign: 'left' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '0.35rem' }}>
            <Layers size={13} />
            <span>ACTIVE CARD DECK:</span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {AVAILABLE_DECKS.map((deck) => {
              const isSelected = selectedDeckId === deck.id;
              return (
                <div
                  key={deck.id}
                  onClick={() => deck.isAvailable && setSelectedDeckId(deck.id)}
                  style={{
                    background: isSelected ? 'rgba(0, 255, 136, 0.08)' : 'rgba(8, 11, 17, 0.7)',
                    border: `1px solid ${isSelected ? 'var(--neon-green)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '6px',
                    padding: '0.45rem 0.75rem',
                    cursor: deck.isAvailable ? 'pointer' : 'not-allowed',
                    opacity: deck.isAvailable ? 1 : 0.55,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isSelected ? 'var(--neon-green)' : 'var(--text-main)', fontFamily: 'var(--font-header)' }}>
                      {deck.name}
                    </div>
                    <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)' }}>
                      {deck.description}
                    </div>
                  </div>
                  {deck.isAvailable ? (
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', padding: '0.15rem 0.45rem', borderRadius: '4px', background: isSelected ? 'var(--neon-green)' : 'rgba(0, 243, 255, 0.12)', color: isSelected ? '#080b11' : 'var(--neon-cyan)', fontWeight: 800, flexShrink: 0 }}>
                      {isSelected ? 'ACTIVE' : 'SELECT'}
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-dim)', fontWeight: 600, flexShrink: 0 }}>
                      EXPANSION
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Scenario Prompt Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '480px', marginBottom: '1.25rem', textAlign: 'left' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '0.35rem' }}>
            <FileText size={12} />
            <span>CUSTOM SCENARIO PROMPT / THEME (OPTIONAL):</span>
          </label>
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g. Ransomware attack on healthcare SCADA network, PCI-DSS compliance breach..."
            style={{
              width: '100%',
              background: 'rgba(8, 11, 17, 0.9)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              padding: '0.6rem 0.85rem',
              borderRadius: '6px',
              outline: 'none'
            }}
          />
        </form>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '480px' }}>
          
          {hasSavedGame && (
            <button
              type="button"
              className="cyber-button cyber-button-success"
              onClick={onResumeGame}
              style={{
                padding: '0.85rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                justifyContent: 'center',
                letterSpacing: '1px',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)'
              }}
            >
              <Play size={18} />
              <span>RESUME GAME (TURN {savedTurn}/10 • {savedDiscovered}/4 DISCOVERED)</span>
            </button>
          )}

          <button
            type="button"
            className={`cyber-button ${hasSavedGame ? '' : 'cyber-button-primary'}`}
            onClick={() => {
              if (hasSavedGame) {
                if (window.confirm('Starting a new game will overwrite your current saved incident progress. Proceed?')) {
                  onStartGame(customPrompt, selectedDeckId);
                }
              } else {
                onStartGame(customPrompt, selectedDeckId);
              }
            }}
            style={{
              padding: '0.85rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              justifyContent: 'center',
              letterSpacing: '1px',
              borderRadius: '8px',
              boxShadow: hasSavedGame ? 'none' : '0 0 20px rgba(0, 243, 255, 0.4)'
            }}
          >
            <Play size={18} />
            <span>START NEW GAME</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <button
              type="button"
              className="cyber-button"
              onClick={onOpenRules}
              style={{ justifyContent: 'center', padding: '0.6rem' }}
              title="View step-by-step game rules and turn instructions"
            >
              <HelpCircle size={14} />
              <span>RULES & HOW TO PLAY</span>
            </button>

            <button
              type="button"
              className="cyber-button"
              onClick={onOpenSettings}
              style={{ justifyContent: 'center', padding: '0.6rem' }}
            >
              <Settings size={14} />
              <span>AI SETTINGS</span>
            </button>
          </div>

        </div>

        {/* Footer Tag */}
        <div style={{
          marginTop: '2rem',
          fontSize: '0.7rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)'
        }}>
          [ 4 SECRET ATTACK VECTORS // 10 TURNS MAX // STRICT SECRECY ENFORCED ]
        </div>

      </div>
    </div>
  );
}
