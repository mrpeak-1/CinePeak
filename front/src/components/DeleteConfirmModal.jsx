import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  mediaItem
}) {
  if (!isOpen || !mediaItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-md glass-modal rounded-3xl overflow-hidden border border-red-500/30 p-6 space-y-5 shadow-2xl">
        
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              ¿Eliminar {mediaItem.tipo === 'serie' ? 'Serie' : 'Película'}?
            </h3>
            <p className="text-xs text-neutral-400">Esta acción no se puede deshacer.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
          <img
            src={mediaItem.poster_url}
            alt={mediaItem.titulo}
            className="w-10 h-14 object-cover rounded-lg"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">{mediaItem.titulo}</p>
            <p className="text-xs text-neutral-400 truncate">{mediaItem.director} • {mediaItem.anio_estreno || mediaItem.anio}</p>
          </div>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          Se eliminará permanentemente de la base de datos MySQL y dejará de estar disponible en el streaming.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Confirmar Eliminación</span>
          </button>
        </div>

      </div>

    </div>
  );
}

