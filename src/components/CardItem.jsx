import React from 'react';
import { TYPE_CONFIG, CARD_TYPES } from '../data/cards.js';
import { Lock, CheckCircle2, ShieldAlert, TrendingUp, Anchor, Radio, Activity, Zap, Play } from 'lucide-react';

const ICON_MAP = {
  ShieldAlert,
  TrendingUp,
  Anchor,
  Radio,
  Activity,
  Zap
};

export default function CardItem({
  card,
  isDiscovered = false,
  isAttackCard = false,
  isProcedureCard = false,
  isInjectCard = false,
  isSelected = false,
  isBonusBlocked = false,
  hasSelectedIncident = true,
  onSelect,
  onPlay,
  onMouseEnter,
  onMouseLeave,
  targetCategory
}) {
  const typeConfig = TYPE_CONFIG[card.type] || TYPE_CONFIG[CARD_TYPES.PROCEDURE];
  const IconComponent = ICON_MAP[typeConfig.icon] || ShieldAlert;
  const hasBonus = isProcedureCard && hasSelectedIncident && !isBonusBlocked && targetCategory && card.bonusTargets?.includes(targetCategory);

  // Attack card face-down render (Unrevealed Threat Vector Slot)
  if (isAttackCard && !isDiscovered) {
    return (
      <div
        onClick={onSelect}
        onMouseEnter={() => onMouseEnter && onMouseEnter(card)}
        onMouseLeave={() => onMouseLeave && onMouseLeave()}
        className={`cyber-card cyber-card-interactive ${isSelected ? 'cyber-card-glow' : ''}`}
        style={{
          minHeight: '210px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '0.9rem',
          textAlign: 'left',
          background: isSelected
            ? 'linear-gradient(145deg, rgba(0, 243, 255, 0.14), rgba(8, 11, 17, 0.95))'
            : 'linear-gradient(145deg, rgba(15, 21, 35, 0.95), rgba(8, 11, 17, 0.95))',
          borderColor: isSelected ? 'var(--neon-cyan)' : typeConfig.borderColor,
          borderStyle: isSelected ? 'solid' : 'dashed',
          borderWidth: isSelected ? '1.5px' : '1px',
          boxShadow: isSelected ? '0 0 16px rgba(0, 243, 255, 0.3)' : 'none',
          cursor: 'pointer'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
            <div className="card-badge" style={{ background: typeConfig.bgColor, color: typeConfig.color, border: `1px solid ${typeConfig.color}`, fontSize: '0.65rem' }}>
              {typeConfig.badge}
            </div>
            <Lock size={15} color={typeConfig.color} />
          </div>

          <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)', fontWeight: 700, marginBottom: '0.35rem' }}>
            SURFACE: {card?.attackVector || typeConfig.name.toUpperCase()}
          </div>

          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            UNREVEALED THREAT
          </h3>

          <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.35, wordBreak: 'break-word' }}>
            Forensic telemetry unrevealed. Target this vector with a procedure card or d20 roll (11+ required).
          </p>
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <button
            className={`cyber-button ${isSelected ? 'cyber-button-success' : 'cyber-button-primary'}`}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.35rem 0.5rem',
              fontSize: '0.7rem',
              fontWeight: 800,
              background: isSelected ? 'var(--neon-cyan)' : undefined,
              color: isSelected ? '#080b11' : undefined
            }}
          >
            {isSelected ? '🎯 TARGETING VECTOR' : 'SELECT TARGET'}
          </button>
        </div>
      </div>
    );
  }

  // Face-up Card Render (Discovered Attack Card, Procedure Card, or Inject)
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => onMouseEnter && onMouseEnter(card)}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
      className={`cyber-card cyber-card-interactive ${isSelected ? 'cyber-card-glow' : ''}`}
      style={{
        minHeight: isAttackCard ? '210px' : '190px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0.85rem',
        borderColor: isSelected ? 'var(--neon-cyan)' : hasBonus ? 'var(--neon-green)' : typeConfig.borderColor,
        boxShadow: isDiscovered ? `0 0 14px ${typeConfig.bgColor}` : hasBonus ? '0 0 12px rgba(0,255,136,0.35)' : undefined,
        background: isSelected ? 'rgba(0, 243, 255, 0.08)' : 'var(--bg-card)',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Card Header & Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.25rem' }}>
          <div className="card-badge" style={{ background: typeConfig.bgColor, color: typeConfig.color, border: `1px solid ${typeConfig.color}` }}>
            {typeConfig.badge}
          </div>
          {isDiscovered && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.68rem', color: 'var(--neon-green)', fontWeight: 800 }}>
              <CheckCircle2 size={12} /> REVEALED
            </span>
          )}
          {hasBonus && (
            <span style={{ fontSize: '0.68rem', color: 'var(--neon-green)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
              +3 BONUS
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', marginBottom: '0.35rem' }}>
          <IconComponent size={16} color={typeConfig.color} style={{ marginTop: '0.15rem', flexShrink: 0 }} />
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.25, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            {card.title}
          </h3>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#e2e8f0', lineHeight: 1.35, flex: 1, wordBreak: 'break-word' }}>
          {card.description}
        </p>
      </div>

      {/* Footer / Action */}
      <div style={{ marginTop: '0.45rem' }}>
        {isAttackCard && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {card.cve && (
              <div style={{ fontSize: '0.68rem', color: 'var(--neon-red)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                REF: {card.cve}
              </div>
            )}
            <div style={{
              fontSize: '0.68rem',
              color: 'var(--neon-green)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              background: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid var(--neon-green)',
              borderRadius: '4px',
              padding: '0.25rem 0.4rem',
              textAlign: 'center'
            }}>
              🛡️ VECTOR DISCOVERED &amp; SECURED
            </div>
          </div>
        )}

        {isProcedureCard && onPlay && (
          !hasSelectedIncident ? (
            <button
              className="cyber-button"
              disabled
              title="Select an incident card (threat vector) above to play a card"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.4rem 0.5rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                marginTop: '0.25rem',
                opacity: 0.5,
                cursor: 'not-allowed',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: 'var(--text-muted)',
                background: 'rgba(15, 21, 35, 0.6)'
              }}
            >
              <Lock size={12} />
              <span>SELECT INCIDENT CARD</span>
            </button>
          ) : isBonusBlocked ? (
            <button
              className="cyber-button"
              onClick={(e) => { e.stopPropagation(); onPlay(card); }}
              title="Execute procedure card (Bonus suppressed by active inject hazard)"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.4rem 0.5rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                marginTop: '0.25rem',
                borderColor: 'var(--neon-amber)',
                color: 'var(--neon-amber)',
                opacity: 0.9
              }}
            >
              <Play size={12} />
              <span>EXECUTE (BLOCKED)</span>
            </button>
          ) : (
            <button
              className={`cyber-button ${hasBonus ? 'cyber-button-success' : 'cyber-button-primary'}`}
              onClick={(e) => { e.stopPropagation(); onPlay(card); }}
              title={hasBonus ? "Execute with +3 bonus" : "Execute with no matching bonus"}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '0.4rem 0.5rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                marginTop: '0.25rem'
              }}
            >
              <Play size={12} />
              <span>{hasBonus ? 'EXECUTE (+3 BONUS)' : 'EXECUTE (NO MATCH)'}</span>
            </button>
          )
        )}

        {isInjectCard && (
          <div style={{ fontSize: '0.72rem', color: 'var(--neon-amber)', fontFamily: 'var(--font-mono)', borderTop: '1px dashed var(--neon-amber)', paddingTop: '0.25rem', wordBreak: 'break-word', fontWeight: 600 }}>
            IMPACT: {card.effect}
          </div>
        )}
      </div>

    </div>
  );
}
