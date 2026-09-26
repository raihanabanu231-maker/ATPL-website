import React, { useState } from 'react';
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
  CheckCircle2 
} from 'lucide-react';

export const AdminSettings = () => {
  const { siteSettings, setSiteSettings, resetDemoData, addToast } = useApp();

  const [formState, setFormState] = useState(siteSettings);

  const handleSave = (e) => {
    e.preventDefault();
    setSiteSettings(formState);
    addToast('Settings Saved', 'Site configuration and ERP connector parameters updated.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.45rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          System & <span className="gradient-text">CMS Configuration</span>
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          Configure enterprise ERP endpoints, IoT MQTT broker, homepage ribbons, and official contact channels.
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
              checked={formState.bannerActive}
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
              value={formState.bannerText}
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
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>General Email</label>
              <input
                type="email"
                className="form-control"
                value={formState.email}
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
                value={formState.salesEmail}
                onChange={(e) => setFormState({ ...formState, salesEmail: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>24/7 AMC Support Email</label>
              <input
                type="email"
                className="form-control"
                value={formState.supportEmail}
                onChange={(e) => setFormState({ ...formState, supportEmail: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Enterprise Integration & IoT Connectors */}
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
              value={formState.mqttBroker}
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
