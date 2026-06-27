import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Camera, Link, Check, Copy, RefreshCw, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const PhotoLinkModal: React.FC = () => {
  const { config, updatePhotoUrl, isPhotoModalOpen, setIsPhotoModalOpen } = useConfig();
  const [inputUrl, setInputUrl] = useState(config.photoUrl);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isPhotoModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePhotoUrl(inputUrl);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(config.photoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickSelect = (url: string) => {
    setInputUrl(url);
    updatePhotoUrl(url);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />
        
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Lien de Photo du Profil <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full font-mono">Photo URL</span>
                </h3>
                <p className="text-xs text-slate-400">Confirmation claire & paramétrage de l'image de profil</p>
              </div>
            </div>
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current preview box */}
          <div className="my-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/10 bg-slate-900 flex items-center justify-center">
                <img
                  src={config.photoUrl}
                  alt="Aperçu Photo Profil"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-slate-950 p-1.5 rounded-lg shadow font-bold">
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Confirmation Active et Propre</span>
              </div>
              <p className="text-xs text-slate-300">
                Ce lien photo est synchronisé en direct avec l'en-tête, la section À Propos et le fichier de configuration YAML.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  {copied ? "Lien Copié !" : "Copier le Lien Photo"}
                </button>
                <a
                  href={config.photoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs rounded-lg transition-colors border border-cyan-500/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Ouvrir
                </a>
              </div>
            </div>
          </div>

          {/* URL Editor form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-cyan-400" />
                Modifier le lien URL de la photo :
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://github.com/Mentor077.png ou autre URL..."
                  className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all font-mono text-xs"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold rounded-xl text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  Appliquer
                </button>
              </div>
            </div>
          </form>

          {saveSuccess && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-pulse">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Confirmation réussie : le lien photo est proprement mis à jour !</span>
            </div>
          )}

          {/* Quick presets */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 block mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Raccourcis / Liens recommandés :
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickSelect("https://github.com/Mentor077.png")}
                className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1"
              >
                Avatar GitHub (@Mentor077)
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80")}
                className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1"
              >
                Portrait Pro Data Analyst
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80")}
                className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-700/80 transition-colors flex items-center gap-1"
              >
                Portrait Alternatif Tech
              </button>
            </div>
          </div>

        </div>
        
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800/80 flex justify-end">
          <button
            onClick={() => setIsPhotoModalOpen(false)}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Fermer & Retourner au site
          </button>
        </div>

      </div>
    </div>
  );
};
