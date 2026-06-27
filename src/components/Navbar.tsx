import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Camera, CheckCircle2, Menu, X, Database, HelpCircle } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { config, setIsConfigModalOpen, setIsPhotoModalOpen, setIsBadgeModalOpen } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (url: string) => {
    onNavigate(url);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand / Title */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('/')}>
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <img
                  src={config.photoUrl}
                  alt={config.author}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80";
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full" title="Photo Link Connecté" />
          </div>

          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              Mentor <span className="text-cyan-400">MALONGA</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono flex items-center gap-1 truncate max-w-[160px] sm:max-w-none">
              <Database className="w-3 h-3 text-cyan-400 inline" /> Data Analyst &amp; BI Developer
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {config.nav_links.map((link) => {
            const isActive = currentView === link.url;
            return (
              <button
                key={link.title}
                onClick={() => handleNavClick(link.url)}
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.title}
              </button>
            );
          })}
        </nav>

        {/* Right Actions (Badges Explainer + Confirmation + Photo link + Social) */}
        <div className="hidden lg:flex items-center gap-2">
          
          {/* Markdown & GitHub Deploy explainer button */}
          <button
            onClick={() => setIsBadgeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold transition-all group cursor-pointer"
            title="Comprendre les Badges Markdown & Étapes de Déploiement GitHub"
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
            <span>Guide &amp; Badges</span>
          </button>

          {/* Confirmation button */}
          <button
            onClick={() => setIsConfigModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold transition-all group cursor-pointer"
            title="Aperçu & confirmation de la configuration YAML"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Config Validée</span>
          </button>

          {/* Photo Link modification button */}
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-semibold transition-all group cursor-pointer"
            title="Gérer le lien photo du profil"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>Lien Photo</span>
          </button>

          <div className="h-4 w-px bg-slate-800 mx-0.5" />

          {/* Social Icons */}
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors flex items-center justify-center"
            title="GitHub de Mentor Malonga"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-xl transition-colors flex items-center justify-center"
            title="LinkedIn de Mentor Malonga"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            onClick={() => setIsBadgeModalOpen(true)}
            className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/30"
            title="Guide & Badges Markdown"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30"
            title="Lien Photo"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsConfigModalOpen(true)}
            className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30"
            title="Configuration"
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {config.nav_links.map((link) => (
              <button
                key={link.title}
                onClick={() => handleNavClick(link.url)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium ${
                  currentView === link.url
                    ? 'bg-cyan-500/15 text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.title}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBadgeModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold"
            >
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Guide GitHub &amp; Code Badges Markdown</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsConfigModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Confirmation Claire de la Config</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsPhotoModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-semibold"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Modifier le Lien de la Photo</span>
            </button>
          </div>

          <div className="flex justify-center gap-6 pt-2 text-slate-400">
            <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-white flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-cyan-400 flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
