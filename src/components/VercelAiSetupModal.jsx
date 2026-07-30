import React, { useState } from 'react';
import { Cpu, Globe, CheckCircle2, Shield, Sparkles, Key, Server, Terminal, AlertTriangle } from 'lucide-react';

export default function VercelAiSetupModal({
  isOpen,
  config,
  onSave,
  onClose
}) {
  const [providerMode, setProviderMode] = useState('cloud'); // 'cloud' | 'local'

  // Cloud AI state
  const [openaiUrl, setOpenaiUrl] = useState(config.openaiUrl || 'https://api.openai.com/v1');
  const [openaiKey, setOpenaiKey] = useState(config.openaiKey || '');
  const [openaiModel, setOpenaiModel] = useState(config.openaiModel || 'gpt-4o');

  // Local AI state (split into Host and Port)
  const parseUrl = (urlStr) => {
    try {
      const u = new URL(urlStr || 'http://localhost:11434');
      return { host: `${u.protocol}//${u.hostname}`, port: u.port || '11434' };
    } catch (e) {
      return { host: 'http://localhost', port: '11434' };
    }
  };

  const initialUrl = parseUrl(config.ollamaUrl);
  const [ollamaHost, setOllamaHost] = useState(initialUrl.host);
  const [ollamaPort, setOllamaPort] = useState(initialUrl.port);
  const [ollamaModel, setOllamaModel] = useState(config.ollamaModel || 'hf.co/OBLITERATUS/Gemma-4-12B-OBLITERATED:Q4_K_M');

  if (!isOpen) return null;

  const handleApplyPreset = (presetType) => {
    if (presetType === 'openai') {
      setOpenaiUrl('https://api.openai.com/v1');
      setOpenaiModel('gpt-4o');
    } else if (presetType === 'groq') {
      setOpenaiUrl('https://api.groq.com/openai/v1');
      setOpenaiModel('llama-3.3-70b-versatile');
    } else if (presetType === 'openrouter') {
      setOpenaiUrl('https://openrouter.ai/api/v1');
      setOpenaiModel('openai/gpt-4o-mini');
    }
  };

  const handleConfirm = () => {
    let finalOllamaUrl = config.ollamaUrl;
    if (ollamaHost) {
      const cleanHost = ollamaHost.replace(/\/+$/, '');
      finalOllamaUrl = `${cleanHost}:${ollamaPort || '11434'}`;
    }

    const updatedConfig = {
      ...config,
      provider: providerMode === 'cloud' ? 'openai' : 'ollama',
      openaiUrl,
      openaiKey,
      openaiModel,
      ollamaUrl: finalOllamaUrl,
      ollamaModel,
      vercelModeChosen: true
    };

    localStorage.setItem('bb_vercel_ai_mode_chosen', providerMode);
    localStorage.setItem('bb_ai_config', JSON.stringify(updatedConfig));
    onSave(updatedConfig);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(3, 6, 12, 0.92)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1200,
      padding: '1rem'
    }}>
      <div className="cyber-card animate-pulse-glow" style={{
        width: '100%',
        maxWidth: '640px',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '1.75rem',
        border: '1.5px solid var(--neon-cyan)',
        boxShadow: '0 0 40px rgba(0, 243, 255, 0.3)'
      }}>

        {/* Header Badge */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(0, 243, 255, 0.12)',
            border: '1px solid var(--neon-cyan)',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            color: 'var(--neon-cyan)',
            fontFamily: 'var(--font-header)',
            fontSize: '0.72rem',
            fontWeight: 800,
            marginBottom: '0.65rem'
          }}>
            <Sparkles size={14} />
            <span>VERCEL HOSTED ENVIRONMENT DETECTED</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
            CONFIGURE AI INCIDENT MASTER
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginTop: '0.35rem', lineHeight: 1.45 }}>
            Choose how you want to connect to AI for live incident narration. Select <strong>Cloud AI</strong> for zero-permission web playback, or <strong>Local AI (Ollama)</strong> to connect to your local machine.
          </p>
        </div>

        {/* Provider Choice Selector Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
          
          {/* Cloud AI Option Card */}
          <div
            onClick={() => setProviderMode('cloud')}
            className={`cyber-card ${providerMode === 'cloud' ? 'cyber-card-glow' : ''}`}
            style={{
              padding: '1rem',
              cursor: 'pointer',
              borderColor: providerMode === 'cloud' ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.1)',
              background: providerMode === 'cloud' ? 'rgba(0, 243, 255, 0.08)' : 'rgba(8, 11, 17, 0.7)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-header)', marginBottom: '0.35rem' }}>
              <Globe size={18} />
              <span>CLOUD AI (RECOMMENDED)</span>
            </div>
            <p style={{ fontSize: '0.73rem', color: 'var(--text-main)', lineHeight: 1.35 }}>
              Use OpenAI, OpenRouter, Groq, or LM Studio API.
            </p>
            <div style={{ fontSize: '0.68rem', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginTop: '0.45rem' }}>
              ✓ No local network permissions required!
            </div>
          </div>

          {/* Local AI Option Card */}
          <div
            onClick={() => setProviderMode('local')}
            className={`cyber-card ${providerMode === 'local' ? 'cyber-card-glow' : ''}`}
            style={{
              padding: '1rem',
              cursor: 'pointer',
              borderColor: providerMode === 'local' ? 'var(--neon-purple)' : 'rgba(255, 255, 255, 0.1)',
              background: providerMode === 'local' ? 'rgba(168, 85, 247, 0.08)' : 'rgba(8, 11, 17, 0.7)',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-purple)', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-header)', marginBottom: '0.35rem' }}>
              <Cpu size={18} />
              <span>LOCAL AI (OLLAMA)</span>
            </div>
            <p style={{ fontSize: '0.73rem', color: 'var(--text-main)', lineHeight: 1.35 }}>
              Connect to your local Ollama server instance.
            </p>
            <div style={{ fontSize: '0.68rem', color: 'var(--neon-amber)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginTop: '0.45rem' }}>
              ⚡ Configurable URL & Port (requires CORS/local access)
            </div>
          </div>

        </div>

        {/* Configuration Panel for Cloud AI */}
        {providerMode === 'cloud' && (
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(0, 243, 255, 0.25)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-header)', color: 'var(--neon-cyan)', fontWeight: 700 }}>
                CLOUD API CONFIGURATION
              </div>
              
              {/* Quick Presets */}
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('openai')}
                  style={{ fontSize: '0.65rem', background: 'rgba(0, 243, 255, 0.12)', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)', borderRadius: '4px', padding: '0.15rem 0.4rem', cursor: 'pointer' }}
                >
                  OpenAI
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('groq')}
                  style={{ fontSize: '0.65rem', background: 'rgba(0, 255, 136, 0.12)', border: '1px solid var(--neon-green)', color: 'var(--neon-green)', borderRadius: '4px', padding: '0.15rem 0.4rem', cursor: 'pointer' }}
                >
                  Groq
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('openrouter')}
                  style={{ fontSize: '0.65rem', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid var(--neon-purple)', color: 'var(--neon-purple)', borderRadius: '4px', padding: '0.15rem 0.4rem', cursor: 'pointer' }}
                >
                  OpenRouter
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                  API BASE URL
                </label>
                <input
                  type="text"
                  value={openaiUrl}
                  onChange={(e) => setOpenaiUrl(e.target.value)}
                  placeholder="https://api.openai.com/v1"
                  style={{
                    width: '100%',
                    background: 'rgba(8, 11, 17, 0.9)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    padding: '0.55rem',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                  API KEY
                </label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="sk-..."
                  style={{
                    width: '100%',
                    background: 'rgba(8, 11, 17, 0.9)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    padding: '0.55rem',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                  MODEL NAME
                </label>
                <input
                  type="text"
                  value={openaiModel}
                  onChange={(e) => setOpenaiModel(e.target.value)}
                  placeholder="gpt-4o or groq/llama-3.3-70b-versatile"
                  style={{
                    width: '100%',
                    background: 'rgba(8, 11, 17, 0.9)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    padding: '0.55rem',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

          </div>
        )}

        {/* Configuration Panel for Local AI */}
        {providerMode === 'local' && (
          <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
            
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-header)', color: 'var(--neon-purple)', fontWeight: 700, marginBottom: '0.75rem' }}>
              LOCAL OLLAMA CONNECTION (URL & PORT)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '0.65rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                    OLLAMA HOST URL
                  </label>
                  <input
                    type="text"
                    value={ollamaHost}
                    onChange={(e) => setOllamaHost(e.target.value)}
                    placeholder="http://localhost or http://192.168.1.100"
                    style={{
                      width: '100%',
                      background: 'rgba(8, 11, 17, 0.9)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      padding: '0.55rem',
                      borderRadius: '6px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                    PORT
                  </label>
                  <input
                    type="text"
                    value={ollamaPort}
                    onChange={(e) => setOllamaPort(e.target.value)}
                    placeholder="11434"
                    style={{
                      width: '100%',
                      background: 'rgba(8, 11, 17, 0.9)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      padding: '0.55rem',
                      borderRadius: '6px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                  OLLAMA MODEL TAG
                </label>
                <input
                  type="text"
                  value={ollamaModel}
                  onChange={(e) => setOllamaModel(e.target.value)}
                  placeholder="hf.co/OBLITERATUS/Gemma-4-12B-OBLITERATED:Q4_K_M"
                  style={{
                    width: '100%',
                    background: 'rgba(8, 11, 17, 0.9)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    padding: '0.55rem',
                    borderRadius: '6px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{
                fontSize: '0.72rem',
                color: 'var(--neon-amber)',
                background: 'rgba(234, 179, 8, 0.1)',
                border: '1px solid var(--neon-amber)',
                borderRadius: '6px',
                padding: '0.5rem 0.65rem',
                lineHeight: 1.4,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.4rem'
              }}>
                <AlertTriangle size={15} color="var(--neon-amber)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                <span>
                  <strong>Ollama Web Connection Note:</strong> When connecting to Ollama from a web domain, launch Ollama with environment variable <code style={{ color: '#fff' }}>OLLAMA_ORIGINS="*"</code> to allow CORS web requests.
                </span>
              </div>

            </div>

          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button
            type="button"
            className="cyber-button cyber-button-success"
            onClick={handleConfirm}
            style={{ padding: '0.65rem 1.5rem', fontWeight: 800, fontSize: '0.85rem' }}
          >
            <CheckCircle2 size={16} />
            <span>SAVE &amp; CONFIRM AI SETTINGS</span>
          </button>
        </div>

      </div>
    </div>
  );
}
