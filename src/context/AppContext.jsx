import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LEADS, INITIAL_PRODUCTS, INITIAL_TICKETS, INITIAL_AUDIT_LOGS, INITIAL_PROJECTS } from '../data/initialAdminData';
import { FACTORY_STATIONS } from '../data/stationsData';
import { saveLeadToDatabase } from '../services/dbService';
import { INITIAL_SEO_DATA } from '../data/initialSEOData';
import { applyPageSEO } from '../utils/seoManager';

const AppContext = createContext();

const normalizeView = (target) => {
  if (!target) return 'home';
  const clean = target.replace(/^\/+|\/+$/g, '').toLowerCase();

  if (['login', 'signin', 'auth', 'portal'].includes(clean)) return 'login';
  if (clean === 'admin' || clean.startsWith('admin') || clean === 'cms' || clean === 'control') return 'admin';
  if (['demos', 'simulator', '3d-demos', 'digital-twin', 'live-demos', 'twin-demos', '3d-simulator'].includes(clean)) return 'demos';
  if (['factory-3d', 'factory-tour', 'factory', 'twin', 'tour', '3d', 'robot-tour', 'digitaltwin'].includes(clean)) return 'demos';
  if (['software', 'wms', 'trace', 'vision', 'mdm', 'pms', 'apps', 'products', 'product'].includes(clean)) return 'software';
  if (['hardware', 'rfid', 'labeler', 'printers', 'scanners', 'devices', 'aidc'].includes(clean)) return 'hardware';
  if (['solutions', 'solution', 'industry', 'industries', 'automotive', 'pharma', 'logistics', 'fmcg', 'heavy-engg'].includes(clean)) return 'solutions';
  if (['partners', 'partner', 'alliances', 'oem', 'certifications'].includes(clean)) return 'partners';
  if (['why-atpl', 'whyatpl', 'why', 'why-us', 'differentiation'].includes(clean)) return 'why-atpl';
  if (clean === 'insights') return 'insights';
  if (clean.startsWith('insights/')) return 'insight-detail';
  if (clean === 'blog' || clean.startsWith('blog/')) return 'insights';
  if (['resources', 'resource', 'downloads', 'docs', 'whitepapers', 'datasheets'].includes(clean)) return 'demos';
  if (['services', 'service', 'amc', 'support', 'maintenance', 'sla'].includes(clean)) return 'services';
  if (['customers', 'clients', 'case-studies', 'customer'].includes(clean)) return 'customers';
  if (['about', 'about-us', 'company', 'history'].includes(clean)) return 'about';
  if (['contact', 'contact-us', 'help', 'helpdesk', 'inquiry'].includes(clean)) return 'contact';
  return 'home';
};

const parseRouteFromURL = () => {
  if (typeof window === 'undefined') return { view: 'home', slug: null };
  try {
    const rawPath = (window.location.pathname || '').replace(/^\/+|\/+$/g, '');
    const rawHash = (window.location.hash || '').replace(/^#\/?/, '').replace(/\/+$/, '');

    // Check pathname first, then hash
    const target = rawPath || rawHash;
    const parts = target.split('/').filter(Boolean);

    // Redirect legacy /blog or #blog to /insights
    if (parts[0] === 'blog') {
      const slug = parts[1] || null;
      const targetUrl = slug ? `/insights/${slug}` : '/insights';
      try {
        window.history.replaceState({ view: slug ? 'insight-detail' : 'insights', slug }, '', targetUrl);
      } catch (e) {}
      return slug ? { view: 'insight-detail', slug } : { view: 'insights', slug: null };
    }

    // Direct /insights route
    if (parts[0] === 'insights') {
      const slug = parts[1] || null;
      return slug ? { view: 'insight-detail', slug } : { view: 'insights', slug: null };
    }

    return { view: normalizeView(target), slug: null };
  } catch (e) {
    return { view: 'home', slug: null };
  }
};

export const AppProvider = ({ children }) => {
  const initialRoute = parseRouteFromURL();
  // Navigation View State initialized from URL
  const [currentView, setCurrentViewState] = useState(initialRoute.view);
  const [currentInsightSlug, setCurrentInsightSlug] = useState(initialRoute.slug);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [selectedStationId, setSelectedStationId] = useState('station-warehouse');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoModalPrefill, setDemoModalPrefill] = useState(null);

  // Co-Pilot Modal State
  const [coPilotOpen, setCoPilotOpen] = useState(false);
  const openCoPilot = () => setCoPilotOpen(true);
  const closeCoPilot = () => setCoPilotOpen(false);

  // Project Modal State
  const [adminProjectModalOpen, setAdminProjectModalOpen] = useState(false);

  // Authentication State
  const [authSession, setAuthSession] = useState(() => {
    try {
      const saved = localStorage.getItem('atpl_auth_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.name?.toLowerCase().includes('rajesh') || parsed?.email?.toLowerCase().includes('rajesh')) {
          localStorage.removeItem('atpl_auth_session');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const loginAdmin = (userSession, remember = true, targetTab = 'dashboard', openProjectModal = false) => {
    setAuthSession(userSession);
    if (remember) {
      localStorage.setItem('atpl_auth_session', JSON.stringify(userSession));
    }
    setAdminTab(targetTab);
    if (openProjectModal) {
      setAdminProjectModalOpen(true);
    }
    setCurrentView('admin');
  };

  const openAddProjectModal = () => {
    setAdminTab('projects');
    setAdminProjectModalOpen(true);
    setCurrentView('admin');
  };

  const logoutAdmin = () => {
    setAuthSession(null);
    localStorage.removeItem('atpl_auth_session');
    setCurrentView('login');
  };

  const setCurrentView = (view, updateHistory = true) => {
    if (view === 'insights') {
      setCurrentInsightSlug(null);
      setCurrentViewState('insights');
      if (updateHistory && typeof window !== 'undefined') {
        try {
          window.history.pushState({ view: 'insights' }, '', '/insights');
        } catch (e) {}
      }
      return;
    }

    if (view === 'insight-detail') {
      setCurrentViewState('insight-detail');
      return;
    }

    const safeView = normalizeView(view);
    setCurrentViewState(safeView);
    setCurrentInsightSlug(null);

    if (updateHistory && typeof window !== 'undefined') {
      try {
        const path = safeView === 'home' ? '/' : `/${safeView}`;
        window.history.pushState({ view: safeView }, '', path);
      } catch (e) {
        // Fallback for isolated webviews
      }
    }
  };

  const navigateToInsight = (slug) => {
    setCurrentInsightSlug(slug);
    setCurrentViewState('insight-detail');
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({ view: 'insight-detail', slug }, '', `/insights/${slug}`);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch (e) {}
    }
  };

  const navigateToInsights = () => {
    setCurrentView('insights');
  };

  // Listen for browser back / forward buttons and hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const parsed = parseRouteFromURL();
      setCurrentViewState(parsed.view);
      setCurrentInsightSlug(parsed.slug);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Persistent CRM Leads
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('atpl_admin_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Persistent Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('atpl_admin_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Persistent Projects & Case Studies
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('atpl_admin_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Persistent Service Tickets
  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('atpl_admin_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('atpl_audit_logs');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Factory Telemetry State
  const [stationsState, setStationsState] = useState(FACTORY_STATIONS);
  const [simulationActive, setSimulationActive] = useState(true);
  const [conveyorSpeed, setConveyorSpeed] = useState(1.0);
  const [activeFaultStation, setActiveFaultStation] = useState(null);

  // Site CMS Settings
  const [siteSettings, setSiteSettings] = useState(() => {
    let savedSettings = {};
    try {
      const saved = localStorage.getItem('atpl_site_settings');
      if (saved) {
        savedSettings = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed reading atpl_site_settings from localStorage', e);
    }

    const savedKey = localStorage.getItem('atpl_grok_api_key') || savedSettings?.grokApiKey || '';
    const savedModel = localStorage.getItem('atpl_grok_model') || savedSettings?.grokModel || 'openai/gpt-oss-120b';
    const savedEndpoint = localStorage.getItem('atpl_grok_api_endpoint') || savedSettings?.grokApiEndpoint || 'https://api.groq.com/openai/v1/chat/completions';

    return {
      companyName: 'Archery Technocrats Private Limited (ATPL Group)',
      tagline: 'Target Perfection • Industry 4.0 Digital Transformation',
      phone: '+91 63808 59963',
      email: 'info@atplgroup.com',
      salesEmail: 'sales@atplgroup.com',
      supportEmail: 'support@atplgroup.com',
      bannerActive: true,
      bannerText: '🚀 Explore our live 3D Virtual Factory Tour & Digital Twin in your browser!',
      bannerLink: 'factory-3d',
      erpSyncEnabled: true,
      mqttBroker: 'mqtt://telemetry.atplgroup.internal:1883',
      latencyMs: 14,
      ...savedSettings,
      grokApiKey: savedKey,
      grokModel: savedModel,
      grokApiEndpoint: savedEndpoint
    };
  });

  // Persistent SEO & Keywords Metadata
  const [seoData, setSeoData] = useState(() => {
    try {
      const saved = localStorage.getItem('atpl_seo_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          global: { ...INITIAL_SEO_DATA.global, ...(parsed.global || {}) },
          pages: {
            ...INITIAL_SEO_DATA.pages,
            ...(parsed.pages || {})
          }
        };
      }
      return INITIAL_SEO_DATA;
    } catch (e) {
      console.warn('Failed reading atpl_seo_data from localStorage', e);
      return INITIAL_SEO_DATA;
    }
  });

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Save Site Settings to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('atpl_site_settings', JSON.stringify(siteSettings));
      if (siteSettings?.grokApiKey) {
        localStorage.setItem('atpl_grok_api_key', siteSettings.grokApiKey);
      }
      if (siteSettings?.grokModel) {
        localStorage.setItem('atpl_grok_model', siteSettings.grokModel);
      }
      if (siteSettings?.grokApiEndpoint) {
        localStorage.setItem('atpl_grok_api_endpoint', siteSettings.grokApiEndpoint);
      }
    } catch (e) {
      console.warn('Failed saving atpl_site_settings', e);
    }
  }, [siteSettings]);

  // Save SEO Data to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('atpl_seo_data', JSON.stringify(seoData));
    } catch (e) {
      console.warn('Failed saving atpl_seo_data', e);
    }
  }, [seoData]);

  // Dynamic Head SEO Tag Injection
  useEffect(() => {
    applyPageSEO(currentView, seoData);
  }, [currentView, seoData]);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('atpl_admin_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('atpl_admin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('atpl_admin_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('atpl_admin_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('atpl_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Telemetry real-time micro-fluctuations
  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      setStationsState(prev => prev.map(st => {
        const tempBase = 21 + Math.sin(Date.now() * 0.001 + st.id.length) * 1.5;
        const oeeBase = 98 + Math.cos(Date.now() * 0.001) * 1.2;
        const isFaulted = activeFaultStation === st.id;

        return {
          ...st,
          stats: {
            ...st.stats,
            oee: isFaulted ? '74.2% (WARN)' : `${oeeBase.toFixed(1)}%`
          },
          telemetry: {
            ...st.telemetry,
            temperature: `${(tempBase + (isFaulted ? 12 : 0)).toFixed(1)}°C`,
            status: isFaulted ? 'DEGRADED / FAULT' : 'OPERATIONAL'
          }
        };
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, [simulationActive, activeFaultStation]);

  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Lead actions
  const addLead = (leadData) => {
    const newId = `LEAD-${1000 + leads.length + 1}`;
    const newLead = {
      id: newId,
      date: new Date().toISOString(),
      status: 'New',
      priority: leadData.priority || 'Medium',
      source: leadData.source || 'Website Inquiry',
      assignedTo: 'Unassigned',
      ...leadData
    };
    setLeads(prev => [newLead, ...prev]);

    // Asynchronously synchronize lead to Neon PostgreSQL database
    saveLeadToDatabase(newLead).catch((err) => {
      console.warn('PostgreSQL lead sync deferred:', err);
    });

    // Log event
    const log = {
      id: `LOG-${Date.now()}`,
      time: 'Just now',
      user: newLead.name,
      action: `New enterprise inquiry received from ${newLead.company || 'Direct Contact'} (${newLead.solution})`,
      type: 'inquiry'
    };
    setAuditLogs(prev => [log, ...prev.slice(0, 25)]);

    addToast('Enterprise Lead Captured', `Inquiry from ${newLead.company || newLead.name} logged into Admin CRM!`, 'success');
    return newLead;
  };

  const updateLead = (id, updates) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    addToast('Lead Updated', `Lead ${id} has been modified successfully.`, 'info');
  };

  const deleteLead = (id) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    addToast('Lead Removed', `Lead ${id} was deleted from database.`, 'warning');
  };

  // Product actions
  const addProduct = (prod) => {
    const newId = `PROD-${prod.category === 'software' ? 'SW' : 'HW'}-${products.length + 1}`;
    const newProduct = {
      id: newId,
      deployments: 1,
      rating: '5.0/5',
      status: 'Active',
      ...prod
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast('Product Published', `${newProduct.name} added to enterprise catalog!`, 'success');
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast('Product Updated', `Catalog entry updated.`, 'info');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product Deleted', `Item removed from catalog.`, 'warning');
  };

  // Project / Case Study actions
  const addProject = (proj) => {
    const newId = `PROJ-${700 + projects.length + 1}`;
    const newProject = {
      id: newId,
      status: 'Published',
      featured: true,
      ...proj
    };
    setProjects(prev => [newProject, ...prev]);
    addToast('Project Published', `Case study "${newProject.title}" published live!`, 'success');
  };

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast('Project Updated', `Case study updated.`, 'info');
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addToast('Project Removed', `Case study removed.`, 'warning');
  };

  // Service ticket actions
  const addTicket = (ticket) => {
    const newId = `TICK-${800 + tickets.length + 1}`;
    const newTicket = {
      id: newId,
      created: new Date().toISOString(),
      status: 'New',
      slaTime: '4h 00m remaining',
      ...ticket
    };
    setTickets(prev => [newTicket, ...prev]);
    addToast('Service Ticket Logged', `Ticket ${newId} created for ${newTicket.client}.`, 'info');
  };

  const updateTicket = (id, updates) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    addToast('Ticket Updated', `Ticket ${id} status updated.`, 'info');
  };

  // SEO Management Handlers
  const updatePageSEO = (pageId, updatedFields) => {
    setSeoData(prev => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageId]: {
          ...prev.pages[pageId],
          ...updatedFields
        }
      }
    }));
  };

  const updateGlobalSEO = (updatedGlobalFields) => {
    setSeoData(prev => ({
      ...prev,
      global: {
        ...prev.global,
        ...updatedGlobalFields
      }
    }));
  };

  const resetPageSEO = (pageId) => {
    if (INITIAL_SEO_DATA.pages[pageId]) {
      setSeoData(prev => ({
        ...prev,
        pages: {
          ...prev.pages,
          [pageId]: { ...INITIAL_SEO_DATA.pages[pageId] }
        }
      }));
    }
  };

  const resetAllSEO = () => {
    setSeoData(INITIAL_SEO_DATA);
  };

  // Reset to initial demo data
  const resetDemoData = () => {
    setLeads(INITIAL_LEADS);
    setProducts(INITIAL_PRODUCTS);
    setProjects(INITIAL_PROJECTS);
    setTickets(INITIAL_TICKETS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSeoData(INITIAL_SEO_DATA);
    localStorage.removeItem('atpl_admin_leads');
    localStorage.removeItem('atpl_admin_products');
    localStorage.removeItem('atpl_admin_projects');
    localStorage.removeItem('atpl_admin_tickets');
    localStorage.removeItem('atpl_audit_logs');
    localStorage.removeItem('atpl_seo_data');
    addToast('Demo Data Reset', 'All records and SEO metadata restored to factory defaults.', 'info');
  };

  const triggerFault = (stationId) => {
    if (activeFaultStation === stationId) {
      setActiveFaultStation(null);
      addToast('Fault Cleared', `Station ${stationId} restored to OPERATIONAL.`, 'success');
    } else {
      setActiveFaultStation(stationId);
      addToast('Fault Injected (Simulation)', `Warning signal active on ${stationId}!`, 'warning');
    }
  };

  const openDemoModal = (prefill = null) => {
    setDemoModalPrefill(prefill);
    setDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setDemoModalOpen(false);
    setDemoModalPrefill(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        selectedStationId,
        setSelectedStationId,
        leads,
        addLead,
        updateLead,
        deleteLead,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        projects,
        addProject,
        updateProject,
        deleteProject,
        tickets,
        addTicket,
        updateTicket,
        auditLogs,
        stationsState,
        simulationActive,
        setSimulationActive,
        conveyorSpeed,
        setConveyorSpeed,
        activeFaultStation,
        triggerFault,
        siteSettings,
        setSiteSettings,
        seoData,
        updatePageSEO,
        updateGlobalSEO,
        resetPageSEO,
        resetAllSEO,
        resetDemoData,
        authSession,
        loginAdmin,
        logoutAdmin,
        toasts,
        addToast,
        removeToast,
        demoModalOpen,
        openDemoModal,
        closeDemoModal,
        demoModalPrefill,
        coPilotOpen,
        setCoPilotOpen,
        openCoPilot,
        closeCoPilot,
        adminProjectModalOpen,
        setAdminProjectModalOpen,
        openAddProjectModal,
        currentInsightSlug,
        setCurrentInsightSlug,
        navigateToInsight,
        navigateToInsights
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
