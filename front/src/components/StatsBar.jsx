import React from 'react';
import { Film, Tv, Sparkles, TrendingUp, CheckCircle, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function StatsBar({
  mediaList,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  onlyAvailable,
  setOnlyAvailable
}) {
  const total = mediaList.length;
  const peliculasCount = mediaList.filter(m => m.tipo === 'pelicula').length;
  const seriesCount = mediaList.filter(m => m.tipo === 'serie').length;
  const disponiblesCount = mediaList.filter(m => m.disponible).length;

  // Extract unique genres
  const genres = [
    'todos',
    'Acción',
    'Sci-Fi',
    'Thriller',
    'Drama',
    'Animación',
    'Comedia',
    'Western',
    'Misterio',
    'Documental'
  ];

  return (
    <div id="catalogo-seccion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-2 relative z-20 space-y-6 scroll-mt-24">
      
      {/* STATS METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Total en Plataforma', value: total, icon: Film, color: 'text-red-500', border: 'border-red-500/20' },
          { label: 'Películas de Cine', value: peliculasCount, icon: Sparkles, color: 'text-amber-400', border: 'border-amber-500/20' },
          { label: 'Series Estelares', value: seriesCount, icon: Tv, color: 'text-purple-400', border: 'border-purple-500/20' },
          { label: 'Disponibles en Vivo', value: disponiblesCount, icon: CheckCircle, color: 'text-emerald-400', border: 'border-emerald-500/20' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`glass-panel p-4 rounded-2xl border ${stat.border} flex items-center justify-between shadow-xl shadow-black/40`}
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-black text-white mt-0.5 tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* FILTER & SORT CONTROLS BAR */}
      <div className="glass-panel p-4 rounded-2xl border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* GENRE CHIPS */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Géneros:
          </span>
          {genres.map(genre => {
            const isSelected = selectedGenre.toLowerCase() === genre.toLowerCase();
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 font-bold'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {genre === 'todos' ? 'Todos' : genre}
              </button>
            );
          })}
        </div>

        {/* SORT & AVAILABILITY TOGGLE */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          
          {/* ONLY AVAILABLE TOGGLE */}
          <button
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              onlyAvailable
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
            <span>Solo Disponibles</span>
          </button>

          {/* SORT SELECTOR */}
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-[#12121a]">Mayor Calificación</option>
              <option value="recientes" className="bg-[#12121a]">Más Recientes</option>
              <option value="antiguos" className="bg-[#12121a]">Clásicos (Año)</option>
              <option value="alfabetico" className="bg-[#12121a]">Título (A-Z)</option>
            </select>
          </div>

        </div>

      </div>

    </div>
  );
}

