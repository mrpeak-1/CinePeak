import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`glass-modal p-4 rounded-2xl border flex items-center gap-3.5 shadow-2xl max-w-sm ${
        isError
          ? 'border-red-500/50 bg-red-950/40 text-red-200'
          : isInfo
          ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200'
          : 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
      }`}>
        <div className="flex-shrink-0">
          {isError ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : isInfo ? (
            <Info className="w-5 h-5 text-cyan-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold text-white tracking-wide uppercase">
            {toast.title || (isError ? 'Atención' : 'Completado')}
          </p>
          <p className="text-xs text-neutral-300 mt-0.5">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

