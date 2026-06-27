import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Check, Copy, HelpCircle, Info, Layers, Palette, Terminal, X, Code } from 'lucide-react';

interface BadgeExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BadgeExplainerModal: React.FC<BadgeExplainerModalProps> = ({ isOpen, onClose }) => {
  const { config } = useConfig();
  const [activeTab, setActiveTab] = useState<'explainer' | 'generator' | 'deploy'>('explainer');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Badge customizer state
  const [badgeText, setBadgeText] = useState('Microsoft Fabric');
  const [badgeColor, setBadgeColor] = useState('0078D4');
  const [badgeLogo, setBadgeLogo] = useState('microsoft');
  const [badgeLink, setBadgeLink] = useState('https://Mentor077.github.io');

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const generatedBadgeUrl = `https://img.shields.io/badge/${encodeURIComponent(badgeText).replace(/-/g, '--')}-${badgeColor}?style=for-the-badge&logo=${encodeURIComponent(badgeLogo)}&logoColor=white`;
  const generatedMarkdown = `[![${badgeText}](${generatedBadgeUrl})](${badgeLink})`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Top gradient accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 flex-shrink-0" />

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between flex-shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Comprendre le code Markdown des Badges &amp; Déploiement
              </h2>
              <p className="text-xs text-slate-400">Décryptage de vos badges LinkedIn/Email &amp; guide de mise en ligne GitHub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/30 flex-shrink-0">
          <button
            onClick={() => setActiveTab('explainer')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'explainer'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>1. Explication du Code Markdown</span>
          </button>
          
          <button
            onClick={() => setActiveTab('deploy')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'deploy'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>2. Étapes de Mise en Ligne sur GitHub</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'generator'
                ? 'border-purple-400 text-purple-300 bg-purple-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-4 h-4 text-purple-400" />
            <span>3. Générateur de Badges Shields.io</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          
          {/* TAB 1: EXPLAINER */}
          {activeTab === 'explainer' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-semibold text-cyan-400 block uppercase">
                  Votre Code Analysé :
                </span>
                <div className="flex flex-wrap items-center gap-3 py-2 border-y border-slate-800/80">
                  <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                  </a>
                  <a href={`mailto:${config.email}`}>
                    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
                  </a>
                </div>
                <div className="text-xs font-mono bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 overflow-x-auto">
                  <code>{`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mentor-malonga)`}</code>
                </div>
              </div>

              {/* Anatomy breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" /> Structure et Découpage syntaxique :
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ce code utilise la syntaxe combinée du langage <strong>Markdown</strong> pour créer un <strong>bouton image cliquable</strong> :
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-mono text-cyan-300 font-bold">1. L'imbrication Markdown</div>
                    <p className="text-slate-300">
                      En Markdown, une image s'écrit <code className="text-emerald-300">![texte](url_image)</code> et un lien s'écrit <code className="text-blue-300">[texte](url_lien)</code>.
                    </p>
                    <p className="text-slate-400 pt-1">
                      En plaçant l'image à l'intérieur des crochets du lien :<br/>
                      <code className="text-purple-300 font-bold">[![alt](url_badge)](url_destination)</code><br/>
                      L'image devient un bouton cliquable !
                    </p>
                    <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-amber-300 text-[11px] mt-2">
                      💡 <em>Correction :</em> Dans votre message original il y avait des doubles parenthèses <code className="text-white">]((https...))</code>. Il ne faut mettre qu'une seule paire <code className="text-white">](https...)</code>.
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-mono text-cyan-300 font-bold">2. L'API Shields.io</div>
                    <p className="text-slate-300">
                      L'URL <code className="text-cyan-400">img.shields.io/badge/</code> génère dynamiquement l'image SVG selon les paramètres :
                    </p>
                    <ul className="space-y-1.5 text-slate-400 pt-1">
                      <li>• <strong className="text-white">LinkedIn-0077B5</strong> : Texte du badge et couleur en hexadécimal (<code className="text-blue-400">#0077B5</code> est le bleu LinkedIn).</li>
                      <li>• <strong className="text-white">style=for-the-badge</strong> : Format rectangulaire moderne et gras.</li>
                      <li>• <strong className="text-white">logo=linkedin</strong> : Icône intégrée automatiquement.</li>
                      <li>• <strong className="text-white">logoColor=white</strong> : Met l'icône en blanc pur.</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Ready to copy corrected blocks */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    ✅ Vos badges corrigés avec vos liens officiels prêts à copier :
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20">
                    Email: mentormalonga17@gmail.com
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Double parenthèse de LinkedIn corrigée et préfixe <code className="text-cyan-300">mailto:</code> + <code className="text-cyan-300">@</code> ajoutés à votre adresse email :
                </p>
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center justify-between gap-3">
                    <span className="text-cyan-200 select-all overflow-x-auto flex-1">{`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mentor-malonga)`}</span>
                    <button
                      onClick={() => handleCopy(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mentor-malonga)`, 'linkedin')}
                      className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                      {copiedCode === 'linkedin' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'linkedin' ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center justify-between gap-3">
                    <span className="text-emerald-200 select-all overflow-x-auto flex-1">{`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mentormalonga17@gmail.com)`}</span>
                    <button
                      onClick={() => handleCopy(`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mentormalonga17@gmail.com)`, 'email')}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                      {copiedCode === 'email' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'email' ? "Copié !" : "Copier"}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: GITHUB DEPLOYMENT STEPS */}
          {activeTab === 'deploy' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-200 text-xs sm:text-sm">
                <Info className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>
                  Pour rendre ce site portfolio fonctionnel sur <strong>https://Mentor077.github.io</strong>, suivez ces 4 étapes simples.
                </span>
              </div>

              <div className="space-y-4">
                
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 relative pl-12 group">
                  <div className="absolute left-4 top-5 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center">1</div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Créer le dépôt GitHub (Repository)</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Connectez-vous à votre compte GitHub (<strong className="text-cyan-300">@Mentor077</strong>). Créez un nouveau dépôt public obligatoirement nommé :<br/>
                    <code className="text-emerald-300 font-mono bg-slate-900 px-2 py-1 rounded inline-block mt-1">Mentor077.github.io</code>
                  </p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 relative pl-12 group">
                  <div className="absolute left-4 top-5 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center">2</div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Vérifier la configuration `_config.yml`</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Votre configuration contient déjà <code className="text-cyan-300">url: "https://Mentor077.github.io"</code> et <code className="text-cyan-300">baseurl: ""</code>. C'est parfait car le dépôt correspond exactement à votre nom d'utilisateur.
                  </p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 relative pl-12 group">
                  <div className="absolute left-4 top-5 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center">3</div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Compiler ou envoyer les fichiers sur GitHub</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Si vous déployez la version React moderne, exécutez la commande de construction dans votre terminal :
                  </p>
                  <div className="mt-2 bg-slate-900 p-3 rounded-lg font-mono text-xs text-cyan-200 border border-slate-800 flex justify-between items-center">
                    <span>npm run build</span>
                    <button onClick={() => handleCopy('npm run build', 'cmd')} className="text-slate-400 hover:text-white cursor-pointer">
                      {copiedCode === 'cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Ensuite, envoyez le code sur la branche <code className="text-white">main</code> avec Git (<code className="text-slate-300">git push origin main</code>).
                  </p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 relative pl-12 group">
                  <div className="absolute left-4 top-5 w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center">4</div>
                  <h4 className="text-sm sm:text-base font-bold text-white">Activer GitHub Pages dans les Paramètres</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Sur la page GitHub de votre dépôt, cliquez sur l'onglet <strong>Settings</strong> &gt; section <strong>Pages</strong> à gauche :<br/>
                    • Dans <strong>Source</strong>, sélectionnez <code className="text-emerald-300">Deploy from a branch</code>.<br/>
                    • Choisissez la branche <code className="text-cyan-300">main</code> (ou le dossier <code className="text-cyan-300">/docs</code> ou <code className="text-cyan-300">GitHub Actions</code>).<br/>
                    • Cliquez sur <strong>Save</strong>. En 2 minutes, votre site sera en ligne avec le thème <code className="text-purple-300">{config.theme}</code> !
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: SHIELDS.IO BADGE GENERATOR */}
          {activeTab === 'generator' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider block">Aperçu en Direct</span>
                  <p className="text-xs text-slate-400">Voici le rendu instantané du badge que vous créez :</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 min-w-[180px] flex justify-center">
                  <img src={generatedBadgeUrl} alt="Badge généré" />
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Texte du Badge :</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={e => setBadgeText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                    placeholder="Ex: Power BI"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Couleur Hexadécimale (sans #) :</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={badgeColor}
                      onChange={e => setBadgeColor(e.target.value.replace('#', ''))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono uppercase"
                      placeholder="Ex: F2C811"
                    />
                    <input
                      type="color"
                      value={`#${badgeColor.length === 6 ? badgeColor : '0078D4'}`}
                      onChange={e => setBadgeColor(e.target.value.replace('#', '').toUpperCase())}
                      className="w-10 h-9 rounded-lg bg-slate-950 border border-slate-700 cursor-pointer p-0.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nom du Logo (SimpleIcons) :</label>
                  <input
                    type="text"
                    value={badgeLogo}
                    onChange={e => setBadgeLogo(e.target.value.toLowerCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                    placeholder="Ex: microsoft, python, postgresql, github"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Lien de Destination (URL) :</label>
                  <input
                    type="url"
                    value={badgeLink}
                    onChange={e => setBadgeLink(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="pt-2">
                <span className="text-xs text-slate-400 block mb-2">Raccourcis pour votre stack BI :</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'Microsoft Fabric', color: '0078D4', logo: 'microsoft' },
                    { text: 'Power BI', color: 'F2C811', logo: 'powerbi' },
                    { text: 'Python', color: '3776AB', logo: 'python' },
                    { text: 'PostgreSQL', color: '4169E1', logo: 'postgresql' },
                    { text: 'ESP32 IoT', color: 'E7352C', logo: 'espressif' }
                  ].map(p => (
                    <button
                      key={p.text}
                      onClick={() => {
                        setBadgeText(p.text);
                        setBadgeColor(p.color);
                        setBadgeLogo(p.logo);
                      }}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 transition-colors cursor-pointer"
                    >
                      {p.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Markdown code */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 font-mono">Code Markdown à coller dans votre README :</span>
                  <button
                    onClick={() => handleCopy(generatedMarkdown, 'gen')}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedCode === 'gen' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'gen' ? "Copié !" : "Copier Markdown"}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-purple-200 overflow-x-auto select-all">
                  <code>{generatedMarkdown}</code>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Explication syntaxique complète &amp; badges Shields.io conformes</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Fermer le Guide
          </button>
        </div>

      </div>
    </div>
  );
};
