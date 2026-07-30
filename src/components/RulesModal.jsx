import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  CheckCircle2,
  Target,
  Shield,
  Dices,
  Zap,
  Terminal,
  Award,
  BookOpen,
  Sparkles,
  Layers,
  FileText,
  AlertTriangle,
  Users,
  Swords
} from 'lucide-react';

export default function RulesModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('flow'); // 'flow' | 'roles' | 'cards' | 'dice'

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 14, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'var(--z-modal-top, 1100)',
      padding: '1rem'
    }}>
      <div className="cyber-card" style={{
        width: '100%',
        maxWidth: '760px',
        maxHeight: '90vh',
        padding: '1.75rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 40px rgba(0, 243, 255, 0.25)',
        border: '1px solid var(--border-glow)'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.35rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          className="cyber-button-hover"
          title="Close Rules"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{
            background: 'rgba(0, 243, 255, 0.15)',
            border: '1px solid var(--neon-cyan)',
            borderRadius: '8px',
            padding: '0.4rem',
            display: 'flex'
          }}>
            <HelpCircle size={24} color="var(--neon-cyan)" />
          </div>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'var(--text-main)'
            }}>
              BACKDOORS & BREACHES // OFFICIAL RULES
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
              CREATED BY BLACK HILLS INFORMATION SECURITY (BHIS) • "D&D FOR CYBERSECURITY"
            </p>
          </div>
        </div>

        {/* Overview Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.08), rgba(0, 255, 136, 0.05))',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-main)',
          lineHeight: 1.5
        }}>
          Backdoors & Breaches is a tabletop incident response card game. It is a cooperative simulation relying on a 20-sided die (d20) where an Incident Master runs the breach narrative while Defenders investigate the attack kill chain.
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
          borderBottom: '1px solid rgba(0, 243, 255, 0.15)',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveTab('flow')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: activeTab === 'flow' ? '1px solid var(--neon-cyan)' : '1px solid transparent',
              background: activeTab === 'flow' ? 'rgba(0, 243, 255, 0.15)' : 'transparent',
              color: activeTab === 'flow' ? 'var(--neon-cyan)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <BookOpen size={15} />
            <span>HOW TO PLAY & WIN</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: activeTab === 'roles' ? '1px solid var(--neon-purple)' : '1px solid transparent',
              background: activeTab === 'roles' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              color: activeTab === 'roles' ? 'var(--neon-purple)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Users size={15} />
            <span>THE ROLES</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: activeTab === 'cards' ? '1px solid var(--neon-green)' : '1px solid transparent',
              background: activeTab === 'cards' ? 'rgba(0, 255, 136, 0.15)' : 'transparent',
              color: activeTab === 'cards' ? 'var(--neon-green)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Layers size={15} />
            <span>THE DECK & CARDS</span>
          </button>

          <button
            onClick={() => setActiveTab('dice')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: activeTab === 'dice' ? '1px solid var(--neon-amber)' : '1px solid transparent',
              background: activeTab === 'dice' ? 'rgba(255, 170, 0, 0.15)' : 'transparent',
              color: activeTab === 'dice' ? 'var(--neon-amber)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Dices size={15} />
            <span>ROLLS & INJECTS</span>
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem', lineHeight: 1.6 }}>

          {/* TAB 1: HOW TO PLAY & WIN */}
          {activeTab === 'flow' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(0, 255, 136, 0.08)', border: '1px solid var(--neon-green)', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--neon-green)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>🏆 TO WIN:</div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    Defenders must successfully identify and reveal all <strong>4 secret Attack cards</strong> before turn 10 expires.
                  </div>
                </div>
                <div style={{ background: 'rgba(255, 51, 102, 0.08)', border: '1px solid var(--neon-red)', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--neon-red)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>💀 TO LOSE:</div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    Defenders fail to uncover the entire kill chain before the <strong>10-turn incident window</strong> passes.
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: '0.9rem', color: 'var(--neon-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📋 Game Workflow (Step-by-Step)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                {/* Step 1 */}
                <div style={{ background: 'rgba(15, 21, 35, 0.7)', border: '1px solid rgba(0, 243, 255, 0.2)', borderRadius: '8px', padding: '0.85rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--neon-cyan)', color: '#080b11', fontWeight: 800, fontSize: '0.85rem', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--neon-cyan)', fontSize: '0.88rem' }}>Setup the Breach & Initial Narrative</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      The Incident Master draws 4 secret Attack cards. Defenders hold <strong>5 Procedure cards</strong> in hand. The Incident Master reads an opening incident description <strong>based primarily on the Initial Compromise</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ background: 'rgba(15, 21, 35, 0.7)', border: '1px solid rgba(0, 255, 136, 0.2)', borderRadius: '8px', padding: '0.85rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--neon-green)', color: '#080b11', fontWeight: 800, fontSize: '0.85rem', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--neon-green)', fontSize: '0.88rem' }}>Take Action (Max 1 Procedure / Turn)</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      Defenders discuss the narrative and declare 1 Procedure card from their 5-card hand to investigate the target vector.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ background: 'rgba(15, 21, 35, 0.7)', border: '1px solid rgba(255, 170, 0, 0.2)', borderRadius: '8px', padding: '0.85rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--neon-amber)', color: '#080b11', fontWeight: 800, fontSize: '0.85rem', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--neon-amber)', fontSize: '0.88rem' }}>Roll the d20 (Target DC = 11+)</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      Roll the 20-sided die. Roll of 1-10 is a failure, 11-20 is a success. Using a Procedure card matching the target gives a <strong style={{ color: 'var(--neon-green)' }}>+3 bonus</strong> to the roll.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div style={{ background: 'rgba(15, 21, 35, 0.7)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '8px', padding: '0.85rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--neon-purple)', color: '#fff', fontWeight: 800, fontSize: '0.85rem', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>4</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--neon-purple)', fontSize: '0.88rem' }}>Reveal Attack Card or Fail</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      On success (11+), if the procedure matches the hidden Attack card's detection method, the Incident Master flips that card over to reveal the attack technique!
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: THE ROLES */}
          {activeTab === 'roles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--neon-purple)', fontWeight: 700, textTransform: 'uppercase' }}>
                👥 Player Roles & Team Structure
              </h3>

              <div style={{ background: 'rgba(0, 243, 255, 0.08)', border: '1px solid var(--neon-cyan)', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--neon-cyan)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Terminal size={16} /> 🤖 The Incident Master (AI DM / Captain)
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.8rem' }}>
                  Acts as the Dungeon Master. Crafts the breach scenario, manages secret attack cards, evaluates d20 rolls, generates forensic log telemetry, and narrates the story based on defender actions.
                </p>
              </div>

              <div style={{ background: 'rgba(0, 255, 136, 0.08)', border: '1px solid var(--neon-green)', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--neon-green)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Shield size={16} /> 🛡️ The Defenders (Incident Response Team)
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.8rem' }}>
                  The cooperative IR team. Holds <strong>5 Procedure cards</strong> in hand. Together, defenders analyze incident briefs, choose procedures, state investigative actions, and roll d20 dice to uncover the kill chain.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: THE DECK & CARDS */}
          {activeTab === 'cards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--neon-green)', fontWeight: 700, textTransform: 'uppercase' }}>
                🎴 The Deck Categories
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                
                <div style={{ background: 'rgba(255, 51, 102, 0.08)', border: '1px solid #ff3366', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: '#ff3366', marginBottom: '0.25rem' }}>🔴 Initial Compromise (Red Attack Card)</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    How the attackers originally got into the network. <strong>The initial incident description is primarily based on this card!</strong>
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 170, 0, 0.08)', border: '1px solid #ffaa00', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: '#ffaa00', marginBottom: '0.25rem' }}>🟡 Pivot & Escalate (Gold/Yellow Attack Card)</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    How attackers moved laterally and elevated privileges across internal systems.
                  </div>
                </div>

                <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid #a855f7', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: '#a855f7', marginBottom: '0.25rem' }}>🟣 Persistence (Purple Attack Card)</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    How the backdoor maintains access and stays established across reboots.
                  </div>
                </div>

                <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid #3b82f6', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: '#3b82f6', marginBottom: '0.25rem' }}>🔵 C2 & Exfil (Blue/Brown Attack Card)</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    How attackers communicate with command servers or exfiltrate stolen data.
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 255, 136, 0.08)', border: '1px solid var(--neon-green)', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--neon-green)', marginBottom: '0.25rem' }}>🟢 Procedures (Blue/Green Defender Cards)</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    Defender tools (e.g. Endpoint Analysis, Log Review). Defenders hold <strong>5 cards in hand</strong>. Playing a matching established procedure grants a <strong>+3 bonus</strong> to the roll!
                  </div>
                </div>

                <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid #eab308', borderRadius: '8px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, color: '#eab308', marginBottom: '0.25rem' }}>⚡ Injects (White/Yellow Chaos Cards)</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    Random incident twists representing real-world chaos (executive overrules, log purges, legal alerts).
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: ROLLS & INJECTS */}
          {activeTab === 'dice' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--neon-amber)', fontWeight: 700, textTransform: 'uppercase' }}>
                🎲 d20 Rolling & Inject Triggers
              </h3>

              <div style={{ background: 'rgba(15, 21, 35, 0.8)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                <div style={{ color: 'var(--neon-cyan)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  TARGET DC = 11 OR HIGHER
                </div>
                <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div>• <strong>1-10:</strong> FAILURE. Turn spent, investigation inconclusive.</div>
                  <div>• <strong>11-20:</strong> SUCCESS! Attack card flipped if procedure matches detection.</div>
                  <div>• <strong style={{ color: 'var(--neon-green)' }}>Established Procedure Bonus:</strong> +3 bonus to d20 roll when using matching card.</div>
                </div>
              </div>

              <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid #eab308', borderRadius: '8px', padding: '0.85rem' }}>
                <div style={{ fontWeight: 700, color: '#eab308', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={16} /> ⚡ Inject Card Triggers
                </div>
                <p style={{ color: 'var(--text-main)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                  The Incident Master draws an Inject card whenever defenders hit any of these 3 triggers:
                </p>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div>1️⃣ <strong>Natural 1</strong> (Fumble roll)</div>
                  <div>2️⃣ <strong>Natural 20</strong> (Critical Hit roll)</div>
                  <div>3️⃣ <strong>3 Failures in a Row</strong> (Escalated threat action)</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer button */}
        <div style={{
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(0, 243, 255, 0.15)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            BACKDOORS & BREACHES • OFFICIAL BHIS SCENARIO
          </div>
          <button className="cyber-button cyber-button-success" onClick={onClose} style={{ fontWeight: 700 }}>
            <CheckCircle2 size={16} />
            <span>GOT IT, LET'S PLAY!</span>
          </button>
        </div>

      </div>
    </div>
  );
}

