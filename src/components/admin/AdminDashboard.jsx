import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  TrendingUp, 
  Package, 
  Cpu, 
  Headphones, 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Eye,
  FolderKanban,
  PlusCircle
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    leads, 
    products, 
    projects,
    tickets, 
    auditLogs, 
    stationsState, 
    setAdminTab, 
    setCurrentView,
    openAddProjectModal
  } = useApp();

  const activeLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const wonLeadsCount = leads.filter(l => l.status === 'Won').length;
  const activeTicketsCount = tickets.filter(t => t.status !== 'Resolved').length;

  // Monthly inquiry velocity data points for SVG Chart
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const dataPoints = [38, 52, 49, 74, 86, 112];
  const maxVal = 120;

  // Build SVG path
  const svgWidth = 500;
  const svgHeight = 160;
  const pointsString = dataPoints.map((val, idx) => {
    const x = (idx / (dataPoints.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - (val / maxVal) * (svgHeight - 40) - 20;
    return `${x},${y}`;
  }).join(' ');

  const areaString = `20,${svgHeight - 20} ${pointsString} ${svgWidth - 20},${svgHeight - 20}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{
        padding: '1.75rem 2rem',
        background: 'linear-gradient(135deg, rgba(14, 26, 49, 0.85) 0%, rgba(11, 33, 66, 0.7) 100%)',
        border: '1px solid rgba(0, 240, 255, 0.35)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem'
      }}>
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '0.4rem' }}>
            <Sparkles size={13} />
            <span>EXECUTIVE COMMAND SYSTEM • REAL-TIME SYNC</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', color: '#ffffff', marginBottom: '0.35rem' }}>
            Industry 4.0 Digital Transformation <span className="gradient-text">Operations Center</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
            Live overview of enterprise client inquiries, website showcase projects, IoT factory telemetry, and SLA service desks.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={openAddProjectModal}
            className="btn btn-cyan btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}
          >
            <PlusCircle size={15} />
            <span>Add New Project</span>
          </button>
          <button
            onClick={() => setAdminTab('projects')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FolderKanban size={15} color="var(--cyan-primary)" />
            <span>View Projects ({projects.length})</span>
          </button>
          <button
            onClick={() => setAdminTab('leads')}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Users size={15} />
            <span>CRM Leads</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4" style={{ gap: '1.25rem' }}>
        
        {/* Card 1: CRM Leads */}
        <div className="glass-card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Enterprise Inquiries
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0, 240, 255, 0.12)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={18} color="var(--cyan-primary)" />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {activeLeadsCount} <span style={{ fontSize: '0.85rem', color: 'var(--cyan-primary)', fontWeight: 600 }}>Leads</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.78rem', color: '#10b981' }}>
            <TrendingUp size={14} />
            <span>+24.6% this month ({newLeadsCount} new triage)</span>
          </div>
        </div>

        {/* Card 2: Pipeline Value */}
        <div className="glass-card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Estimated Pipeline
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={18} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            $2.84M
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.78rem', color: '#34d399' }}>
            <span>{wonLeadsCount} closed deals won</span>
          </div>
        </div>

        {/* Card 3: Active Deployments */}
        <div className="glass-card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Active Catalog
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.12)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Package size={18} color="#c084fc" />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {products.length} <span style={{ fontSize: '0.85rem', color: '#c084fc', fontWeight: 600 }}>Products</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>
            <span>4 Software Suites • 4 Hardware Lines</span>
          </div>
        </div>

        {/* Card 4: Support & SLA */}
        <div className="glass-card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Service Desk & AMC
            </span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Headphones size={18} color="#fbbf24" />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {activeTicketsCount} <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 600 }}>Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem', fontSize: '0.78rem', color: '#34d399' }}>
            <CheckCircle2 size={14} />
            <span>99.8% SLA adherence rate</span>
          </div>
        </div>

      </div>

      {/* Analytics Charts & Solution Breakdown Row */}
      <div className="grid-2" style={{ gap: '1.5rem' }}>
        
        {/* Chart 1: Inquiry Velocity SVG Chart */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Enterprise Inquiries Velocity (Q2-Q3 2026)</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Monthly RFPs, 3D tour requests, and WMS inquiries</p>
            </div>
            <span className="badge badge-cyan">Live Stream</span>
          </div>

          <div style={{ width: '100%', height: '160px', position: 'relative' }}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="40" x2={svgWidth - 20} y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="20" y1="80" x2={svgWidth - 20} y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="20" y1="120" x2={svgWidth - 20} y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

              {/* Gradient Area */}
              <polygon points={areaString} fill="url(#areaGradient)" />

              {/* Smooth Polyline */}
              <polyline points={pointsString} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Data Points */}
              {dataPoints.map((val, idx) => {
                const x = (idx / (dataPoints.length - 1)) * (svgWidth - 40) + 20;
                const y = svgHeight - (val / maxVal) * (svgHeight - 40) - 20;
                return (
                  <g key={idx}>
                    <circle cx={x} cy={y} r="5" fill="#060b14" stroke="#00f0ff" strokeWidth="2.5" />
                    <text x={x} y={svgHeight - 2} textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="JetBrains Mono">
                      {months[idx]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Chart 2: Solutions Demand Distribution */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Solutions Demand Breakdown</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Client interest by Industry 4.0 pillar</p>
            </div>
            <span className="badge badge-purple">High Demand</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 500 }}>PERFECT WAREHOUSE™ (WMS + RFID)</span>
                <span style={{ color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>35% (18 Leads)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '35%', height: '100%', background: 'linear-gradient(90deg, #00f0ff, #0072ff)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 500 }}>AI Computer Vision Defect Inspection</span>
                <span style={{ color: '#c084fc', fontFamily: 'var(--font-mono)' }}>27% (14 Leads)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '27%', height: '100%', background: 'linear-gradient(90deg, #a855f7, #6366f1)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 500 }}>PERFECT TRACE™ (GS1 Serialization)</span>
                <span style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>22% (11 Leads)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '22%', height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 500 }}>Robotics & Direct Part Marking (DPM)</span>
                <span style={{ color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>16% (8 Leads)</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '16%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #d97706)', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Station Telemetry Matrix & Live Audit Log */}
      <div className="grid-2" style={{ gap: '1.5rem' }}>
        
        {/* Factory IoT Stations Health Matrix */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} color="var(--cyan-primary)" />
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Smart Factory Station Health</h3>
            </div>
            <button
              onClick={() => setAdminTab('factory-control')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
            >
              Telemetry Hub ➔
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stationsState.map(st => {
              const isOperational = st.telemetry.status === 'OPERATIONAL';
              return (
                <div
                  key={st.id}
                  style={{
                    background: 'rgba(10, 18, 35, 0.7)',
                    border: `1px solid ${isOperational ? 'rgba(0, 240, 255, 0.15)' : 'rgba(239, 68, 68, 0.4)'}`,
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: isOperational ? '#10b981' : '#ef4444',
                      boxShadow: `0 0 8px ${isOperational ? '#10b981' : '#ef4444'}`
                    }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>{st.name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                        Temp: {st.telemetry.temperature} | OEE: {st.stats.oee}
                      </div>
                    </div>
                  </div>

                  <span className={`badge ${isOperational ? 'badge-emerald' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>
                    {st.telemetry.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live System Activity & Audit Stream */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} color="var(--cyan-primary)" />
              <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>Live Activity & Audit Trail</h3>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>21 CFR Part 11</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {auditLogs.slice(0, 5).map(log => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Clock size={14} color="var(--cyan-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                    <strong style={{ color: 'var(--cyan-primary)' }}>{log.user}:</strong> {log.action}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    {log.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
