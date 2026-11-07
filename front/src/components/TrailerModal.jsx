import React from 'react';
import { X, Star, Calendar, Clock, Sparkles } from 'lucide-react';

function getEmbedUrl(url) {
  if (!url) return null;
  // Handle youtube.com/watch?v=ID or youtu.be/ID
  const matchWatch = url.match(/[?&]v=([^&]+)/);
  if (matchWatch) return `https://www.youtube-nocookie.com/embed/${matchWatch[1]}?autoplay=1&rel=0`;
  const matchShort = url.match(/youtu\.be\/([^?&]+)/);
  if (matchShort) return `https://www.youtube-nocookie.com/embed/${matchShort[1]}?autoplay=1&rel=0`;
  if (url.includes('/embed/')) return url;
  return url;
}

export default function TrailerModal({
  isOpen,
  onClose,
  mediaItem
}) {
  if (!isOpen || !mediaItem) return null;

  const embedUrl = getEmbedUrl(mediaItem.trailer_url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      <div className="relative w-full max-w-4xl glass-modal rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        
        {/* HEADER BAR */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-red-600 text-white text-[11px] font-black uppercase tracking-wider">
              TRAILER OFICIAL
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight truncate max-w-md sm:max-w-lg">
              {mediaItem.titulo}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 VIDEO CONTAINER */}
        <div className="relative aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`Trailer de ${mediaItem.titulo}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-8 text-center">
              <Sparkles className="w-12 h-12 text-red-500 mb-3" />
              <p className="font-bold text-white">Trailer no disponible directamente</p>
              <p className="text-sm text-neutral-500 mt-1">
                Puedes editar la película para asignar una URL válida de YouTube.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER INFO */}
        <div className="p-5 bg-[#09090f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="text-red-400 font-bold">{mediaItem.genero}</span>
              <span>•</span>
              <span>Dirigido por {mediaItem.director}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{mediaItem.calificacion}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-300 line-clamp-2 max-w-xl">
              {mediaItem.sinopsis}
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap"
          >
            Cerrar Reproductor
          </button>
        </div>

      </div>

    </div>
  );
}

