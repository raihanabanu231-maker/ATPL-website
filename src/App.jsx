import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { HomeView } from './components/pages/HomeView';
import { DynamicMovingBackground } from './components/common/DynamicMovingBackground';
import { ThreeSpatialBackground } from './components/common/ThreeSpatialBackground';
import { GenjutsuCursorAura } from './components/ui/genjutsu-cursor-aura';
import { CookieConsent } from './components/common/CookieConsent';
import { GlobalScrollProgress } from './components/ui/global-scroll-progress';
import { ScrollTelemetryHUD } from './components/ui/scroll-telemetry-hud';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';
import { Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Code-split interactive modals and CoPilot to keep initial mobile bundle ultra-lean
const LeadModal = lazy(() => import('./components/common/LeadModal').then(m => ({ default: m.LeadModal })));
const SearchModal = lazy(() => import('./components/common/SearchModal').then(m => ({ default: m.SearchModal })));
const AtplCoPilot = lazy(() => import('./components/common/AtplCoPilot').then(m => ({ default: m.AtplCoPilot })));

// Code-split heavy non-home views and admin portal for sub-second LCP & TBT
const SoftwareView = lazy(() => import('./components/pages/SoftwareView').then(m => ({ default: m.SoftwareView })));
const HardwareView = lazy(() => import('./components/pages/HardwareView').then(m => ({ default: m.HardwareView })));
const SolutionsView = lazy(() => import('./components/pages/SolutionsView').then(m => ({ default: m.SolutionsView })));
const PartnersView = lazy(() => import('./components/pages/PartnersView').then(m => ({ default: m.PartnersView })));
const DigitalTwinDemosView = lazy(() => import('./components/pages/DigitalTwinDemosView').then(m => ({ default: m.DigitalTwinDemosView })));
const ServicesView = lazy(() => import('./components/pages/ServicesView').then(m => ({ default: m.ServicesView })));
const CustomersView = lazy(() => import('./components/pages/CustomersView').then(m => ({ default: m.CustomersView })));
const AboutView = lazy(() => import('./components/pages/AboutView').then(m => ({ default: m.AboutView })));
const ContactView = lazy(() => import('./components/pages/ContactView').then(m => ({ default: m.ContactView })));
const PrivacyView = lazy(() => import('./components/pages/PrivacyView').then(m => ({ default: m.PrivacyView })));
const TermsView = lazy(() => import('./components/pages/TermsView').then(m => ({ default: m.TermsView })));
const Factory3DView = lazy(() => import('./components/factory3d/Factory3DView').then(m => ({ default: m.Factory3DView })));
const InsightsListingView = lazy(() => import('./components/pages/InsightsListingView').then(m => ({ default: m.InsightsListingView })));
const InsightDetailView = lazy(() => import('./components/pages/InsightDetailView').then(m => ({ default: m.InsightDetailView })));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));

const ViewLoadingFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.25rem',
    color: '#38bdf8'
  }}>
    <div style={{
      width: '42px',
      height: '42px',
      border: '3px solid rgba(56, 189, 248, 0.2)',
      borderTopColor: '#38bdf8',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <span style={{ fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.05em', color: '#94a3b8' }}>
      Loading Enterprise Platform...
    </span>
  </div>
);

const MainAppContent = () => {
  const { currentView, setCurrentView } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);

  // Synchronize URL path on initial load & popstate (supporting /privacy, /terms, /admin, etc.)
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const target = hash || path;

      if (['admin', 'cms', 'control', 'dashboard'].includes(target) || target.startsWith('admin')) {
        setCurrentView('admin');
      } else if (['login', 'signin', 'auth', 'portal'].includes(target)) {
        setCurrentView('login');
      } else if (target === 'privacy') {
        setCurrentView('privacy');
      } else if (target === 'terms') {
        setCurrentView('terms');
      } else if (target === 'insights' || target === 'blog') {
        setCurrentView('insights');
      } else if (target.startsWith('insights/') || target.startsWith('blog/')) {
        setCurrentView('insight-detail');
      } else if (['demos', 'simulator', '3d-demos', 'digital-twin', 'live-demos'].includes(target)) {
        setCurrentView('demos');
      } else if (['factory-3d', 'factory-tour', 'factory', 'twin', 'tour', '3d', 'robot-tour', 'digitaltwin'].includes(target)) {
        setCurrentView('demos');
      } else if (['hardware-3d-deck', 'hardware-deck', '3d-hardware', 'hardware-3d', 'deck', '3d-deck', 'tarot-deck'].includes(target)) {
        setCurrentView('hardware');
        setTimeout(() => {
          const el = document.getElementById('hardware-3d-deck');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (['software', 'hardware', 'solutions', 'partners', 'resources', 'services', 'customers', 'about', 'contact', 'demos'].includes(target)) {
        if (target === 'resources') {
          setCurrentView('demos');
        } else {
          setCurrentView(target);
        }
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, [setCurrentView]);

  // Automatically scroll to top on every view switch
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // If in CRM Login View
  if (currentView === 'login') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<ViewLoadingFallback />}>
          <AdminLogin />
          <ToastContainer />
        </Suspense>
      </ErrorBoundary>
    );
  }

  // If in Admin CMS & CRM Dashboard View
  if (currentView === 'admin') {
    return (
      <ErrorBoundary>
        <Suspense fallback={<ViewLoadingFallback />}>
          <AdminLayout />
          <ToastContainer />
        </Suspense>
      </ErrorBoundary>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'insights':
        return <InsightsListingView />;
      case 'insight-detail':
        return <InsightDetailView />;
      case 'demos':
      case 'resources':
        return <DigitalTwinDemosView />;
      case 'factory-3d':
        return <Factory3DView />;
      case 'software':
        return <SoftwareView />;
      case 'hardware':
        return <HardwareView />;
      case 'solutions':
        return <SolutionsView />;
      case 'partners':
        return <PartnersView />;
      case 'services':
        return <ServicesView />;
      case 'customers':
        return <CustomersView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <PrivacyView />;
      case 'terms':
        return <TermsView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  // Main website view with header & footer
  return (
    <SmoothScrollProvider currentView={currentView}>
      <ErrorBoundary>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: currentView === 'home' ? '#ffffff' : '#060b14',
          position: 'relative',
          overflowX: 'clip',
          overflowY: 'visible',
          transform: 'none',
          filter: 'none'
        }}>

          {/* Global Hardware-Accelerated Scroll Progress Laser Line */}
          <GlobalScrollProgress />

          {/* 1. Three.js 3D Spatial Particle Constellation Layer (Deferred on Idle) */}
          <ThreeSpatialBackground currentView={currentView} />

          {/* 2. Genjutsu Holographic Interactive Cursor Aura */}
          <GenjutsuCursorAura />

          {/* Dynamic ambient moving background */}
          <DynamicMovingBackground currentView={currentView} />

          {/* Hide React top navbar when full-screen 3D factory tour is active (it has its own integrated header) */}
          {currentView !== 'factory-3d' && (
            <ErrorBoundary title="Navigation Bar">
              <Navbar onOpenSearch={() => setSearchOpen(true)} />
            </ErrorBoundary>
          )}

          <main
            id="main-content"
            style={{
              flex: 1,
              width: '100%',
              maxWidth: '100%',
              margin: 0,
              padding: 0,
              overflowX: 'clip',
              overflowY: 'visible',
              transform: 'none',
              filter: 'none'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{
                  width: '100%',
                  transform: 'none',
                  filter: 'none',
                  overflowX: 'clip',
                  overflowY: 'visible'
                }}
              >
                <ErrorBoundary
                  key={currentView}
                  title={`${currentView.toUpperCase()} View Reload Needed`}
                  description="This specific view encountered a temporary rendering issue. Click below to return to Homepage or switch views."
                  onReset={() => setCurrentView('home')}
                  compact
                >
                  <Suspense fallback={<ViewLoadingFallback />}>
                    {renderCurrentView()}
                  </Suspense>
                </ErrorBoundary>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Hide footer on full-screen 3D factory tour */}
          {currentView !== 'factory-3d' && (
            <ErrorBoundary title="Footer">
              <Footer />
            </ErrorBoundary>
          )}
          <ToastContainer />
          <ErrorBoundary title="Lead Modal">
            <Suspense fallback={null}>
              <LeadModal />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary title="Search Modal">
            <Suspense fallback={null}>
              <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            </Suspense>
          </ErrorBoundary>
          {/* Hide global React chat widget on factory-3d view since it has its own integrated 3D Archie Copilot */}
          {currentView !== 'factory-3d' && (
            <ErrorBoundary title="AI CoPilot">
              <Suspense fallback={null}>
                <AtplCoPilot />
              </Suspense>
            </ErrorBoundary>
          )}
          <ErrorBoundary title="Cookie Consent">
            <CookieConsent />
          </ErrorBoundary>

          {/* Global Floating Scroll Telemetry & 1-Click Jump to Top */}
          <ScrollTelemetryHUD />
        </div>
      </ErrorBoundary>
    </SmoothScrollProvider>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Toaster position="top-right" richColors theme="dark" closeButton />
      <MainAppContent />
    </AppProvider>
  );
}
