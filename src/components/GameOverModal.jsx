import React from 'react';
import {
  Trophy,
  AlertTriangle,
  X,
  RotateCcw,
  Eye,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  Clock,
  Target,
  Shield,
  FileText
} from 'lucide-react';
import { CARD_TYPES, TYPE_CONFIG } from '../data/cards.js';

export default function GameOverModal({ isOpen, gameState, onClose, onNewGame }) {
  if (!isOpen || !gameState) return null;

  const isWin = gameState.isWin;
  const discovered = gameState.discovered || {};
  const discoveredCount = Object.values(discovered).filter(Boolean).length;
  const turnsUsed = gameState.turn;
  const maxTurns = gameState.maxTurns || 10;
  const secretCards = gameState.secretCards || {};

  // Calculate Incident Response Rank
  let rank = 'F';
  let rankTitle = 'SYSTEM BREACHED';
  let rankColor = 'var(--neon-red)';

  if (isWin) {
    if (turnsUsed <= 5) {
      rank = 'S';
      rankTitle = 'INCIDENT MASTER';
      rankColor = 'var(--neon-cyan)';
    } else if (turnsUsed <= 7) {
      rank = 'A';
      rankTitle = 'VETERAN IR';
      rankColor = 'var(--neon-green)';
    } else if (turnsUsed <= 9) {
      rank = 'B';
      rankTitle = 'CYBER DEFENDER';
      rankColor = 'var(--neon-amber)';
    } else {
      rank = 'C';
      rankTitle = 'BARELY CONTAINED';
      rankColor = '#3b82f6';
    }
  }

  const totalRolls = gameState.stats?.totalRolls || 0;
  const successes = gameState.stats?.successes || 0;
  const failures = gameState.stats?.failures || 0;
  const successRate = totalRolls > 0 ? Math.round((successes / totalRolls) * 100) : 0;

  // Extract final DM debrief narrative from logs
  const finalDmLog = [...(gameState.logs || [])].reverse().find(l => l.role === 'dm');
  const debriefText = finalDmLog ? finalDmLog.text : (isWin ? 'All threat vectors successfully isolated.' : 'Time expired before all vectors could be identified.');

  const categories = [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT, CARD_TYPES.PERSISTENCE, CARD_TYPES.C2];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(3, 6, 12, 0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'var(--z-modal-base, 1000)',
      padding: '1.25rem',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div
        className="cyber-card"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '92vh',
          padding: '2rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          border: `1.5px solid ${isWin ? 'var(--neon-green)' : 'var(--neon-red)'}`,
          boxShadow: isWin
            ? '0 0 50px rgba(0, 255, 136, 0.25), inset 0 0 20px rgba(0, 255, 136, 0.05)'
            : '0 0 50px rgba(255, 51, 102, 0.25), inset 0 0 20px rgba(255, 51, 102, 0.05)',
          overflow: 'hidden'
        }}
      >
        {/* Background Grid Accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: isWin
            ? 'radial-gradient(circle at 50% 0%, rgba(0, 255, 136, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 0%, rgba(255, 51, 102, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          title="Review Game Board & Logs"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(15, 21, 35, 0.8)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Scrollable Container */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 2 }}>

          {/* Header Splash Banner */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            
            {/* Top Badge Icon */}
            <div style={{
              background: isWin
                ? 'linear-gradient(135deg, rgba(0,255,136,0.25), rgba(0,243,255,0.15))'
                : 'linear-gradient(135deg, rgba(255,51,102,0.25), rgba(255,170,0,0.15))',
              padding: '0.9rem',
              borderRadius: '20px',
              border: `2px solid ${isWin ? 'var(--neon-green)' : 'var(--neon-red)'}`,
              boxShadow: isWin ? '0 0 25px rgba(0, 255, 136, 0.4)' : '0 0 25px rgba(255, 51, 102, 0.4)',
              display: 'inline-flex'
            }}>
              {isWin ? <Trophy size={42} color="var(--neon-green)" /> : <AlertTriangle size={42} color="var(--neon-red)" />}
            </div>

            <h1 style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.75rem',
              fontWeight: 900,
              letterSpacing: '1.5px',
              color: '#fff',
              textShadow: isWin ? '0 0 20px rgba(0, 255, 136, 0.6)' : '0 0 20px rgba(255, 51, 102, 0.6)'
            }}>
              {isWin ? 'THREAT NEUTRALIZED // INCIDENT CONTAINED' : 'SYSTEM COMPROMISED // TIME EXPIRED'}
            </h1>

            <p style={{
              fontSize: '0.88rem',
              color: isWin ? 'var(--neon-green)' : 'var(--neon-red)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '1px'
            }}>
              {isWin
                ? `SUCCESS: All 4 threat vectors identified and remediated in ${turnsUsed} turns!`
                : `FAILURE: Incident Response exceeded the ${maxTurns}-turn limit. ${discoveredCount}/4 threat vectors identified.`
              }
            </p>

          </div>

          {/* Performance Stats & Rank Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '0.75rem',
            background: 'rgba(12, 17, 28, 0.85)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1rem'
          }}>
            
            {/* Rank Box */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid rgba(255,255,255,0.08)',
              paddingRight: '0.5rem'
            }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-header)' }}>PERFORMANCE RANK</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', margin: '0.2rem 0' }}>
                <Award size={20} color={rankColor} />
                <span style={{ fontFamily: 'var(--font-header)', fontSize: '1.8rem', fontWeight: 900, color: rankColor, lineHeight: 1 }}>
                  {rank}
                </span>
              </div>
              <span style={{ fontSize: '0.65rem', color: rankColor, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {rankTitle}
              </span>
            </div>

            {/* Turns Stat */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-header)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={12} /> TURNS USED
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                {turnsUsed} / {maxTurns}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                {maxTurns - turnsUsed} turns remaining
              </span>
            </div>

            {/* Vectors Discovered Stat */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-header)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Target size={12} /> VECTORS DISCOVERED
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--neon-cyan)', margin: '0.2rem 0' }}>
                {discoveredCount} / 4
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                {Math.round((discoveredCount / 4) * 100)}% coverage
              </span>
            </div>

            {/* Roll Accuracy Stat */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-header)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Zap size={12} /> D20 ACCURACY
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--neon-green)', margin: '0.2rem 0' }}>
                {successRate}%
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                {successes} success / {failures} fail
              </span>
            </div>

          </div>

          {/* Kill-Chain Card Breakdown Grid */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.9rem', color: 'var(--neon-cyan)', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Shield size={16} /> ATTACKER KILL-CHAIN MATRIX
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {isWin ? 'ALL VECTORS IDENTIFIED' : 'SECRET THREAT VECTORS REVEALED'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {categories.map((catKey) => {
                const config = TYPE_CONFIG[catKey] || {};
                const isFound = !!discovered[catKey];
                const card = secretCards[catKey] || { title: 'Unknown Vector', description: 'No telemetry gathered.' };

                return (
                  <div
                    key={catKey}
                    style={{
                      background: isFound ? 'rgba(0, 255, 136, 0.06)' : 'rgba(255, 51, 102, 0.06)',
                      border: `1.5px solid ${isFound ? 'var(--neon-green)' : 'var(--neon-red)'}`,
                      borderRadius: '8px',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      position: 'relative'
                    }}
                  >
                    {/* Discovered / Undiscovered Header Tag */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: config.color, fontWeight: 700 }}>
                        {config.name?.toUpperCase()}
                      </span>
                      {isFound ? (
                        <span style={{ color: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700 }}>
                          <CheckCircle2 size={12} /> FOUND
                        </span>
                      ) : (
                        <span style={{ color: 'var(--neon-red)', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700 }}>
                          <XCircle size={12} /> MISSED
                        </span>
                      )}
                    </div>

                    {/* Card Title */}
                    <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginTop: '0.1rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {card.title}
                    </div>

                    {/* Card Details / Description */}
                    <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.1rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {card.details || card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI DM Final Incident Debrief Narrative */}
          <div style={{
            background: 'rgba(8, 12, 20, 0.9)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neon-cyan)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <FileText size={14} /> AI DM FINAL INCIDENT DEBRIEF
            </div>
            <div style={{
              fontSize: '0.82rem',
              color: 'var(--text-main)',
              lineHeight: 1.55,
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
              maxHeight: '180px',
              overflowY: 'auto',
              paddingRight: '0.3rem'
            }}>
              {debriefText}
            </div>
          </div>

        </div>

        {/* Modal Action Buttons Footer */}
        <div style={{
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          zIndex: 2
        }}>
          <button
            className="cyber-button"
            onClick={onClose}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}
          >
            <Eye size={16} />
            <span>REVIEW TERMINAL & BOARD</span>
          </button>

          <button
            className={`cyber-button ${isWin ? 'cyber-button-success' : 'cyber-button-danger'}`}
            onClick={onNewGame}
            style={{
              padding: '0.65rem 1.5rem',
              fontSize: '0.88rem',
              fontWeight: 800,
              boxShadow: isWin ? '0 0 20px rgba(0, 255, 136, 0.4)' : '0 0 20px rgba(255, 51, 102, 0.4)'
            }}
          >
            <RotateCcw size={16} />
            <span>START NEW INCIDENT</span>
          </button>
        </div>

      </div>
    </div>
  );
}
