import React, { useState } from 'react';
import { BarChart3, Database, Filter, RefreshCw, Layers, CheckCircle2, TrendingUp, Cpu, Activity } from 'lucide-react';

interface FilterState {
  year: '2025' | '2026';
  source: 'Tous' | 'ERP Ventes' | 'Capteurs IoT Électroniques';
  region: 'Global' | 'Europe' | 'Afrique';
}

export const InteractiveBiDemo: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    year: '2026',
    source: 'Tous',
    region: 'Global'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulated metrics based on filter state
  const baseRevenue = filters.year === '2026' ? 1485000 : 1240000;
  const regionMultiplier = filters.region === 'Global' ? 1 : filters.region === 'Europe' ? 0.65 : 0.35;
  const sourceMultiplier = filters.source === 'Tous' ? 1 : filters.source === 'ERP Ventes' ? 0.75 : 0.25;
  
  const currentRevenue = Math.round(baseRevenue * regionMultiplier * sourceMultiplier);
  const dataLatency = filters.source === 'Capteurs IoT Électroniques' ? '12 ms (Direct Lake)' : '45 ms (OneLake)';
  const activeNodes = filters.region === 'Global' ? 24 : filters.region === 'Europe' ? 16 : 8;
  const accuracy = filters.year === '2026' ? 99.8 : 99.4;

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setIsRefreshing(true);
    setFilters(prev => ({ ...prev, [key]: value }));
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const formattedRevenue = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(currentRevenue);

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur">
      {/* Top bar simulating Power BI / Microsoft Fabric Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-cyan-400 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> Microsoft Fabric Lakehouse & Power BI Direct Lake Démo
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pipeline OK
          </span>
          <button
            onClick={() => {
              setIsRefreshing(true);
              setTimeout(() => setIsRefreshing(false), 500);
            }}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            Rafraîchir
          </button>
        </div>
      </div>

      {/* Filter Slicers Bar */}
      <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" /> Slicer Année
          </label>
          <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
            {(['2025', '2026'] as const).map(y => (
              <button
                key={y}
                onClick={() => handleFilterChange('year', y)}
                className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${
                  filters.year === y ? 'bg-cyan-500 text-slate-950 shadow font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Database className="w-3 h-3 text-blue-400" /> Source de Données
          </label>
          <select
            value={filters.source}
            onChange={(e) => handleFilterChange('source', e.target.value as FilterState['source'])}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="Tous">Toutes sources fusionnées</option>
            <option value="ERP Ventes">Base SQL ERP Ventes</option>
            <option value="Capteurs IoT Électroniques">Capteurs IoT Électroniques</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-indigo-400" /> Région Direct Lake
          </label>
          <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
            {(['Global', 'Europe', 'Afrique'] as const).map(r => (
              <button
                key={r}
                onClick={() => handleFilterChange('region', r)}
                className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${
                  filters.region === r ? 'bg-blue-600 text-white shadow font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className={`p-6 transition-opacity duration-300 ${isRefreshing ? 'opacity-40' : 'opacity-100'}`}>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-3 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">
              <TrendingUp className="w-12 h-12" />
            </div>
            <span className="text-xs font-medium text-slate-400 block mb-1">Revenu Analysé (YoY)</span>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{formattedRevenue}</span>
            <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
              <span>+18.4% vs N-1</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-3 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
              <BarChart3 className="w-12 h-12" />
            </div>
            <span className="text-xs font-medium text-slate-400 block mb-1">Précision Modèle DAX</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">{accuracy}%</span>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
              <span>Zéro anomalie critique</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-3 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
              <Activity className="w-12 h-12" />
            </div>
            <span className="text-xs font-medium text-slate-400 block mb-1">Latence Direct Lake</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">{dataLatency}</span>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
              <span>Moteur VertiPaq en mémoire</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-3 text-purple-500/10 group-hover:text-purple-500/20 transition-colors">
              <Database className="w-12 h-12" />
            </div>
            <span className="text-xs font-medium text-slate-400 block mb-1">Nœuds Capteurs / Flux</span>
            <span className="text-xl sm:text-2xl font-bold text-purple-300 tracking-tight">{activeNodes} flux actifs</span>
            <div className="mt-2 text-[11px] text-purple-400 flex items-center gap-1">
              <span>Synchronisation temps réel</span>
            </div>
          </div>
        </div>

        {/* Simulated charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" /> Progression mensuelle des données traitées
              </h4>
              <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded font-mono">Modèle Étoile</span>
            </div>
            <div className="h-40 flex items-end gap-2 sm:gap-4 pt-4 border-b border-slate-800 pb-2 px-1">
              {[
                { m: 'Jan', val: 40 },
                { m: 'Fév', val: 55 },
                { m: 'Mar', val: 48 },
                { m: 'Avr', val: 72 },
                { m: 'Mai', val: 68 },
                { m: 'Juin', val: 85 },
                { m: 'Juil', val: 92 },
                { m: 'Aoû', val: 78 },
                { m: 'Sep', val: 95 },
                { m: 'Oct', val: 88 },
                { m: 'Nov', val: 98 },
                { m: 'Déc', val: 100 }
              ].map((bar, i) => {
                const effectiveH = Math.max(15, Math.round(bar.val * (filters.year === '2026' ? 1 : 0.8)));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <div
                      style={{ height: `${effectiveH}%` }}
                      className="w-full bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-300 rounded-t-sm group-hover/bar:brightness-125 transition-all duration-500 relative"
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {effectiveH * 14}k
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{bar.m}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Architecture Medallion (Bronze &gt; Silver &gt; Gold)</span>
              <span className="text-emerald-400 font-mono">Rafraîchissement automatique actif</span>
            </div>
          </div>

          <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" /> Mesure DAX Active
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Exemple de mesure calculée en direct dans le modèle Tabulaire :
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-[11px] text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                <code>
                  Ratio_Marge_DirectLake = <br/>
                  DIVIDE(<br/>
                  &nbsp;&nbsp;[Marge_Brute],<br/>
                  &nbsp;&nbsp;[Chiffre_Affaires],<br/>
                  &nbsp;&nbsp;0<br/>
                  )
                </code>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400">Compression VertiPaq :</span>
                <span className="text-cyan-400 font-bold">4.2x (Optimisé)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[88%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
