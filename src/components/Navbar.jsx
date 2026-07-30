import React from 'react';
import { Shield, Settings, RotateCcw, Cpu, CheckCircle2, AlertCircle, HelpCircle, Home, Trophy, AlertTriangle, FileText } from 'lucide-react';

export default function Navbar({
  config,
  connectionStatus,
  gameState,
  onNewGame,
  onReturnToMenu,
  onOpenSettings,
  onOpenRules,
  onOpenDebrief
}) {
  const discoveredCount = Object.values(gameState.discovered).filter(Boolean).length;

  return (
    <header className="cyber-card" style={{
      borderRadius: 0,
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
      padding: '0.45rem 1.25rem',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,243,255,0.2), rgba(59,130,246,0.2))',
          padding: '0.35rem',
          borderRadius: '6px',
          border: '1px solid var(--neon-cyan)',
          display: 'flex'
        }}>
          <Shield size={20} color="var(--neon-cyan)" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.5px', lineHeight: 1 }}>
            BACKDOORS <span className="text-cyan-glow">&</span> BREACHES
          </h1>
          <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            AI INCIDENT MASTER DM
          </p>
        </div>
      </div>

      {/* Center Game Metrics */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Turn Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 21, 35, 0.9)', border: '1px solid rgba(0, 243, 255, 0.3)', padding: '0.3rem 0.85rem', borderRadius: '6px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-main)', fontFamily: 'var(--font-header)', fontWeight: 700 }}>TURN</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: gameState.turn >= 8 ? 'var(--neon-red)' : 'var(--neon-cyan)' }}>
            {gameState.turn} / {gameState.maxTurns || 10}
          </span>
        </div>

        {/* Vectors Discovered Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(15, 21, 35, 0.9)', border: '1px solid rgba(0, 255, 136, 0.3)', padding: '0.3rem 0.85rem', borderRadius: '6px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-main)', fontFamily: 'var(--font-header)', fontWeight: 700 }}>VECTORS</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--neon-green)' }}>
            {discoveredCount} / 4
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        
        {/* AI Provider Status */}
        <div
          onClick={onOpenSettings}
          title="Click to configure AI DM settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(15, 21, 35, 0.8)',
            border: `1px solid ${connectionStatus.connected ? 'rgba(0,255,136,0.3)' : 'rgba(255,51,102,0.3)'}`,
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <Cpu size={14} color={connectionStatus.connected ? 'var(--neon-green)' : 'var(--neon-red)'} />
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            {config.provider === 'ollama' ? 'OLLAMA' : 'OPENAI'}
          </span>
          {connectionStatus.connected ? <CheckCircle2 size={12} color="var(--neon-green)" /> : <AlertCircle size={12} color="var(--neon-red)" />}
        </div>

        {gameState.phase === 'GAME_OVER' && onOpenDebrief && (
          <button
            className={`cyber-button ${gameState.isWin ? 'cyber-button-success' : 'cyber-button-danger'}`}
            onClick={onOpenDebrief}
            title="View Incident Debrief Splash Screen"
            style={{ fontWeight: 700 }}
          >
            {gameState.isWin ? <Trophy size={14} /> : <AlertTriangle size={14} />}
            <span>DEBRIEF</span>
          </button>
        )}

        <button className="cyber-button" onClick={onOpenRules} title="Game Rules & Step-by-Step Guide">
          <HelpCircle size={14} />
          <span>RULES & HOW TO PLAY</span>
        </button>

        <button className="cyber-button" onClick={onOpenSettings} title="AI DM Settings">
          <Settings size={14} />
          <span>SETTINGS</span>
        </button>

        {onReturnToMenu && (
          <button className="cyber-button" onClick={onReturnToMenu} title="Return to Main Menu (Game Auto-Saved)">
            <Home size={14} />
            <span>MENU</span>
          </button>
        )}

        <button className="cyber-button cyber-button-primary" onClick={onNewGame} title="Start New Incident">
          <RotateCcw size={14} />
          <span>NEW GAME</span>
        </button>

      </div>
    </header>
  );
}
