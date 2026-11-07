import React from 'react';
import { Play, Edit3, Trash2, Star, Clock, Calendar, Check, X, Sparkles, Eye, Radio } from 'lucide-react';

export default function MediaCard({
  item,
  onPlayTrailer,
  onEdit,
  onDelete,
  onToggleDisponibilidad,
  onToggleDestacado
}) {
  return (
    <div className="group relative rounded-2xl overflow-hidden glass-card flex flex-col h-full bg-[#0d0d14]/90 border border-white/[0.08] hover:border-red-500/50 transition-all duration-300">
      
      {/* POSTER WRAPPER WITH ASPECT RATIO */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/60">
        
        {/* POSTER IMAGE */}
        <img
          src={item.poster_url}
          alt={item.titulo}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop";
          }}
        />

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          
          {/* TYPE BADGE */}
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
            item.tipo === 'serie'
              ? 'bg-purple-600/80 text-white border-purple-400/30'
              : item.tipo === 'documental'
              ? 'bg-cyan-600/80 text-white border-cyan-400/30'
              : 'bg-red-600/80 text-white border-red-400/30'
          }`}>
            {item.tipo}
          </span>

          {/* RATING BADGE */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-amber-400/30 text-amber-400 text-xs font-black shadow-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{Number(item.calificacion || 8.5).toFixed(1)}</span>
          </div>
        </div>

        {/* HOVER OVERLAY WITH AWWWARDS ACTIONS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          
          <div className="space-y-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            
            {/* PLAY TRAILER BUTTON */}
            <button
              onClick={() => onPlayTrailer(item)}
              className="w-full flash-button py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Ver Trailer</span>
            </button>

            {/* SECONDARY ACTION ROW */}
            <div className="grid grid-cols-3 gap-2">
              
              {/* EDIT */}
              <button
                onClick={() => onEdit(item)}
                title="Editar datos"
                className="py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1 border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-neutral-300" />
                <span>Editar</span>
              </button>

              {/* TOGGLE DISPONIBILIDAD */}
              <button
                onClick={() => onToggleDisponibilidad(item)}
                title={item.disponible ? "Desactivar de streaming" : "Activar en streaming"}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                  item.disponible
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                }`}
              >
                {item.disponible ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                <span>{item.disponible ? 'Activo' : 'Pausa'}</span>
              </button>

              {/* DELETE */}
              <button
                onClick={() => onDelete(item)}
                title="Eliminar registro"
                className="py-2 rounded-xl bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 text-xs font-semibold flex items-center justify-center border border-red-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM METADATA OVERLAY (ALWAYS VISIBLE GRADIENT) */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/70 to-transparent pointer-events-none" />
      </div>

      {/* CARD BODY CONTENT */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#0d0d14]">
        
        <div>
          {/* TITLE */}
          <h3 className="font-extrabold text-base text-white tracking-tight leading-snug group-hover:text-red-400 transition-colors line-clamp-1">
            {item.titulo}
          </h3>

          {/* GENRE & DIRECTOR */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
            <span className="text-red-400/90 font-medium truncate max-w-[120px]">{item.genero}</span>
            <span>•</span>
            <span className="truncate max-w-[110px]">{item.director}</span>
          </div>

          {/* SINOPSIS BRIEF */}
          <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
            {item.sinopsis || "Producción destacada en CINEPEAK."}
          </p>
        </div>

        {/* FOOTER ROW */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
          
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-neutral-500" />
            <span>{item.anio_estreno || item.anio}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-500" />
            <span>
              {item.tipo === 'serie'
                ? `${item.temporadas || 1} Temp.`
                : `${item.duracion_min || 120} min`}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              item.disponible ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-neutral-600'
            }`} />
            <span className={item.disponible ? 'text-emerald-400 font-medium' : 'text-neutral-500'}>
              {item.disponible ? 'Disponible' : 'Inactivo'}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

