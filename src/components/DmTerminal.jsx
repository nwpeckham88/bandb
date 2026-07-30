import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, Loader2, Bot, User, MessageSquare } from 'lucide-react';
import AiStatusIndicator from './AiStatusIndicator.jsx';

const ROLE_CONFIG = {
  dm: {
    bg: 'rgba(15, 21, 35, 0.6)',
    border: 'var(--neon-cyan)',
    labelColor: 'var(--neon-cyan)',
    label: 'INCIDENT MASTER',
    Icon: Bot,
    iconColor: 'var(--neon-cyan)',
  },
  player: {
    bg: 'rgba(0, 243, 255, 0.05)',
    border: 'var(--neon-green)',
    labelColor: 'var(--neon-green)',
    label: 'DEFENDER ACTION',
    Icon: User,
    iconColor: 'var(--neon-green)',
  },
  inject: {
    bg: 'rgba(234, 179, 8, 0.08)',
    border: 'var(--neon-amber)',
    labelColor: 'var(--neon-amber)',
    label: 'INJECT EVENT',
    Icon: User,
    iconColor: 'var(--neon-amber)',
  },
  chat: {
    bg: 'rgba(168, 85, 247, 0.07)',
    border: '#a855f7',
    labelColor: '#a855f7',
    label: 'TEAM COMMS',
    Icon: MessageSquare,
    iconColor: '#a855f7',
  },
  chat_im: {
    bg: 'rgba(15, 21, 35, 0.6)',
    border: 'var(--neon-cyan)',
    labelColor: 'var(--neon-cyan)',
    label: 'INCIDENT MASTER',
    Icon: Bot,
    iconColor: 'var(--neon-cyan)',
  },
};

export default function DmTerminal({
  logs = [],
  isAiThinking = false,
  config,
  onSendChatMessage,
  onClearLogs
}) {
  const [inputText, setInputText] = useState('');
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isAiThinking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isAiThinking) return;
    onSendChatMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="cyber-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Terminal Header */}
      <div style={{
        padding: '0.75rem 1rem',
        background: 'rgba(15, 21, 35, 0.9)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-header)', fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>
          <Terminal size={16} />
          <span>INCIDENT MASTER // FEED &amp; COMMS</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isAiThinking && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)' }}>
              <Loader2 size={12} className="animate-spin" /> IM RESPONDING...
            </span>
          )}
          <button
            onClick={onClearLogs}
            title="Clear Feed Logs"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '0.2rem' }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Output Log Area */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        lineHeight: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        background: 'rgba(5, 8, 14, 0.7)'
      }}>
        {logs.length === 0 ? (
          <div style={{ color: 'var(--text-dim)', textAlign: 'center', margin: 'auto' }}>
            [ SYSTEM READY // AWAITING INCIDENT INITIALIZATION ]
          </div>
        ) : (
          logs.map((log) => {
            const rc = ROLE_CONFIG[log.role] || ROLE_CONFIG.dm;
            const { Icon } = rc;
            return (
              <div
                key={log.id}
                style={{
                  background: rc.bg,
                  borderLeft: `3px solid ${rc.border}`,
                  padding: '0.65rem 0.85rem',
                  borderRadius: '0 6px 6px 0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                {/* Log Header Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Icon size={12} color={rc.iconColor} />
                    <span style={{ fontWeight: 700, color: rc.labelColor }}>
                      {rc.label}
                    </span>
                  </div>
                  <span>{log.timestamp}</span>
                </div>

                {/* Log Message Content */}
                <div style={{ color: 'var(--text-main)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                  {log.text}
                </div>

                {/* Roll Metric Badge inside log */}
                {log.rollData && (
                  <div style={{
                    marginTop: '0.5rem',
                    display: 'inline-flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.3rem 0.6rem',
                    background: 'rgba(0,0,0,0.4)',
                    border: `1px solid ${log.rollData.isSuccess ? 'rgba(0,255,136,0.35)' : 'rgba(255,51,102,0.35)'}`,
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    color: log.rollData.isSuccess ? 'var(--neon-green)' : 'var(--neon-red)'
                  }}>
                    <span>RAW D20: <strong>{log.rollData.d20Roll}</strong></span>
                    <span style={{ opacity: 0.5 }}>|</span>
                    <span>BONUSES: <strong>{log.rollData.modifier >= 0 ? `+${log.rollData.modifier}` : log.rollData.modifier}</strong></span>
                    <span style={{ opacity: 0.5 }}>|</span>
                    <strong style={{ fontSize: '0.76rem', letterSpacing: '0.5px' }}>
                      FINAL ROLL VALUE: {log.rollData.totalRoll} ({log.rollData.isSuccess ? 'SUCCESS' : 'FAIL'})
                    </strong>
                  </div>
                )}
              </div>
            );
          })
        )}

        {isAiThinking && (
          <div style={{ marginTop: '0.5rem' }}>
            <AiStatusIndicator mode={logs.length === 0 ? 'INITIALIZING' : 'EVALUATING'} config={config} />
          </div>
        )}
        <div ref={logEndRef} />
      </div>

      {/* Direct IM Comms Input */}
      <form onSubmit={handleSubmit} style={{ padding: '0.75rem 1rem', background: 'rgba(12, 17, 28, 0.95)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: '#c084fc',
          marginBottom: '0.4rem',
          fontWeight: 700
        }}>
          <MessageSquare size={13} />
          <span>DIRECT IM COMMS — Ask the Incident Master anything</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            id="im-chat-input"
            placeholder="Ask the IM a question, request guidance, or share intel..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAiThinking}
            style={{
              flex: 1,
              background: 'rgba(8, 11, 17, 0.95)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            className="cyber-button"
            disabled={!inputText.trim() || isAiThinking}
            style={{ padding: '0.65rem 1.1rem', borderColor: '#a855f7', color: '#a855f7', fontWeight: 700 }}
          >
            <Send size={15} />
          </button>
        </div>
      </form>

    </div>
  );
}
