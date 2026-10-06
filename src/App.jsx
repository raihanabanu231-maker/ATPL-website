import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LeadModal } from './components/common/LeadModal';
import { SearchModal } from './components/common/SearchModal';
import { AtplCoPilot } from './components/common/AtplCoPilot';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { AdminLogin } from './components/admin/AdminLogin';
import { Factory3DView } from './components/factory3d/Factory3DView';
import { HomeView } from './components/pages/HomeView';
import { SoftwareView } from './components/pages/SoftwareView';
import { HardwareView } from './components/pages/HardwareView';
import { SolutionsView } from './components/pages/SolutionsView';
import { PartnersView } from './components/pages/PartnersView';
import { ResourcesView } from './components/pages/ResourcesView';
import { ServicesView } from './components/pages/ServicesView';
import { AboutView } from './components/pages/AboutView';
import { ContactView } from './components/pages/ContactView';

const MainAppContent = () => {
  const { currentView, setCurrentView, authSession } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);

  // If in CRM Login / Admin View
  if (currentView === 'login' || currentView === 'admin') {
    return (
      <ErrorBoundary>
        <AdminLogin />
        <ToastContainer />
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
      case 'home':
      default:
        return <HomeView />;
    }
  };

  // Main website view with header & footer
  return (
    <ErrorBoundary>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: currentView === 'home' ? '#ffffff' : '#060b14',
        position: 'relative'
      }}>
        
        {/* Ambient background glow effects for dark pages */}
        {currentView !== 'home' && (
          <>
            <div className="ambient-glow-1"></div>
            <div className="ambient-glow-2"></div>
          </>
        )}

        <ErrorBoundary title="Navigation Bar">
          <Navbar onOpenSearch={() => setSearchOpen(true)} />
        </ErrorBoundary>

        <main style={{ flex: 1 }}>
          <ErrorBoundary 
            key={currentView}
            title={`${currentView.toUpperCase()} View Reload Needed`}
            description="This specific view encountered a temporary rendering issue. Click below to return to Homepage or switch views."
            onReset={() => setCurrentView('home')}
            compact
          >
            {renderCurrentView()}
          </ErrorBoundary>
        </main>

        <ErrorBoundary title="Footer">
          <Footer />
        </ErrorBoundary>
        <ToastContainer />
        <ErrorBoundary title="Lead Modal">
          <LeadModal />
        </ErrorBoundary>
        <ErrorBoundary title="Search Modal">
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </ErrorBoundary>
        <ErrorBoundary title="AI CoPilot">
          <AtplCoPilot />
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

