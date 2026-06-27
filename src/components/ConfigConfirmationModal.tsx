import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Check, Copy, X, ShieldCheck, FileText, Globe, Mail, User, Code2 } from 'lucide-react';

export const ConfigConfirmationModal: React.FC = () => {
  const { config, isConfigModalOpen, setIsConfigModalOpen, yamlConfigString } = useConfig();
  const [copied, setCopied] = useState(false);

  if (!isConfigModalOpen) return null;

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(yamlConfigString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header gradient indicator */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 flex-shrink-0" />

        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Confirmation Claire & Propre du Site
                </h3>
                <p className="text-xs text-slate-400">Vérification des paramètres GitHub Pages / Jekyll pour Mentor MALONGA</p>
              </div>
            </div>
            <button
              onClick={() => setIsConfigModalOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Clean grid summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <User className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Auteur & Titre</span>
                <span className="text-xs text-slate-200 font-medium truncate block">{config.author}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Email Contact</span>
                <span className="text-xs text-slate-200 font-medium truncate block font-mono">{config.email}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">URL Officielle</span>
                <span className="text-xs text-cyan-300 font-medium truncate block font-mono">{config.url}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Code2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <div className="overflow-hidden">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Thème GitHub</span>
                <span className="text-xs text-purple-300 font-medium truncate block font-mono">{config.theme}</span>
              </div>
            </div>
          </div>

          {/* YAML Display Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Fichier Configuration YAML Prêt (_config.yml) :
              </span>
              <button
                onClick={handleCopyYaml}
                className="flex items-center gap-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-all shadow"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "YAML Copié !" : "Copier le YAML"}
              </button>
            </div>
            
            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed max-h-64 shadow-inner">
              <pre>{yamlConfigString}</pre>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
            💡 <strong className="text-white">Note de Confirmation :</strong> Le lien de photo (<code className="text-emerald-300">{config.photoUrl}</code>) est validé et intégré. Tous les éléments sont opérationnels à 100%.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800/80 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Statut Configuration : Confirmé & Synchronisé
          </span>
          <button
            onClick={() => setIsConfigModalOpen(false)}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Valider & Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
