import React from 'react';
import { Film, Tv, Plus, Search, Sparkles, Database, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  onOpenCreateModal,
  isOnline,
  totalCount
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO & BRAND */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => { setActiveTab('todos'); setSearchTerm(''); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-[2px] shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#09090d] rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-white via-neutral-200 to-red-500 bg-clip-text text-transparent">
                  CINEPEAK
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 tracking-wide font-medium hidden sm:block">
                Streaming Platform & CRUD
              </p>
            </div>
          </div>

          {/* MAIN NAVIGATION TABS */}
          <nav className="hidden md:flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5">
            {[
              { id: 'todos', label: 'Todo', icon: Sparkles },
              { id: 'pelicula', label: 'Películas', icon: Film },
              { id: 'serie', label: 'Series', icon: Tv },
              { id: 'documental', label: 'Documentales', icon: Sparkles }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/25'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* SEARCH & ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* SEARCH INPUT */}
          <div className="relative w-48 sm:w-64 lg:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar título, director..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/80 focus:ring-2 focus:ring-red-500/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white bg-white/10 px-1.5 py-0.5 rounded-full"
              >
                ✕
              </button>
            )}
          </div>

          {/* DATABASE STATUS PILL */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-400">
            <Database className="w-3.5 h-3.5 text-neutral-400" />
            <span>MySQL</span>
            {isOnline ? (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Local
              </span>
            )}
          </div>

          {/* FLASH ADD BUTTON (AWWWARDS HIGHLIGHT) */}
          <button
            onClick={onOpenCreateModal}
            className="flash-button flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Nuevo Título</span>
            <span className="sm:hidden">Nuevo</span>
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION TABS */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-white/5 bg-black/60">
        {[
          { id: 'todos', label: 'Todo' },
          { id: 'pelicula', label: 'Películas' },
          { id: 'serie', label: 'Series' },
          { id: 'documental', label: 'Documentales' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeTab === tab.id ? 'bg-red-600 text-white' : 'text-neutral-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}

