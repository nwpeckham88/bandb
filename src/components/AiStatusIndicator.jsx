import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Cpu, Globe } from 'lucide-react';

export default function AiStatusIndicator({ mode = 'EVALUATING', config }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const providerName = config?.provider === 'openai' ? 'OPENAI API' : 'LOCAL OLLAMA';
  const modelName = config?.provider === 'openai'
    ? config?.openaiModel || 'gpt-4o'
    : config?.ollamaModel || 'hf.co/OBLITERATUS/Gemma-4-12B-OBLITERATED:Q4_K_M';

  return (
    <div style={{
      background: 'rgba(15, 21, 35, 0.95)',
      border: '1px solid rgba(0, 243, 255, 0.3)',
      borderRadius: '6px',
      padding: '0.75rem 1rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--neon-cyan)', fontWeight: 700 }}>
          <Loader2 size={14} className="animate-spin" />
          <span>AI INCIDENT MASTER ({mode}) GENERATING NARRATION</span>
        </div>
        <span style={{ color: 'var(--neon-green)', fontSize: '0.7rem', fontWeight: 600 }}>
          {elapsed}s elapsed
        </span>
      </div>

      {/* Real Live API Endpoint & Target Model Info */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-main)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: 'rgba(5, 8, 14, 0.6)',
        padding: '0.35rem 0.6rem',
        borderRadius: '4px',
        border: '1px solid rgba(0, 243, 255, 0.15)'
      }}>
        {config?.provider === 'openai' ? <Globe size={12} color="var(--neon-cyan)" /> : <Cpu size={12} color="var(--neon-green)" />}
        <span>
          <strong>[{providerName}]</strong> Target Model: <span style={{ color: 'var(--neon-cyan)' }}>{modelName}</span>
        </span>
      </div>

      {/* Live Request Subtext */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--neon-green)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem'
      }}>
        <Sparkles size={12} className="animate-pulse" />
        <span>[LIVE HTTP API REQUEST IN FLIGHT] Awaiting response generation from model...</span>
      </div>

      {/* Cyber Glow Progress Bar */}
      <div style={{
        height: '3px',
        width: '100%',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          height: '100%',
          width: '40%',
          background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
          animation: 'cyberPulse 1.8s infinite linear',
          position: 'absolute'
        }} />
      </div>
    </div>
  );
}
