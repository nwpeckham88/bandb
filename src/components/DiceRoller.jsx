import React, { useState, useEffect, useRef } from 'react';
import { Dices, CheckCircle2, XCircle, Sparkles, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';

export default function DiceRoller({
  isOpen,
  procedureCard,
  targetCategory,
  modifier,        // procedure bonus (0 or +3)
  injectPenalty,   // from active inject (0 or negative)
  activeInject,    // active inject object (optional)
  successThreshold, // 11 normally, may be higher due to inject
  customActionText,
  onChangeCustomAction,
  onRollComplete,
  onCancel
}) {
  const [isRolling, setIsRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState(20);
  const [finalRoll, setFinalRoll] = useState(null);
  const [validationError, setValidationError] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsRolling(false);
      setDisplayValue(20);
      setFinalRoll(null);
      setValidationError(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const threshold = successThreshold ?? 11;
  const procBonus = modifier ?? 0;
  const injPenalty = injectPenalty ?? 0;
  const netModifier = procBonus + injPenalty;

  const handleStartRoll = () => {
    if (isRolling || finalRoll !== null) return;
    if (!customActionText || !customActionText.trim()) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    setIsRolling(true);
    let counter = 0;
    intervalRef.current = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 20) + 1);
      counter++;
      if (counter >= 18) {
        clearInterval(intervalRef.current);
        const rolled = Math.floor(Math.random() * 20) + 1;
        setDisplayValue(rolled);
        setFinalRoll(rolled);
        setIsRolling(false);
      }
    }, 60);
  };

  const total = finalRoll !== null ? finalRoll + netModifier : null;
  const isSuccess = total !== null ? total >= threshold : null;

  const hasInjectPenalty = injPenalty !== 0;
  const hasThresholdChange = threshold !== 11;

  // Determine bonus status text for procedure card
  const isTargetMatch = procedureCard?.bonusTargets?.includes(targetCategory);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(5, 8, 14, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'var(--z-modal-base, 1000)',
      padding: '1rem'
    }}>
      <div className="cyber-card animate-pulse-glow" style={{ width: '100%', maxWidth: '520px', padding: '1.75rem', textAlign: 'center' }}>

        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-header)', color: 'var(--neon-cyan)', letterSpacing: '1.5px', marginBottom: '0.25rem' }}>
          INVESTIGATION CHECK // D20 ROLL
        </div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Target: {targetCategory ? targetCategory.toUpperCase() : 'GENERAL VECTORS'}
        </h2>

        {/* BONUSES & MODIFIERS PANEL */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(0, 243, 255, 0.25)',
          borderRadius: '8px',
          padding: '0.85rem 1rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-header)',
            color: 'var(--text-dim)',
            letterSpacing: '1px',
            marginBottom: '0.5rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <span>APPLIED BONUSES & MODIFIERS</span>
            <span style={{
              fontWeight: 700,
              color: netModifier > 0 ? 'var(--neon-green)' : netModifier < 0 ? 'var(--neon-amber)' : 'var(--neon-cyan)',
              background: 'rgba(0,0,0,0.3)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              border: `1px solid ${netModifier > 0 ? 'rgba(0, 255, 136, 0.3)' : netModifier < 0 ? 'rgba(234, 179, 8, 0.3)' : 'rgba(0, 243, 255, 0.3)'}`
            }}>
              NET MODIFIER: {netModifier >= 0 ? `+${netModifier}` : netModifier}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem' }}>
            {/* Procedure Card Bonus */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <ShieldCheck size={14} color={procBonus > 0 ? 'var(--neon-green)' : 'var(--text-dim)'} style={{ flexShrink: 0 }} />
                <span>Procedure:</span>
                <span style={{ fontWeight: 600, color: procedureCard ? 'var(--neon-cyan)' : 'var(--text-dim)' }}>
                  {procedureCard ? procedureCard.title : 'None (Custom Roll)'}
                </span>
              </div>
              <span style={{
                fontWeight: 700,
                color: procBonus > 0 ? 'var(--neon-green)' : 'var(--text-muted)',
                background: procBonus > 0 ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                flexShrink: 0
              }}>
                {procBonus > 0 ? `+${procBonus} Bonus` : isTargetMatch ? '+0 (Blocked)' : '+0 Bonus'}
              </span>
            </div>

            {/* Active Inject Penalty */}
            {(activeInject || hasInjectPenalty || hasThresholdChange) && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <AlertTriangle size={14} color="var(--neon-amber)" style={{ flexShrink: 0 }} />
                  <span>Active Inject:</span>
                  <span style={{ fontWeight: 600, color: 'var(--neon-amber)' }}>
                    {activeInject?.card?.title || 'Active Hazard'}
                  </span>
                </div>
                <span style={{
                  fontWeight: 700,
                  color: injPenalty < 0 ? 'var(--neon-amber)' : 'var(--text-muted)',
                  background: injPenalty < 0 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  flexShrink: 0
                }}>
                  {injPenalty < 0 ? `${injPenalty} Penalty` : 'No Roll Penalty'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* TACTICAL ACTION DESCRIPTION TEXT AREA */}
        {finalRoll === null && (
          <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.74rem',
                color: validationError ? 'var(--neon-red)' : 'var(--neon-cyan)',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}>
                <FileText size={14} />
                <span>DESCRIBE YOUR TACTICAL ACTION (FOR THE AI DM):</span>
              </label>
              
              {validationError && (
                <span style={{ fontSize: '0.68rem', color: 'var(--neon-red)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  ⚠️ ACTION DESCRIPTION REQUIRED
                </span>
              )}
            </div>

            {validationError && (
              <div style={{
                background: 'rgba(255, 51, 102, 0.12)',
                border: '1px solid var(--neon-red)',
                borderRadius: '6px',
                padding: '0.4rem 0.65rem',
                fontSize: '0.74rem',
                color: '#fff',
                marginBottom: '0.45rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <AlertTriangle size={15} color="var(--neon-red)" style={{ flexShrink: 0 }} />
                <span>Please describe how your team is deploying this card below (or click a quick suggestion chip) before rolling!</span>
              </div>
            )}

            <textarea
              value={customActionText || ''}
              onChange={(e) => {
                setValidationError(false);
                onChangeCustomAction && onChangeCustomAction(e.target.value);
              }}
              placeholder={
                procedureCard
                  ? `Describe how your SOC team deploys ${procedureCard.title}... (e.g. Extracting memory dumps and scanning process trees on web-srv-01 for web shell signatures)`
                  : `Describe your custom IR investigation... (e.g. Inspecting Active Directory authentication logs for password spray spikes)`
              }
              rows={3}
              style={{
                width: '100%',
                background: 'rgba(8, 11, 17, 0.9)',
                border: validationError ? '1.5px solid var(--neon-red)' : '1px solid var(--border-glow)',
                boxShadow: validationError ? '0 0 10px rgba(255, 51, 102, 0.4)' : 'none',
                borderRadius: '6px',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                padding: '0.65rem',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.45
              }}
            />

            {/* Quick Action Suggestion Chips */}
            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setValidationError(false);
                  onChangeCustomAction && onChangeCustomAction(
                    procedureCard
                      ? `Executing ${procedureCard.title} procedure against ${targetCategory ? targetCategory.toUpperCase() : 'target'} vector. Inspecting system logs and telemetry for anomalous indicators.`
                      : `Executing general IR investigation against ${targetCategory ? targetCategory.toUpperCase() : 'target'} vector. Inspecting telemetry for anomalous indicators.`
                  );
                }}
                style={{ fontSize: '0.65rem', background: 'rgba(0, 255, 136, 0.12)', border: '1px solid var(--neon-green)', color: 'var(--neon-green)', borderRadius: '4px', padding: '0.2rem 0.45rem', cursor: 'pointer', fontWeight: 700 }}
              >
                ⚡ Auto-Fill Default Action
              </button>

              <button
                type="button"
                onClick={() => {
                  setValidationError(false);
                  onChangeCustomAction && onChangeCustomAction(`Analyze SIEM authentication failure logs and Kerberos ticket requests on domain controllers.`);
                }}
                style={{ fontSize: '0.65rem', background: 'rgba(0, 243, 255, 0.08)', border: '1px solid rgba(0, 243, 255, 0.2)', color: 'var(--neon-cyan)', borderRadius: '4px', padding: '0.2rem 0.45rem', cursor: 'pointer' }}
              >
                + Auth Log Scan
              </button>

              <button
                type="button"
                onClick={() => {
                  setValidationError(false);
                  onChangeCustomAction && onChangeCustomAction(`Perform full EDR memory dump and inspect parent-child process tree on primary server.`);
                }}
                style={{ fontSize: '0.65rem', background: 'rgba(0, 255, 136, 0.08)', border: '1px solid rgba(0, 255, 136, 0.2)', color: 'var(--neon-green)', borderRadius: '4px', padding: '0.2rem 0.45rem', cursor: 'pointer' }}
              >
                + EDR Process Scan
              </button>

              <button
                type="button"
                onClick={() => {
                  setValidationError(false);
                  onChangeCustomAction && onChangeCustomAction(`Filter firewall PCAP and netflow telemetry for suspicious egress traffic on non-standard ports.`);
                }}
                style={{ fontSize: '0.65rem', background: 'rgba(255, 170, 0, 0.08)', border: '1px solid rgba(255, 170, 0, 0.2)', color: 'var(--neon-amber)', borderRadius: '4px', padding: '0.2rem 0.45rem', cursor: 'pointer' }}
              >
                + Netflow Egress Scan
              </button>
            </div>
          </div>
        )}

        {/* Animated D20 Visual */}
        <div style={{ position: 'relative', margin: '1rem auto 0.5rem', width: '120px', height: '120px' }}>
          <div style={{
            width: '100%', height: '100%',
            background: finalRoll !== null
              ? isSuccess
                ? 'linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,243,255,0.2))'
                : 'linear-gradient(135deg, rgba(255,51,102,0.2), rgba(255,170,0,0.2))'
              : 'linear-gradient(135deg, rgba(0,243,255,0.15), rgba(59,130,246,0.15))',
            border: `2px solid ${finalRoll !== null ? (isSuccess ? 'var(--neon-green)' : 'var(--neon-red)') : 'var(--neon-cyan)'}`,
            borderRadius: '24px',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 30px ${finalRoll !== null ? (isSuccess ? 'rgba(0,255,136,0.5)' : 'rgba(255,51,102,0.5)') : 'rgba(0,243,255,0.3)'}`,
            transform: isRolling ? 'rotate(360deg) scale(1.05)' : 'none',
            transition: 'transform 0.1s linear, background 0.3s ease'
          }}>
            <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '1px' }}>
              RAW D20
            </span>
            <span style={{
              fontFamily: 'var(--font-header)',
              fontSize: '2.2rem',
              fontWeight: 900,
              color: finalRoll !== null ? (isSuccess ? 'var(--neon-green)' : 'var(--neon-red)') : 'var(--neon-cyan)',
              textShadow: '0 0 15px currentColor',
              lineHeight: 1
            }}>
              {displayValue}
            </span>
          </div>
        </div>

        {/* PROMINENT FINAL ROLL VALUE BANNER */}
        <div style={{
          margin: '0.75rem 0 1rem',
          padding: '0.65rem 1rem',
          background: finalRoll !== null
            ? isSuccess ? 'rgba(0, 255, 136, 0.12)' : 'rgba(255, 51, 102, 0.12)'
            : 'rgba(0, 243, 255, 0.08)',
          border: `1px solid ${finalRoll !== null ? (isSuccess ? 'var(--neon-green)' : 'var(--neon-red)') : 'rgba(0, 243, 255, 0.3)'}`,
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
            FINAL ROLL VALUE
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 900,
            fontFamily: 'var(--font-header)',
            color: finalRoll !== null
              ? isSuccess ? 'var(--neon-green)' : 'var(--neon-red)'
              : 'var(--text-muted)',
            margin: '0.1rem 0'
          }}>
            {total !== null ? total : '--'}
          </div>
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {finalRoll !== null ? (
              <>
                Formula: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{finalRoll}</span> (Raw D20)
                {' '}{netModifier >= 0 ? '+' : '-'} <span style={{ color: 'var(--neon-cyan)', fontWeight: 600 }}>{Math.abs(netModifier)}</span> (Bonuses)
                {' = '}
                <strong style={{ color: isSuccess ? 'var(--neon-green)' : 'var(--neon-red)' }}>{total} Final Roll Value</strong>
              </>
            ) : (
              <span>Applied Net Bonus/Penalty: <strong style={{ color: netModifier >= 0 ? 'var(--neon-green)' : 'var(--neon-amber)' }}>{netModifier >= 0 ? `+${netModifier}` : netModifier}</strong></span>
            )}
          </div>
        </div>

        {/* Calculation Breakdown Grid */}
        <div style={{
          background: 'rgba(10, 15, 25, 0.7)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '0.75rem 0.85rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: hasInjectPenalty ? '1fr 1fr 1fr 1.2fr' : '1fr 1fr 1.2fr', gap: '0.4rem', textAlign: 'center', alignItems: 'center' }}>
            <div style={{ padding: '0.3rem 0.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-dim)', marginBottom: '0.1rem' }}>RAW D20</div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{finalRoll ?? '--'}</div>
            </div>
            <div style={{ padding: '0.3rem 0.2rem', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '6px' }}>
              <div style={{ fontSize: '0.58rem', color: 'var(--neon-green)', marginBottom: '0.1rem' }}>PROC BONUS</div>
              <div style={{ fontWeight: 700, color: procBonus > 0 ? 'var(--neon-green)' : 'var(--text-muted)' }}>
                +{procBonus}
              </div>
            </div>
            {hasInjectPenalty && (
              <div style={{ padding: '0.3rem 0.2rem', background: 'rgba(234, 179, 8, 0.05)', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.58rem', color: 'var(--neon-amber)', marginBottom: '0.1rem' }}>INJECT PENALTY</div>
                <div style={{ fontWeight: 700, color: 'var(--neon-amber)' }}>
                  {injPenalty}
                </div>
              </div>
            )}
            <div style={{
              padding: '0.3rem 0.2rem',
              background: total !== null ? (isSuccess ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 51, 102, 0.15)') : 'rgba(0, 243, 255, 0.05)',
              border: `1px solid ${total !== null ? (isSuccess ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 51, 102, 0.3)') : 'rgba(0, 243, 255, 0.2)'}`,
              borderRadius: '6px'
            }}>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-dim)', marginBottom: '0.1rem' }}>FINAL ROLL</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: total !== null ? (isSuccess ? 'var(--neon-green)' : 'var(--neon-red)') : 'var(--text-main)' }}>
                {total ?? '--'}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.68rem', color: hasThresholdChange ? 'var(--neon-amber)' : 'var(--text-dim)' }}>
            TARGET THRESHOLD: <strong>{threshold}+</strong> to succeed
            {hasThresholdChange && <span style={{ marginLeft: '0.4rem', fontWeight: 600 }}>⚡ (raised by active inject)</span>}
          </div>
        </div>

        {/* Outcome Tag */}
        {finalRoll !== null && (
          <div style={{
            margin: '0.85rem 0',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            background: finalRoll === 20
              ? 'rgba(0, 243, 255, 0.25)'
              : finalRoll === 1
              ? 'rgba(234, 179, 8, 0.25)'
              : isSuccess
              ? 'rgba(0, 255, 136, 0.15)'
              : 'rgba(255, 51, 102, 0.15)',
            border: `1px solid ${finalRoll === 20 ? 'var(--neon-cyan)' : finalRoll === 1 ? 'var(--neon-amber)' : isSuccess ? 'var(--neon-green)' : 'var(--neon-red)'}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
            fontFamily: 'var(--font-header)', fontSize: '0.88rem',
            color: finalRoll === 20 ? 'var(--neon-cyan)' : finalRoll === 1 ? 'var(--neon-amber)' : isSuccess ? 'var(--neon-green)' : 'var(--neon-red)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              <span>{isSuccess ? `SUCCESS — FINAL VALUE ${total} (NEED ${threshold}+)` : `FAILURE — FINAL VALUE ${total} (NEED ${threshold}+)`}</span>
            </div>
            {finalRoll === 20 && (
              <div style={{ fontSize: '0.7rem', color: 'var(--neon-cyan)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                ⚡ NAT 20 CRITICAL — INJECT EVENT TRIGGERED
              </div>
            )}
            {finalRoll === 1 && (
              <div style={{ fontSize: '0.7rem', color: 'var(--neon-amber)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                ⚠️ NAT 1 FUMBLE — INJECT EVENT TRIGGERED
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.25rem' }}>
          {finalRoll === null ? (
            <>
              <button className="cyber-button" onClick={onCancel} disabled={isRolling}>CANCEL</button>
              <button className="cyber-button cyber-button-success" onClick={handleStartRoll} disabled={isRolling}>
                <Dices size={16} />
                <span>{isRolling ? 'ROLLING...' : 'ROLL D20'}</span>
              </button>
            </>
          ) : (
            <button
              className="cyber-button cyber-button-success"
              onClick={() => onRollComplete({ d20Roll: finalRoll, totalRoll: total, isSuccess })}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} />
              <span>SUBMIT ROLL TO AI IM</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

