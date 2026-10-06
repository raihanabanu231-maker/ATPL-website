import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Radio, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Globe, 
  Database, 
  Bell, 
  CheckCircle2,
  Bot,
  Zap,
  Key,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const AdminSettings = () => {
  const { siteSettings, setSiteSettings, resetDemoData, addToast } = useApp();

  const getSavedApiKey = () => {
    try {
      return (
        siteSettings?.grokApiKey ||
        localStorage.getItem('atpl_grok_api_key') ||
        (JSON.parse(localStorage.getItem('atpl_site_settings') || '{}')?.grokApiKey) ||
        ''
      );
    } catch {
      return '';
    }
  };

  const [formState, setFormState] = useState(() => ({
    bannerActive: true,
    bannerText: '',
    phone: '',
    email: '',
    salesEmail: '',
    supportEmail: '',
    mqttBroker: '',
    grokApiKey: getSavedApiKey(),
    grokModel: siteSettings?.grokModel || localStorage.getItem('atpl_grok_model') || 'grok-beta',
    grokApiEndpoint: siteSettings?.grokApiEndpoint || localStorage.getItem('atpl_grok_api_endpoint') || 'https://api.x.ai/v1/chat/completions',
    ...siteSettings
  }));

  const [testingGrok, setTestingGrok] = useState(false);
  const [grokTestStatus, setGrokTestStatus] = useState(null);

  useEffect(() => {
    if (siteSettings) {
      setFormState(prev => ({
        ...prev,
        ...siteSettings,
        grokApiKey: prev.grokApiKey || siteSettings.grokApiKey || getSavedApiKey(),
        grokModel: prev.grokModel || siteSettings.grokModel || 'grok-beta',
        grokApiEndpoint: prev.grokApiEndpoint || siteSettings.grokApiEndpoint || 'https://api.x.ai/v1/chat/completions'
      }));
    }
  }, [siteSettings]);

  const handleSave = (e) => {
    e.preventDefault();
    setSiteSettings(formState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('atpl_site_settings', JSON.stringify(formState));
      localStorage.setItem('atpl_grok_api_key', (formState.grokApiKey || '').trim());
      localStorage.setItem('atpl_grok_model', (formState.grokModel || 'grok-beta').trim());
      localStorage.setItem('atpl_grok_api_endpoint', (formState.grokApiEndpoint || 'https://api.x.ai/v1/chat/completions').trim());
    }
    addToast('Settings Saved', 'Site configuration and AI engine parameters updated.', 'success');
  };

  const applyPreset = (provider) => {
    if (provider === 'groq') {
      setFormState(prev => ({
        ...prev,
        grokModel: 'openai/gpt-oss-120b',
        grokApiEndpoint: 'https://api.groq.com/openai/v1/chat/completions'
      }));
      addToast('Groq Free Preset Selected', 'Using openai/gpt-oss-120b with your free Groq API key.', 'info');
    } else if (provider === 'gemini') {
      setFormState(prev => ({
        ...prev,
        grokModel: 'gemini-1.5-flash',
        grokApiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
      }));
      addToast('Google Gemini Free Preset Selected', 'Paste your free Google AI Studio key (starts with AIza...)', 'info');
    } else if (provider === 'grok') {
      setFormState(prev => ({
        ...prev,
        grokModel: 'grok-beta',
        grokApiEndpoint: 'https://api.x.ai/v1/chat/completions'
      }));
    }
  };

  const testGrokConnection = async () => {
    let keyToTest = (formState.grokApiKey || getSavedApiKey()).trim();
    let endpoint = formState.grokApiEndpoint || 'https://api.groq.com/openai/v1/chat/completions';
    let model = formState.grokModel || 'openai/gpt-oss-120b';

    // Smart auto-fix if user accidentally pasted key in Endpoint box
    if ((!keyToTest || keyToTest.length < 5) && formState.grokApiEndpoint?.startsWith('gsk_')) {
      keyToTest = formState.grokApiEndpoint.trim();
      endpoint = 'https://api.groq.com/openai/v1/chat/completions';
      model = 'openai/gpt-oss-120b';
      setFormState(prev => ({
        ...prev,
        grokApiKey: keyToTest,
        grokApiEndpoint: endpoint,
        grokModel: model
      }));
    } else if ((!keyToTest || keyToTest.length < 5) && formState.grokApiEndpoint?.startsWith('AIza')) {
      keyToTest = formState.grokApiEndpoint.trim();
      endpoint = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
      model = 'gemini-1.5-flash';
      setFormState(prev => ({
        ...prev,
        grokApiKey: keyToTest,
        grokApiEndpoint: endpoint,
        grokModel: model
      }));
    }

    if (!keyToTest || keyToTest.length < 5) {
      addToast('API Key Required', 'Please paste your free Groq or Gemini API key into the API Key box above.', 'warning');
      return;
    }

    if (keyToTest.startsWith('gsk_')) {
      endpoint = 'https://api.groq.com/openai/v1/chat/completions';
      if (!model || model === 'grok-beta' || model.includes('llama') || model.includes('70b-versatile')) {
        model = 'openai/gpt-oss-120b';
      }
    } else if (keyToTest.startsWith('AIza')) {
      endpoint = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
      if (!model || model === 'grok-beta') model = 'gemini-1.5-flash';
    }

    setTestingGrok(true);
    setGrokTestStatus(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keyToTest}`
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: 'Say "ATPL AI Connected"' }],
          max_tokens: 20
        })
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        let msg = data?.error?.message || `HTTP ${res.status}: ${res.statusText}`;
        if (msg.includes('model_not_found') || msg.includes('Invalid API Key') || res.status === 401 || res.status === 404) {
          msg = 'Invalid or truncated API Key. Please create a new key at console.groq.com/keys and copy it completely.';
        }
        throw new Error(msg);
      }
      const reply = data?.choices?.[0]?.message?.content || 'Connection successful';
      setGrokTestStatus({ ok: true, msg: `Verified: "${reply.trim()}"` });
      addToast('AI Connected', 'Successfully verified live connection to Free Groq AI model!', 'success');
    } catch (err) {
      setGrokTestStatus({ ok: false, msg: err.message || 'Connection failed' });
      addToast('AI Connection Error', err.message || 'Could not connect to AI API', 'error');
    } finally {
      setTestingGrok(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.45rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          System & <span className="gradient-text">CMS Configuration</span>
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          Configure enterprise ERP endpoints, IoT MQTT broker, homepage ribbons, official contacts, and live AI engine.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Section 1: Homepage Announcement Banner */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Bell size={18} color="var(--cyan-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Homepage Notification Ribbon</h3>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              id="bannerActive"
              checked={!!formState.bannerActive}
              onChange={(e) => setFormState({ ...formState, bannerActive: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--cyan-primary)', cursor: 'pointer' }}
            />
            <label htmlFor="bannerActive" style={{ cursor: 'pointer', color: '#ffffff', fontSize: '0.9rem', marginBottom: 0 }}>
              Enable Top Announcement Ribbon on Website
            </label>
          </div>

          <div className="form-group">
            <label>Announcement Text</label>
            <input
              type="text"
              className="form-control"
              value={formState.bannerText || ''}
              onChange={(e) => setFormState({ ...formState, bannerText: e.target.value })}
            />
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Globe size={18} color="var(--cyan-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Official Corporate Contacts</h3>
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label>Official Helpline Phone</label>
              <input
                type="text"
                className="form-control"
                value={formState.phone || ''}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>General Email</label>
              <input
                type="email"
                className="form-control"
                value={formState.email || ''}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label>Enterprise Sales Email</label>
              <input
                type="email"
                className="form-control"
                value={formState.salesEmail || ''}
                onChange={(e) => setFormState({ ...formState, salesEmail: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>24/7 AMC Support Email</label>
              <input
                type="email"
                className="form-control"
                value={formState.supportEmail || ''}
                onChange={(e) => setFormState({ ...formState, supportEmail: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Archie AI & LLM Engine Configuration */}
        <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(0, 240, 255, 0.35)', background: 'linear-gradient(135deg, rgba(11, 21, 40, 0.9) 0%, rgba(4, 11, 24, 0.95) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={20} color="var(--cyan-primary)" />
              <div>
                <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>Archie AI (Smart Robot Guide & Live LLM Engine)</h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Supports Free Groq (Llama 3), Free Google Gemini, xAI Grok, or offline Built-in Neural AI.</span>
              </div>
            </div>
            <span className={`badge ${formState.grokApiKey ? 'badge-emerald' : 'badge-amber'}`}>
              {formState.grokApiKey ? 'Live Cloud LLM Active' : 'Hybrid Local AI (100% Free)'}
            </span>
          </div>

          {/* Quick 1-Click Free Presets */}
          <div style={{ marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(0,0,0,0.25)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={13} /> 1-Click Free AI Providers (No credit card needed):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => applyPreset('groq')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                ⚡ Groq Cloud (Free Llama 3.3)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('gemini')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                ✨ Google Gemini (Free Tier)
              </button>
              <button
                type="button"
                onClick={() => applyPreset('grok')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
              >
                🚀 xAI Grok
              </button>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--cyan-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginLeft: 'auto', textDecoration: 'none', padding: '0.35rem 0.5rem' }}
              >
                Get Free Groq Key <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Key size={14} color="var(--cyan-primary)" /> API Key (Groq `gsk_...` / Gemini `AIza...` / Grok `xai-...`)
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Optional • If empty, uses built-in local AI</span>
            </label>
            <input
              type="text"
              className="form-control font-mono"
              placeholder="Paste your API key here (e.g. gsk_... or AIza... or xai-...)"
              value={formState.grokApiKey || ''}
              onChange={(e) => setFormState({ ...formState, grokApiKey: e.target.value })}
              style={{ letterSpacing: formState.grokApiKey ? '1px' : 'normal' }}
            />
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label>AI Model Identifier</label>
              <input
                type="text"
                className="form-control font-mono"
                placeholder="llama-3.3-70b-versatile or gemini-1.5-flash"
                value={formState.grokModel || ''}
                onChange={(e) => setFormState({ ...formState, grokModel: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>API Endpoint URI</label>
              <input
                type="text"
                className="form-control font-mono"
                placeholder="https://api.groq.com/openai/v1/chat/completions"
                value={formState.grokApiEndpoint || ''}
                onChange={(e) => setFormState({ ...formState, grokApiEndpoint: e.target.value })}
              />
            </div>
          </div>

          {/* Test Grok Connection Button & Status */}
          <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.8rem', color: grokTestStatus ? (grokTestStatus.ok ? '#10b981' : '#f87171') : '#94a3b8' }}>
              {grokTestStatus ? grokTestStatus.msg : 'Ready to verify API key connectivity'}
            </div>
            <button
              type="button"
              onClick={testGrokConnection}
              disabled={testingGrok}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Zap size={14} color="var(--cyan-primary)" />
              <span>{testingGrok ? 'Verifying...' : 'Test AI Connection'}</span>
            </button>
          </div>
        </div>

        {/* Section 4: Enterprise Integration & IoT Connectors */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Database size={18} color="var(--cyan-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>ERP & IoT Gateway Connectors</h3>
          </div>

          <div className="form-group">
            <label>MQTT Telemetry Broker URI</label>
            <input
              type="text"
              className="form-control font-mono"
              value={formState.mqttBroker || ''}
              onChange={(e) => setFormState({ ...formState, mqttBroker: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10, 18, 35, 0.7)', padding: '0.85rem 1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>ERP Bi-Directional Connector (SAP & Oracle)</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Real-time inventory synchronization for PERFECT WAREHOUSE™</div>
            </div>
            <span className="badge badge-emerald">Connected</span>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={resetDemoData}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RefreshCw size={14} />
            <span>Reset Database to Factory Defaults</span>
          </button>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Save size={18} />
            <span>Save System Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
};
