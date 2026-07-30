import React, { useState } from 'react';
import CardItem from './CardItem.jsx';
import { CARD_TYPES, TYPE_CONFIG } from '../data/cards.js';
import { Target, Zap, Filter, Sparkles, Eye, ShieldCheck, Play, Lock, AlertTriangle } from 'lucide-react';

export default function GameBoard({
  gameState,
  onSelectTargetCategory,
  selectedTargetCategory,
  onPlayProcedure,
  onTriggerCustomRoll,
  blockedCategories = []
}) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [hoveredCard, setHoveredCard] = useState(null);

  const attackCategories = [
    { type: CARD_TYPES.INITIAL, label: 'Initial Compromise' },
    { type: CARD_TYPES.PIVOT, label: 'Pivot & Escalate' },
    { type: CARD_TYPES.PERSISTENCE, label: 'Persistence' },
    { type: CARD_TYPES.C2, label: 'C2 & Exfiltration' }
  ];

  const categories = ['ALL', 'Endpoint', 'Network', 'Logs', 'Intel', 'Forensics', 'Remediation', 'Analytics', 'Management'];

  const hasSelectedIncident = Boolean(
    selectedTargetCategory &&
    gameState.secretCards[selectedTargetCategory] &&
    !gameState.discovered[selectedTargetCategory]
  );

  const filteredHand = gameState.procedureHand.filter((card) => {
    if (filterCategory === 'ALL') return true;
    return card.category === filterCategory;
  });

  // Determine active card for the Card Inspector Panel
  const activeInspectorCard = hoveredCard || (selectedTargetCategory ? gameState.secretCards[selectedTargetCategory] : null) || gameState.procedureHand[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
      
      {/* 4 Attack Vector Slots Board */}
      <div className="cyber-card cyber-card-overflow" style={{ padding: '0.95rem 1rem 0.75rem', zIndex: 'var(--z-base, 1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-header)', fontSize: '0.82rem', color: 'var(--neon-cyan)', fontWeight: 700 }}>
            <Target size={16} />
            <span>SCENARIO THREAT VECTORS (SELECT D20 TARGET)</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            Click vector slot to select d20 target
          </div>
        </div>

        {/* 4 Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {attackCategories.map(({ type }) => {
            const secretCard = gameState.secretCards[type];
            const isDiscovered = gameState.discovered[type];
            const isSelected = selectedTargetCategory === type;

            return (
              <div key={type} style={{ position: 'relative', opacity: isDiscovered ? 0.75 : 1, minWidth: 0, zIndex: isSelected ? 25 : 1 }}>
                {isSelected && !isDiscovered && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--neon-cyan)',
                    color: '#080b11',
                    fontFamily: 'var(--font-header)',
                    fontSize: '0.58rem',
                    fontWeight: 900,
                    padding: '0.12rem 0.5rem',
                    borderRadius: '4px',
                    zIndex: 35,
                    boxShadow: '0 0 10px var(--neon-cyan)',
                    pointerEvents: 'none'
                  }}>
                    TARGET
                  </div>
                )}
                {isDiscovered && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--neon-green)',
                    color: '#080b11',
                    fontFamily: 'var(--font-header)',
                    fontSize: '0.58rem',
                    fontWeight: 900,
                    padding: '0.12rem 0.5rem',
                    borderRadius: '4px',
                    zIndex: 35,
                    boxShadow: '0 0 10px var(--neon-green)',
                    pointerEvents: 'none'
                  }}>
                    SECURED
                  </div>
                )}
                <CardItem
                  card={secretCard}
                  isDiscovered={isDiscovered}
                  isAttackCard={true}
                  isSelected={isSelected && !isDiscovered}
                  onMouseEnter={() => setHoveredCard(secretCard)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onSelect={() => {
                    if (!isDiscovered) {
                      onSelectTargetCategory(isSelected ? null : type);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning banner if no incident card is selected */}
      {!hasSelectedIncident && (
        <div className="cyber-card" style={{
          padding: '0.55rem 0.9rem',
          background: 'rgba(234, 179, 8, 0.12)',
          borderColor: 'var(--neon-amber)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem'
        }}>
          <AlertTriangle size={20} color="var(--neon-amber)" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.78rem', color: 'var(--neon-amber)', fontWeight: 800 }}>
              NO INCIDENT CARD SELECTED
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-main)', marginTop: '0.1rem' }}>
              Click an incident card (threat vector slot above) to select your target before playing a procedure card.
            </div>
          </div>
        </div>
      )}

      {/* Active Inject Event Warning Banner */}
      {gameState.activeInject && (
        <div className="cyber-card" style={{
          padding: '0.55rem 0.9rem',
          background: 'rgba(234, 179, 8, 0.12)',
          borderColor: 'var(--neon-amber)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem'
        }}>
          <Zap size={20} color="var(--neon-amber)" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.78rem', color: 'var(--neon-amber)', fontWeight: 800 }}>
              ACTIVE INJECT HAZARD: {gameState.activeInject.card.title.toUpperCase()}
              <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: 'var(--text-main)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                ({gameState.activeInject.turnsRemaining} turn{gameState.activeInject.turnsRemaining !== 1 ? 's' : ''} remaining)
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-main)', marginTop: '0.1rem' }}>
              {gameState.activeInject.card.description} —{' '}
              <strong style={{ color: 'var(--neon-amber)' }}>{gameState.activeInject.card.effect}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Hand & Card Inspector Section */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 220px', gap: '0.75rem', minHeight: 0 }}>
        
        {/* Left: Defender Procedure Hand */}
        <div className="cyber-card cyber-card-overflow" style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', minHeight: 0, zIndex: 'var(--z-base, 1)' }}>
          
          {/* Header & Filter Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.65rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--neon-green)', letterSpacing: '0.5px' }}>
                  DEFENDER HAND ({gameState.procedureHand.length})
                </h2>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-main)', fontWeight: 600 }}>
                  DECK: <strong style={{ color: 'var(--neon-cyan)' }}>{(gameState.procedureDeck || []).length}</strong> | DISCARD: <strong style={{ color: 'var(--neon-amber)' }}>{(gameState.procedureDiscard || []).length}</strong>
                </div>
              </div>

              <button
                className="cyber-button"
                onClick={onTriggerCustomRoll}
                disabled={!hasSelectedIncident}
                title={!hasSelectedIncident ? "Select an incident card first" : "Trigger general roll"}
                style={{
                  fontSize: '0.7rem',
                  padding: '0.35rem 0.75rem',
                  fontWeight: 700,
                  opacity: !hasSelectedIncident ? 0.5 : 1,
                  cursor: !hasSelectedIncident ? 'not-allowed' : 'pointer'
                }}
              >
                <Sparkles size={13} />
                <span>GENERAL ROLL (NO CARD)</span>
              </button>
            </div>

            {/* Pill-Styled Category Filter Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', paddingTop: '0.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginRight: '0.2rem' }}>
                <Filter size={13} color="var(--neon-cyan)" />
                <span>FILTER:</span>
              </div>
              {categories.map((cat) => {
                const isActive = filterCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      background: isActive ? 'var(--neon-green)' : 'rgba(15, 21, 35, 0.95)',
                      border: `1px solid ${isActive ? 'var(--neon-green)' : 'rgba(0, 243, 255, 0.25)'}`,
                      color: isActive ? '#080b11' : 'var(--text-main)',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 0 10px rgba(0, 255, 136, 0.4)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Cards Grid */}
          <div
            className={filteredHand.length === 5 ? 'cyber-hand-grid-5' : ''}
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: filteredHand.length === 5
                ? undefined
                : 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '0.75rem',
              padding: '0.5rem 0.35rem 0.65rem 0.25rem',
              alignItems: 'stretch'
            }}
          >
            {filteredHand.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                isProcedureCard={true}
                targetCategory={selectedTargetCategory}
                hasSelectedIncident={hasSelectedIncident}
                isBonusBlocked={blockedCategories.includes(card.category)}
                onPlay={onPlayProcedure}
                onMouseEnter={() => setHoveredCard(card)}
                onMouseLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>

        </div>

        {/* Right: Live Card Inspector Panel */}
        <div className="cyber-card" style={{
          padding: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(10, 15, 26, 0.95)',
          border: '1px solid var(--border-glow)'
        }}>
          <div>
            {/* Inspector Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-header)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.65rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
              <Eye size={15} />
              <span>CARD INSPECTOR</span>
            </div>

            {activeInspectorCard ? (() => {
              const config = TYPE_CONFIG[activeInspectorCard.type] || TYPE_CONFIG[CARD_TYPES.PROCEDURE];
              const isAttack = [CARD_TYPES.INITIAL, CARD_TYPES.PIVOT, CARD_TYPES.PERSISTENCE, CARD_TYPES.C2].includes(activeInspectorCard.type);
              const isDiscovered = isAttack ? gameState.discovered[activeInspectorCard.type] : true;
              const isProc = activeInspectorCard.type === CARD_TYPES.PROCEDURE;
              const matchesTarget = isProc && selectedTargetCategory && activeInspectorCard.bonusTargets?.includes(selectedTargetCategory);
              const isBlocked = isProc && blockedCategories.includes(activeInspectorCard.category);

              // If it's an undiscovered attack card, keep details secret!
              if (isAttack && !isDiscovered) {
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div>
                      <span className="card-badge" style={{ background: config.bgColor, color: config.color, border: `1px solid ${config.color}`, fontSize: '0.65rem' }}>
                        {config.name}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.92rem', fontWeight: 800, color: 'var(--neon-cyan)', marginTop: '0.35rem', lineHeight: 1.3 }}>
                        [ UNREVEALED THREAT VECTOR ]
                      </h3>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.45, background: 'rgba(5, 8, 14, 0.7)', padding: '0.65rem', borderRadius: '6px', border: '1px dashed var(--border-color)' }}>
                      Forensic telemetry for this attack category is currently unrevealed. Play a matching procedure card or trigger a general d20 roll against this target to investigate and reveal the attacker card!
                    </div>

                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--neon-amber)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
                      <Lock size={13} />
                      <span>TARGET THRESHOLD: 11+ TO REVEAL</span>
                    </div>
                  </div>
                );
              }

              // Discovered Attack Card, Procedure Card, or Inject Event
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  
                  {/* Category & Title */}
                  <div>
                    <span className="card-badge" style={{ background: config.bgColor, color: config.color, border: `1px solid ${config.color}`, fontSize: '0.65rem' }}>
                      {config.name}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.92rem', fontWeight: 800, color: '#fff', marginTop: '0.35rem', lineHeight: 1.3 }}>
                      {activeInspectorCard.title}
                    </h3>
                  </div>

                  {/* Full Untruncated Description */}
                  <div style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.45, background: 'rgba(5, 8, 14, 0.6)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {activeInspectorCard.description || activeInspectorCard.details || 'No detailed telemetry available.'}
                  </div>

                  {/* Mechanics & Target Analysis */}
                  {isProc && (
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div style={{ color: 'var(--text-main)' }}>
                        Category: <strong style={{ color: config.color }}>{activeInspectorCard.category}</strong>
                      </div>
                      
                      {matchesTarget ? (
                        isBlocked ? (
                          <div style={{ color: 'var(--neon-amber)', fontWeight: 700 }}>
                            ⚡ MATCHES TARGET BUT BONUS BLOCKED BY INJECT
                          </div>
                        ) : (
                          <div style={{ color: 'var(--neon-green)', fontWeight: 800 }}>
                            🎯 TARGET MATCH: +3 D20 BONUS ACTIVE!
                          </div>
                        )
                      ) : (
                        <div style={{ color: 'var(--text-muted)' }}>
                          Bonus Targets: {activeInspectorCard.bonusTargets?.join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                  {activeInspectorCard.cve && isDiscovered && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--neon-red)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      REF: {activeInspectorCard.cve}
                    </div>
                  )}

                </div>
              );
            })() : (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-mono)' }}>
                Hover over any card to inspect full details
              </div>
            )}
          </div>

          {/* Action hint at bottom of inspector */}
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem', textAlign: 'center' }}>
            {hoveredCard ? 'Live Card Preview Active' : 'Hover any card to inspect'}
          </div>

        </div>

      </div>

    </div>
  );
}
