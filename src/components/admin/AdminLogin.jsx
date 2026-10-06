import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  Mail, 
  KeyRound, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const AdminLogin = () => {
  const { loginAdmin, setCurrentView } = useApp();
  
  const [email, setEmail] = useState('admin@atplgroup.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || password.length < 4) {
      setErrorMsg('Please enter a valid email and password (min 4 characters).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Authenticate and open internal Admin CMS
      loginAdmin({
        name: 'Amarnath P. (Admin)',
        email: email.trim(),
        role: 'Managing Director & Superadmin',
        avatar: '👨‍💼',
        permissions: ['all_access', 'projects_publish', 'crm_manage', 'catalog_edit'],
        token: `ATPL-AUTH-${Date.now()}`
      }, rememberMe, 'dashboard', false);
    }, 350);
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@atplgroup.com');
    setPassword('admin123');
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      loginAdmin({
        name: 'Amarnath P. (Admin)',
        email: 'admin@atplgroup.com',
        role: 'Managing Director & Superadmin',
        avatar: '👨‍💼',
        permissions: ['all_access', 'projects_publish', 'crm_manage', 'catalog_edit'],
        token: `ATPL-AUTH-${Date.now()}`
      }, true, 'dashboard', false);
    }, 250);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#060b14',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem 1.5rem',
      position: 'relative'
    }}>
      
      {/* Top Return to Website Link */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '2rem',
        zIndex: 10
      }}>
        <button
          onClick={() => setCurrentView('home')}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#94a3b8',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to Public Website</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#0a1324',
        border: '1px solid rgba(0, 113, 186, 0.35)',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 113, 186, 0.15)',
        zIndex: 5
      }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          
          {/* Logo Hexagon Target */}
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 8px 25px rgba(0, 113, 186, 0.4)'
          }}>
            <Lock size={26} color="#ffffff" strokeWidth={2.4} />
          </div>

          <h1 style={{
            fontSize: '1.65rem',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '0.35rem'
          }}>
            ATPL CRM Portal
          </h1>

          <p style={{
            color: '#94a3b8',
            fontSize: '0.88rem',
            lineHeight: 1.5
          }}>
            Sign in to access Perfectflow 360 CRM & Enterprise Management Suite.
          </p>
        </div>

        {/* Error Message Box */}
        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#fca5a5',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.84rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          
          {/* Email Input */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.4rem' }}>
              CRM Admin Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Mail size={17} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@atplgroup.com"
                required
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E85874';
                  e.target.style.backgroundColor = 'rgba(232, 88, 116, 0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#cbd5e1' }}>
                Password
              </label>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Default: admin123
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <KeyRound size={17} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '0.75rem 2.6rem 0.75rem 2.6rem',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E85874';
                  e.target.style.backgroundColor = 'rgba(232, 88, 116, 0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.8rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '0.2rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.82rem', color: '#94a3b8' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#E85874', cursor: 'pointer' }}
              />
              <span>Remember this session</span>
            </label>

            <span style={{ fontSize: '0.78rem', color: '#38bdf8' }}>
              256-Bit SSL Protected
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#E85874',
              backgroundImage: 'linear-gradient(135deg, #E85874 0%, #ff4b72 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.85rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem',
              boxShadow: '0 8px 25px rgba(232, 88, 116, 0.4)',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.85 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(232, 88, 116, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(232, 88, 116, 0.4)';
              }
            }}
          >
            {isLoading ? (
              <span>Connecting to Perfectflow 360 CRM...</span>
            ) : (
              <>
                <span>Sign In to Perfectflow 360 CRM</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>

          {/* Direct Launch Button */}
          <a
            href="https://perfectflow360.atplgroup.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              padding: '0.65rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#38bdf8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <Sparkles size={15} color="#00f0ff" />
            <span>Launch https://perfectflow360.atplgroup.org Directly ↗</span>
          </a>
        </form>

        {/* Security Badge */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '0.76rem',
          color: '#64748b'
        }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Archery Technocrats Private Limited • ISO 9001:2015</span>
        </div>

      </div>

    </div>
  );
};
