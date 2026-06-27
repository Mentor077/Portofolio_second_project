import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import { initialConfig } from '../data/portfolioData';

interface ConfigContextType {
  config: SiteConfig;
  updatePhotoUrl: (newUrl: string) => void;
  resetConfig: () => void;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
  isPhotoModalOpen: boolean;
  setIsPhotoModalOpen: (open: boolean) => void;
  isBadgeModalOpen: boolean;
  setIsBadgeModalOpen: (open: boolean) => void;
  yamlConfigString: string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('mentor_site_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialConfig;
      }
    }
    return initialConfig;
  });

  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mentor_site_config', JSON.stringify(config));
  }, [config]);

  const updatePhotoUrl = (newUrl: string) => {
    setConfig(prev => ({
      ...prev,
      photoUrl: newUrl
    }));
  };

  const resetConfig = () => {
    setConfig(initialConfig);
  };

  // Generate crisp YAML matching user's original request
  const yamlConfigString = `# ==============================================================================
# CONFIGURATION DU SITE - MENTOR MALONGA (ACTUALISÉE)
# ==============================================================================

# --- Informations de base ---
title: "${config.title}"
description: "${config.description}"
email: "${config.email}"
author: "${config.author}"

# --- URL & Photo du site ---
url: "${config.url}"
baseurl: "${config.baseurl}"
photo_url: "${config.photoUrl}" # Lien de photo personnalisé

# --- Thème ---
theme: "${config.theme}"

# --- Réseaux Sociaux & Liens ---
social:
  linkedin: "${config.social.linkedin}"
  github: "${config.social.github}"

# --- Menu de Navigation ---
nav_links:
${config.nav_links.map(link => `  - title: ${link.title}\n    url: ${link.url}`).join('\n')}

# ==============================================================================
# CONFIRMATION VALIDÉE EN TEMPS RÉEL ✅
# ==============================================================================`;

  return (
    <ConfigContext.Provider value={{
      config,
      updatePhotoUrl,
      resetConfig,
      isConfigModalOpen,
      setIsConfigModalOpen,
      isPhotoModalOpen,
      setIsPhotoModalOpen,
      isBadgeModalOpen,
      setIsBadgeModalOpen,
      yamlConfigString
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
