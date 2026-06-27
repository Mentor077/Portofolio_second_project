import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Mail, Check, ExternalLink, ShieldCheck, Camera, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setIsConfigModalOpen, setIsPhotoModalOpen } = useConfig();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Left info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold font-mono">
                MM
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">{config.author}</h3>
                <p className="text-xs text-cyan-400 font-mono">Data Analyst &amp; BI Developer 🚀</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {config.description}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono rounded-lg border border-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copied ? "Copié !" : config.email}</span>
              </button>
              <a
                href={`mailto:${config.email}`}
                className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-lg border border-cyan-500/20 transition-colors flex items-center gap-1"
              >
                Envoyer un email <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Middle Nav */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {config.nav_links.map(link => (
                <li key={link.title}>
                  <a href={link.url} className="hover:text-cyan-400 transition-colors block">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Config Confirmation box */}
          <div className="md:col-span-4 space-y-3 bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Confirmation du Paramétrage
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded-full font-mono border border-emerald-500/20">
                  Actif
                </span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">URL :</span>
                  <a href={config.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline truncate max-w-[180px]">
                    {config.url}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thème :</span>
                  <span className="text-purple-300">{config.theme}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500">Photo URL :</span>
                  <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="text-[11px] text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2 py-0.5 rounded flex items-center gap-1 border border-cyan-500/20 cursor-pointer"
                  >
                    <Camera className="w-3 h-3" /> Modifier Lien Photo
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Consulter la confirmation complète (YAML)
            </button>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} <strong className="text-slate-200">{config.author}</strong>. Déployé sur GitHub Pages via <code className="text-slate-300">{config.theme}</code>.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub (@Mentor077)
            </a>
            <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
