import React, { useState, useEffect } from 'react';
import { Play, Edit3, Star, Sparkles, ChevronRight, ChevronLeft, Check, X } from 'lucide-react';

export default function HeroShowcase({
  featuredList,
  onPlayTrailer,
  onEdit,
  onToggleDisponibilidad
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate featured every 8 seconds if there are items
  useEffect(() => {
    if (!featuredList || featuredList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredList]);

  if (!featuredList || featuredList.length === 0) return null;

  const current = featuredList[currentIndex] || featuredList[0];
  const photoUrl = current.banner_url || current.poster_url;

  // Window of visible preview items ensuring active item is always in view
  const visiblePreviews = featuredList.length <= 3
    ? featuredList
    : featuredList.slice(
        Math.min(Math.max(0, currentIndex - 1), featuredList.length - 3),
        Math.min(Math.max(0, currentIndex - 1), featuredList.length - 3) + 3
      );

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[660px] flex flex-col justify-end overflow-hidden border-b border-white/[0.08]">
      
      {/* ========================================================
          BACKGROUND CINEMATIC ARTWORK (FULL SCREEN, VIBRANT & CENTERED)
         ======================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        
        {/* Layer 1: Ambient color glow backdrop matching the artwork */}
        <img
          key={`ambient-${current.id}`}
          src={photoUrl}
          alt=""
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop";
          }}
          className="absolute inset-0 w-full h-full object-cover filter blur-[90px] opacity-35 scale-105 transform transition-all duration-1000 ease-out"
        />

        {/* Layer 2: Main sharp horizontal artwork - perfectly centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            key={`sharp-${current.id}`}
            src={photoUrl}
            alt={current.titulo}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop";
            }}
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-all duration-1000 ease-out animate-fadeIn"
          />
        </div>

        {/* Layer 3: Controlled Awwwards Vignette & Gradients (Subtle to highlight artwork) */}
        {/* Left directional soft fade for text legibility without encroaching center image */}
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 lg:w-[42%] bg-gradient-to-r from-[#050508]/95 via-[#050508]/60 to-transparent z-10" />
        
        {/* Bottom smooth fade right behind bottom elements */}
        <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-t from-[#050508] via-[#050508]/75 to-transparent z-10" />

        {/* Top subtle navbar shadow */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#050508]/80 to-transparent z-10" />
      </div>

      {/* ========================================================
          FOREGROUND AWWWARDS EDITORIAL HERO CONTENT (FULL SCREEN EDGES)
         ======================================================== */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pb-8 sm:pb-10 lg:pb-12 flex flex-col lg:flex-row items-end justify-between gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: BADGES, TITLE, METADATA, SINOPSIS & ACTIONS (PINNED LEFT) */}
        <div className="max-w-2xl space-y-3.5">
          
          {/* AWWWARDS EDITORIAL METADATA BAR */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Pill de categoría destacada */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/25 border border-red-500/40 text-red-400 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.25)]">
              <Sparkles className="w-3 h-3 text-red-400 animate-pulse" />
              <span>{current.tipo === 'serie' ? 'Serie Estelar' : current.tipo === 'documental' ? 'Docu Premium' : 'Estreno Destacado'}</span>
            </div>

            {/* Ficha técnica compacta y elegante */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-neutral-300 text-[11px] font-medium shadow-sm">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {current.calificacion || '9.5'}
              </span>
              <span className="text-white/20">•</span>
              <span>{current.anio_estreno || current.anio}</span>
              <span className="text-white/20">•</span>
              <span>
                {current.tipo === 'serie' 
                  ? `${current.temporadas || 1} Temp.` 
                  : `${current.duracion_min || 120} min`}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-cyan-400 font-mono text-[10px] font-semibold tracking-wider">4K UHD</span>
            </div>

            {/* Disponibilidad */}
            <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
              current.disponible 
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
            }`}>
              {current.disponible ? '● En Catálogo' : '○ En Pausa'}
            </div>
          </div>

          {/* MAIN EDITORIAL HEADLINE */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.04] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            {current.titulo}
          </h1>

          {/* DIRECTOR & GENRE SUBTITLE */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold text-neutral-300">
            <span className="text-red-400 uppercase tracking-wider font-bold">
              {current.genero}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-300">
              {current.tipo === 'serie' ? 'Creado por' : 'Dirigido por'}{' '}
              <span className="text-white font-medium">{current.director}</span>
            </span>
          </div>

          {/* SINOPSIS */}
          <p className="text-neutral-300/95 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-2xl font-normal drop-shadow">
            {current.sinopsis || "Una producción cinematográfica imperdible disponible en la plataforma CinePeak."}
          </p>

          {/* ACTION BUTTONS */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            
            {/* PLAY TRAILER BUTTON */}
            <button
              onClick={() => onPlayTrailer(current)}
              className="flash-button group flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-[0_0_28px_rgba(225,29,72,0.4)] hover:shadow-[0_0_36px_rgba(225,29,72,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </div>
              <span>Ver Tráiler Oficial</span>
            </button>

            {/* EDIT BUTTON */}
            <button
              onClick={() => onEdit(current)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <Edit3 className="w-4 h-4 text-neutral-300" />
              <span>Editar Ficha</span>
            </button>

            {/* QUICK DISPONIBILIDAD TOGGLE */}
            <button
              onClick={() => onToggleDisponibilidad(current)}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-xs font-semibold border backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
                current.disponible
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
              }`}
            >
              {current.disponible ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-rose-400" />}
              <span>{current.disponible ? 'Disponible' : 'En Pausa'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: AWWWARDS FEATURED RAIL */}
        <div className="hidden lg:flex flex-col gap-3 w-80 flex-shrink-0">
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                Colección Estelar
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-mono text-xs font-bold">
                {String(currentIndex + 1).padStart(2, '0')} / {String(featuredList.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-1 ml-1">
                <button
                  onClick={() => setCurrentIndex((currentIndex - 1 + featuredList.length) % featuredList.length)}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Anterior título"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentIndex((currentIndex + 1) % featuredList.length)}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Siguiente título"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {visiblePreviews.map((item) => {
              const itemRealIndex = featuredList.findIndex(f => f.id === item.id);
              const isSelected = itemRealIndex === currentIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentIndex(itemRealIndex)}
                  className={`group relative flex items-center gap-3.5 p-2.5 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-xl overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-950/40 via-red-900/20 to-black/60 border-red-500/70 shadow-[0_0_25px_rgba(239,68,68,0.25)] translate-x-1.5'
                      : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-rose-600 rounded-r shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  )}

                  <img
                    src={item.poster_url || item.banner_url}
                    alt={item.titulo}
                    className="w-12 h-16 object-cover rounded-xl flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold truncate transition-colors ${isSelected ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                      {item.titulo}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate mt-0.5">{item.genero}</p>
                    <div className="flex items-center gap-2 text-[10px] mt-1">
                      <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        {item.calificacion}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-neutral-400">{item.anio_estreno || item.anio}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-neutral-400 uppercase text-[9px]">{item.tipo}</span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'text-red-400 translate-x-0.5' : 'text-neutral-600 group-hover:text-white group-hover:translate-x-0.5'}`} />
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
