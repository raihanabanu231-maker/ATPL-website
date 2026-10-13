import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LeadModal } from './components/common/LeadModal';
import { SearchModal } from './components/common/SearchModal';
import { AtplCoPilot } from './components/common/AtplCoPilot';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { HomeView } from './components/pages/HomeView';
import { DynamicMovingBackground } from './components/common/DynamicMovingBackground';
import { CookieConsent } from './components/common/CookieConsent';

// Code-split heavy non-home views and admin portal for sub-second LCP & TBT
const SoftwareView = lazy(() => import('./components/pages/SoftwareView').then(m => ({ default: m.SoftwareView })));
const HardwareView = lazy(() => import('./components/pages/HardwareView').then(m => ({ default: m.HardwareView })));
const SolutionsView = lazy(() => import('./components/pages/SolutionsView').then(m => ({ default: m.SolutionsView })));
const PartnersView = lazy(() => import('./components/pages/PartnersView').then(m => ({ default: m.PartnersView })));
const ResourcesView = lazy(() => import('./components/pages/ResourcesView').then(m => ({ default: m.ResourcesView })));
const ServicesView = lazy(() => import('./components/pages/ServicesView').then(m => ({ default: m.ServicesView })));
const AboutView = lazy(() => import('./components/pages/AboutView').then(m => ({ default: m.AboutView })));
const ContactView = lazy(() => import('./components/pages/ContactView').then(m => ({ default: m.ContactView })));
const PrivacyView = lazy(() => import('./components/pages/PrivacyView').then(m => ({ default: m.PrivacyView })));
const TermsView = lazy(() => import('./components/pages/TermsView').then(m => ({ default: m.TermsView })));
const Factory3DView = lazy(() => import('./components/factory3d/Factory3DView').then(m => ({ default: m.Factory3DView })));
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

  // Synchronize URL path on initial load & popstate (supporting /privacy, /terms, etc.)
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const target = path || hash;

      if (target === 'privacy') {
        setCurrentView('privacy');
      } else if (target === 'terms') {
        setCurrentView('terms');
      } else if (['factory-3d', 'factory-tour', 'factory', 'twin', 'tour', '3d', 'robot-tour', 'digitaltwin'].includes(target)) {
        setCurrentView('factory-3d');
      } else if (['software', 'hardware', 'solutions', 'partners', 'resources', 'services', 'about', 'contact'].includes(target)) {
        setCurrentView(target);
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
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
      case 'resources':
        return <ResourcesView />;
      case 'services':
        return <ServicesView />;
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
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: currentView === 'home' ? '#ffffff' : '#060b14',
        position: 'relative'
      }}>
        
        {/* Dynamic moving background with interactive sensor nodes & aurora orbs for all pages */}
        <DynamicMovingBackground currentView={currentView} />

        {/* Hide React top navbar when full-screen 3D factory tour is active (it has its own integrated header) */}
        {currentView !== 'factory-3d' && (
          <ErrorBoundary title="Navigation Bar">
            <Navbar onOpenSearch={() => setSearchOpen(true)} />
          </ErrorBoundary>
        )}

        <main id="main-content" style={{ flex: 1 }}>
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
        </main>

        {/* Hide footer on full-screen 3D factory tour */}
        {currentView !== 'factory-3d' && (
          <ErrorBoundary title="Footer">
            <Footer />
          </ErrorBoundary>
        )}
        <ToastContainer />
        <ErrorBoundary title="Lead Modal">
          <LeadModal />
        </ErrorBoundary>
        <ErrorBoundary title="Search Modal">
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </ErrorBoundary>
        {/* Hide global React chat widget on factory-3d view since it has its own integrated 3D Archie Copilot */}
        {currentView !== 'factory-3d' && (
          <ErrorBoundary title="AI CoPilot">
            <AtplCoPilot />
          </ErrorBoundary>
        )}
        <ErrorBoundary title="Cookie Consent">
          <CookieConsent />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
