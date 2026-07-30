import React, { useState, useEffect } from 'react';
import { Settings, Cpu, Globe, CheckCircle2, AlertCircle, RefreshCw, X, Sparkles } from 'lucide-react';
import { fetchOllamaModels, testConnection, isVercelDeployment } from '../engine/aiService.js';

export default function SettingsModal({
  isOpen,
  config,
  onSave,
  onClose
}) {
  const [formData, setFormData] = useState(config);
  const [ollamaModels, setOllamaModels] = useState([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    setFormData(config);
    setTestResult(null);
    if (isOpen && config.provider === 'ollama') {
      loadOllamaModels(config.ollamaUrl);
    }
  }, [isOpen, config]);

  const loadOllamaModels = async (url) => {
    setIsLoadingModels(true);
    const models = await fetchOllamaModels(url);
    setOllamaModels(models);
    setIsLoadingModels(false);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testConnection(formData);
    setTestResult(result);
    setIsTesting(false);
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handlePreset = (presetType) => {
    if (presetType === 'openai') {
      setFormData(prev => ({ ...prev, openaiUrl: 'https://api.openai.com/v1', openaiModel: 'gpt-4o' }));
    } else if (presetType === 'groq') {
      setFormData(prev => ({ ...prev, openaiUrl: 'https://api.groq.com/openai/v1', openaiModel: 'llama-3.3-70b-versatile' }));
    } else if (presetType === 'openrouter') {
      setFormData(prev => ({ ...prev, openaiUrl: 'https://openrouter.ai/api/v1', openaiModel: 'openai/gpt-4o-mini' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 14, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'var(--z-modal-top, 1100)',
      padding: '1rem'
    }}>
      <div className="cyber-card" style={{ width: '100%', maxWidth: '580px', padding: '1.75rem', position: 'relative' }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Settings size={22} color="var(--neon-cyan)" />
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.1rem', fontWeight: 700 }}>
              AI INCIDENT MASTER // PROVIDER CONFIG
            </h2>
          </div>

          {isVercelDeployment() && (
            <span style={{
              background: 'rgba(0, 243, 255, 0.12)',
              border: '1px solid var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              marginRight: '2rem'
            }}>
              VERCEL HOSTED
            </span>
          )}
        </div>

        {/* Provider Toggle Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <button
            type="button"
            className={`cyber-button ${formData.provider === 'ollama' ? 'cyber-button-success' : ''}`}
            onClick={() => {
              setFormData({ ...formData, provider: 'ollama' });
              loadOllamaModels(formData.ollamaUrl);
            }}
            style={{ justifyContent: 'center', opacity: formData.provider === 'ollama' ? 1 : 0.6 }}
          >
            <Cpu size={16} />
            <span>OLLAMA (LOCAL)</span>
          </button>

          <button
            type="button"
            className={`cyber-button ${formData.provider === 'openai' ? 'cyber-button-success' : ''}`}
            onClick={() => setFormData({ ...formData, provider: 'openai' })}
            style={{ justifyContent: 'center', opacity: formData.provider === 'openai' ? 1 : 0.6 }}
          >
            <Globe size={16} />
            <span>OPENAI / COMPATIBLE API</span>
          </button>
        </div>

        {/* Ollama Settings Form */}
        {formData.provider === 'ollama' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                OLLAMA ENDPOINT URL
              </label>
              <input
                type="text"
                value={formData.ollamaUrl}
                onChange={(e) => setFormData({ ...formData, ollamaUrl: e.target.value })}
                placeholder="http://localhost:11434"
                style={{
                  width: '100%',
                  background: 'rgba(8, 11, 17, 0.9)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.6rem',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  LOCAL MODEL TAG
                </label>
                <button
                  type="button"
                  onClick={() => loadOllamaModels(formData.ollamaUrl)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <RefreshCw size={12} className={isLoadingModels ? 'animate-spin' : ''} />
                  <span>Refresh List</span>
                </button>
              </div>

              <input
                type="text"
                value={formData.ollamaModel}
                onChange={(e) => setFormData({ ...formData, ollamaModel: e.target.value })}
                placeholder="hf.co/OBLITERATUS/Gemma-4-12B-OBLITERATED:Q4_K_M"
                style={{
                  width: '100%',
                  background: 'rgba(8, 11, 17, 0.9)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.6rem',
                  borderRadius: '6px',
                  marginBottom: '0.5rem'
                }}
              />

              {ollamaModels.length > 0 && (
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  Detected Models:
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                    {ollamaModels.map((m) => (
                      <span
                        key={m}
                        onClick={() => setFormData({ ...formData, ollamaModel: m })}
                        style={{
                          background: formData.ollamaModel === m ? 'var(--neon-cyan)' : 'rgba(15, 21, 35, 0.8)',
                          color: formData.ollamaModel === m ? '#080b11' : 'var(--text-muted)',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem'
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                GPU OFFLOAD LAYERS (num_gpu: 99 = ALL GPU LAYERS)
              </label>
              <input
                type="number"
                value={formData.numGpu !== undefined ? formData.numGpu : 99}
                onChange={(e) => setFormData({ ...formData, numGpu: parseInt(e.target.value, 10) || 0 })}
                placeholder="99"
                style={{
                  width: '100%',
                  background: 'rgba(8, 11, 17, 0.9)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.6rem',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>
        )}

        {/* OpenAI Settings Form */}
        {formData.provider === 'openai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Quick Provider Presets */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                QUICK PROVIDER PRESETS:
              </span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => handlePreset('openai')}
                  style={{ fontSize: '0.68rem', background: 'rgba(0, 243, 255, 0.12)', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)', borderRadius: '4px', padding: '0.2rem 0.45rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  OpenAI
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('groq')}
                  style={{ fontSize: '0.68rem', background: 'rgba(0, 255, 136, 0.12)', border: '1px solid var(--neon-green)', color: 'var(--neon-green)', borderRadius: '4px', padding: '0.2rem 0.45rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  Groq
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('openrouter')}
                  style={{ fontSize: '0.68rem', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid var(--neon-purple)', color: 'var(--neon-purple)', borderRadius: '4px', padding: '0.2rem 0.45rem', cursor: 'pointer', fontWeight: 700 }}
                >
                  OpenRouter
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                API BASE URL (OpenAI, OpenRouter, Groq, LM Studio)
              </label>
              <input
                type="text"
                value={formData.openaiUrl}
                onChange={(e) => setFormData({ ...formData, openaiUrl: e.target.value })}
                placeholder="https://api.openai.com/v1"
                style={{
                  width: '100%',
                  background: 'rgba(8, 11, 17, 0.9)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.6rem',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                API KEY
              </label>
              <input
                type="password"
                value={formData.openaiKey}
                onChange={(e) => setFormData({ ...formData, openaiKey: e.target.value })}
                placeholder="sk-..."
                style={{
                  width: '100%',
                  background: 'rgba(8, 11, 17, 0.9)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.6rem',
                  borderRadius: '6px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                MODEL NAME
              </label>
              <input
                type="text"
                value={formData.openaiModel}
                onChange={(e) => setFormData({ ...formData, openaiModel: e.target.value })}
                placeholder="gpt-4o or groq/llama-3.3-70b"
                style={{
                  width: '100%',
                  background: 'rgba(8, 11, 17, 0.9)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  padding: '0.6rem',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>
        )}

        {/* Temperature Slider */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <span>TEMPERATURE (CREATIVITY)</span>
            <span style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>{formData.temperature}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={formData.temperature}
            onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
            style={{ width: '100%', accentColor: 'var(--neon-cyan)' }}
          />
        </div>

        {/* Live Connection Test Banner */}
        {testResult && (
          <div style={{
            marginTop: '1rem',
            padding: '0.65rem 0.85rem',
            borderRadius: '6px',
            background: testResult.success ? 'rgba(0, 255, 136, 0.12)' : 'rgba(255, 51, 102, 0.12)',
            border: `1px solid ${testResult.success ? 'var(--neon-green)' : 'var(--neon-red)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: testResult.success ? 'var(--neon-green)' : 'var(--neon-red)'
          }}>
            {testResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            type="button"
            className="cyber-button"
            onClick={handleTestConnection}
            disabled={isTesting}
          >
            <RefreshCw size={14} className={isTesting ? 'animate-spin' : ''} />
            <span>{isTesting ? 'TESTING...' : 'TEST CONNECTION'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="button" className="cyber-button" onClick={onClose}>
              CANCEL
            </button>
            <button type="button" className="cyber-button cyber-button-success" onClick={handleSave}>
              SAVE & APPLY
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
