import React, { useState, useEffect } from 'react';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PhotoLinkModal } from './components/PhotoLinkModal';
import { ConfigConfirmationModal } from './components/ConfigConfirmationModal';
import { BadgeExplainerModal } from './components/BadgeExplainerModal';
import { HomeView } from './views/HomeView';
import { ProjectsView } from './views/ProjectsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { DeployGuideView } from './views/DeployGuideView';

export const PortfolioContent: React.FC = () => {
  const { isBadgeModalOpen, setIsBadgeModalOpen } = useConfig();
  const [currentView, setCurrentView] = useState<string>('/');

  useEffect(() => {
    // Check initial path or hash
    const path = window.location.pathname || '/';
    if (path.includes('projects')) setCurrentView('/projects');
    else if (path.includes('about')) setCurrentView('/about');
    else if (path.includes('contact')) setCurrentView('/contact');
    else if (path.includes('deploy')) setCurrentView('/deploy');
    else setCurrentView('/');
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState(null, '', view);
    } catch {
      // In restricted sandbox environments pushState might be blocked, ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navbar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === '/' && <HomeView onNavigate={handleNavigate} />}
        {currentView === '/projects' && <ProjectsView />}
        {currentView === '/about' && <AboutView />}
        {currentView === '/contact' && <ContactView />}
        {currentView === '/deploy' && <DeployGuideView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals answering user's requirements */}
      <PhotoLinkModal />
      <ConfigConfirmationModal />
      <BadgeExplainerModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <ConfigProvider>
      <PortfolioContent />
    </ConfigProvider>
  );
}
