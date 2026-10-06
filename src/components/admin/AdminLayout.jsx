import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Headphones, 
  Cpu, 
  Settings, 
  ArrowLeft, 
  Search, 
  Bell, 
  PlusCircle, 
  RefreshCw, 
  Sparkles,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Menu,
  X,
  LogOut,
  FolderKanban
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdminLeadsCRM } from './AdminLeadsCRM';
import { AdminProducts } from './AdminProducts';
import { AdminProjects } from './AdminProjects';
import { AdminServiceDesk } from './AdminServiceDesk';
import { AdminFactoryControl } from './AdminFactoryControl';
import { AdminSettings } from './AdminSettings';

export const AdminLayout = () => {
  const { 
    adminTab, 
    setAdminTab, 
    setCurrentView, 
    leads, 
    tickets, 
    resetDemoData, 
    siteSettings,
    authSession,
    logoutAdmin,
    openAddProjectModal
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadLeadsCount = leads.filter(l => l.status === 'New').length;
  const criticalTicketsCount = tickets.filter(t => t.priority === 'Critical' && t.status !== 'Resolved').length;

  const sidebarLinks = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Inquiries & Leads CRM', icon: Users, badge: unreadLeadsCount ? `${unreadLeadsCount} New` : null, badgeColor: 'badge-cyan' },
    { id: 'projects', label: 'Projects & Case Studies', icon: FolderKanban, badge: 'Client Proof', badgeColor: 'badge-purple' },
    { id: 'products', label: 'Solutions & Products', icon: Package },
    { id: 'tickets', label: 'Service Desk & AMC', icon: Headphones, badge: criticalTicketsCount ? 'Alert' : null, badgeColor: 'badge-danger' },
    { id: 'factory-control', label: 'Factory IoT & Telemetry', icon: Cpu, badge: 'Live', badgeColor: 'badge-emerald' },
    { id: 'settings', label: 'System & CMS Settings', icon: Settings }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#040812', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Admin Navigation Bar */}
      <header style={{
        height: '68px',
        background: 'rgba(9, 16, 30, 0.95)',
        borderBottom: '1px solid var(--border-glass-strong)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        {/* Left: Brand & View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            onClick={() => setCurrentView('home')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem' }}
            title="Return to Public Website"
          >
            <ArrowLeft size={16} />
            <span>Public Site</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #0072ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)'
            }}>
              <LayoutDashboard size={18} color="#040914" />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: '#ffffff', lineHeight: 1.2 }}>
                ATPL CONTROL CENTER
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cyan-primary)', letterSpacing: '0.06em' }}>
                INDUSTRY 4.0 MASTER SUITE
              </div>
            </div>
          </div>
        </div>

        {/* Center: Live Pulse */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="admin-header-center">
          <style>{`
            @media (min-width: 1024px) {
              .admin-header-center { display: flex !important; }
            }
          `}</style>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            padding: '0.35rem 0.85rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#34d399'
          }}>
            <span className="pulse-dot"></span>
            <span>NODES ONLINE: 5/5</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span>LATENCY: {siteSettings.latencyMs}ms</span>
          </div>
        </div>

        {/* Right: Actions, Notifications & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Quick Add Project Button */}
          <button
            onClick={openAddProjectModal}
            className="btn btn-cyan btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
            title="Publish new client project to website"
          >
            <PlusCircle size={15} />
            <span>Add Project</span>
          </button>

          {/* Quick Launch 3D Factory */}
          <button
            onClick={() => setCurrentView('factory-3d')}
            className="btn btn-sm"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#c084fc',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Sparkles size={14} />
            <span style={{ display: 'none' }} className="btn-tour-text">3D Factory Twin</span>
            <style>{`
              @media (min-width: 640px) {
                .btn-tour-text { display: inline !important; }
              }
            `}</style>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={resetDemoData}
            title="Reset to Factory Sample Data"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '0.45rem 0.75rem',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem'
            }}
          >
            <RefreshCw size={14} />
            <span style={{ display: 'none' }} className="btn-reset-text">Reset Demo</span>
            <style>{`
              @media (min-width: 768px) {
                .btn-reset-text { display: inline !important; }
              }
            `}</style>
          </button>

          {/* User Profile & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0071ba 0%, #00f0ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.82rem'
            }}>
              {(authSession?.name || 'AP').split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div style={{ display: 'none' }} className="admin-user-info">
              <style>{`
                @media (min-width: 768px) {
                  .admin-user-info { display: block !important; }
                }
              `}</style>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
                {authSession?.name || 'Amarnath Paramasivam'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                {authSession?.role || 'FOUNDER & MANAGING DIRECTOR'}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logoutAdmin}
              title="Sign Out of Admin Control Center"
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem', marginLeft: '0.25rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          background: 'rgba(8, 14, 26, 0.98)',
          borderRight: '1px solid var(--border-glass)',
          padding: '1.25rem 0.85rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div>
            <div style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#64748b',
              padding: '0 0.75rem 0.75rem 0.75rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              marginBottom: '0.75rem'
            }}>
              Core Management
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {sidebarLinks.map(link => {
                const isActive = adminTab === link.id;
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => setAdminTab(link.id)}
                    style={{
                      width: '100%',
                      background: isActive 
                        ? 'linear-gradient(90deg, rgba(0, 240, 255, 0.16) 0%, rgba(0, 240, 255, 0.03) 100%)' 
                        : 'transparent',
                      color: isActive ? 'var(--cyan-primary)' : '#94a3b8',
                      borderLeft: isActive ? '3px solid var(--cyan-primary)' : '3px solid transparent',
                      borderTop: 'none',
                      borderRight: 'none',
                      borderBottom: 'none',
                      borderRadius: '0 8px 8px 0',
                      padding: '0.7rem 0.85rem',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon size={18} color={isActive ? 'var(--cyan-primary)' : '#64748b'} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className={`badge ${link.badgeColor}`} style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick System Badge */}
          <div style={{
            background: 'rgba(14, 26, 49, 0.6)',
            border: '1px solid var(--border-glass)',
            borderRadius: '10px',
            padding: '0.9rem',
            marginTop: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <ShieldCheck size={16} color="#10b981" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff' }}>System Security</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.4 }}>
              GS1 EPCIS Cloud Sync Active. Audit trails compliant with 21 CFR Part 11.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '1.75rem', overflowY: 'auto', maxHeight: 'calc(100vh - 68px)' }}>
          {adminTab === 'dashboard' && <AdminDashboard />}
          {adminTab === 'leads' && <AdminLeadsCRM />}
          {adminTab === 'projects' && <AdminProjects />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'tickets' && <AdminServiceDesk />}
          {adminTab === 'factory-control' && <AdminFactoryControl />}
          {adminTab === 'settings' && <AdminSettings />}
        </main>

      </div>
    </div>
  );
};
