import React, { useState, useEffect } from 'react';
import { X, Sparkles, Film, Tv, Image, Video, Star, Clock, Calendar, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_POSTERS = [
  { label: 'Sci-Fi / Espacio', poster: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Acción / Cyberpunk', poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Misterio / Noir', poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Cine Clásico / Drama', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop' },
  { label: 'Fantasía / Épico', poster: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1000&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop' }
];

export default function MediaModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null
}) {
  const isEditing = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'pelicula',
    director: '',
    anio_estreno: new Date().getFullYear(),
    duracion_min: 120,
    genero: 'Acción',
    calificacion: 8.8,
    sinopsis: '',
    poster_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
    banner_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    trailer_url: 'https://www.youtube.com/watch?v=0vxOhd4qlnA',
    disponible: true,
    destacado: false,
    temporadas: 1
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo: initialData.titulo || '',
        tipo: initialData.tipo || 'pelicula',
        director: initialData.director || '',
        anio_estreno: initialData.anio_estreno || initialData.anio || 2024,
        duracion_min: initialData.duracion_min || 120,
        genero: initialData.genero || 'Acción',
        calificacion: initialData.calificacion || 8.8,
        sinopsis: initialData.sinopsis || '',
        poster_url: initialData.poster_url || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
        banner_url: initialData.banner_url || 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
        trailer_url: initialData.trailer_url || 'https://www.youtube.com/watch?v=0vxOhd4qlnA',
        disponible: initialData.disponible !== undefined ? Boolean(initialData.disponible) : true,
        destacado: initialData.destacado !== undefined ? Boolean(initialData.destacado) : false,
        temporadas: initialData.temporadas || 1
      });
    } else {
      setFormData({
        titulo: '',
        tipo: 'pelicula',
        director: '',
        anio_estreno: new Date().getFullYear(),
        duracion_min: 120,
        genero: 'Acción',
        calificacion: 8.8,
        sinopsis: '',
        poster_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
        banner_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
        trailer_url: 'https://www.youtube.com/watch?v=0vxOhd4qlnA',
        disponible: true,
        destacado: false,
        temporadas: 1
      });
    }
    setErrorMsg('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleApplyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      poster_url: preset.poster,
      banner_url: preset.banner
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.titulo.trim()) {
      setErrorMsg('El título es obligatorio.');
      return;
    }
    if (!formData.director.trim()) {
      setErrorMsg('El director o creador es obligatorio.');
      return;
    }
    if (!formData.genero.trim()) {
      setErrorMsg('El género es obligatorio.');
      return;
    }

    const anioNum = Number(formData.anio_estreno);
    const maxYear = new Date().getFullYear() + 2;
    if (isNaN(anioNum) || anioNum < 1888 || anioNum > maxYear) {
      setErrorMsg(`El año debe ser un número válido entre 1888 y ${maxYear}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);

      // Trigger Awwwards celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e50914', '#ffffff', '#fbbf24', '#f43f5e']
      });

      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Error al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-4xl glass-modal rounded-3xl overflow-hidden my-8 border border-white/15">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
              {formData.tipo === 'serie' ? <Tv className="w-5 h-5" /> : <Film className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {isEditing ? `Editar: ${initialData.titulo}` : 'Registrar Nuevo Título'}
              </h2>
              <p className="text-xs text-neutral-400">
                {isEditing ? 'Actualiza los metadatos cinematográficos en streaming' : 'Añade una nueva obra al catálogo de CINEPEAK'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ERROR BANNER */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-sm text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* LEFT 2 COLUMNS: FORM FIELDS */}
            <div className="md:col-span-2 space-y-4">
              
              {/* TITULO */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Título de la Obra *
                </label>
                <input
                  type="text"
                  name="titulo"
                  required
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ej. The Odyssey, Mr. Robot, Backrooms..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>

              {/* TIPO & GÉNERO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Tipo de Contenido
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="pelicula" className="bg-[#12121a]">Película</option>
                    <option value="serie" className="bg-[#12121a]">Serie de TV</option>
                    <option value="documental" className="bg-[#12121a]">Documental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Género *
                  </label>
                  <input
                    type="text"
                    name="genero"
                    required
                    value={formData.genero}
                    onChange={handleChange}
                    placeholder="Acción, Sci-Fi, Thriller..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* DIRECTOR & AÑO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    {formData.tipo === 'serie' ? 'Creador / Showrunner *' : 'Director Principal *'}
                  </label>
                  <input
                    type="text"
                    name="director"
                    required
                    value={formData.director}
                    onChange={handleChange}
                    placeholder="Ej. Christopher Nolan, Sam Esmail..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Año de Estreno *
                  </label>
                  <input
                    type="number"
                    name="anio_estreno"
                    required
                    min="1888"
                    max="2030"
                    value={formData.anio_estreno}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* DURACION / TEMPORADAS & CALIFICACION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    {formData.tipo === 'serie' ? 'Número de Temporadas' : 'Duración en Minutos'}
                  </label>
                  <input
                    type="number"
                    name={formData.tipo === 'serie' ? 'temporadas' : 'duracion_min'}
                    value={formData.tipo === 'serie' ? formData.temporadas : formData.duracion_min}
                    onChange={handleChange}
                    min="1"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Calificación (IMDb / Critics): <span className="text-amber-400 font-bold">{formData.calificacion}</span>
                  </label>
                  <input
                    type="range"
                    name="calificacion"
                    min="1"
                    max="10"
                    step="0.1"
                    value={formData.calificacion}
                    onChange={handleChange}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* SINOPSIS */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Sinopsis / Argumento
                </label>
                <textarea
                  name="sinopsis"
                  rows="3"
                  value={formData.sinopsis}
                  onChange={handleChange}
                  placeholder="Breve resumen del argumento y temática de la obra..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                ></textarea>
              </div>

              {/* POSTER & BANNER URL */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    URL Imagen Poster (Vertical)
                  </label>
                  <input
                    type="url"
                    name="poster_url"
                    value={formData.poster_url}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    URL Imagen Banner (Horizontal / Backdrop)
                  </label>
                  <input
                    type="url"
                    name="banner_url"
                    value={formData.banner_url}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    URL Video Trailer (YouTube)
                  </label>
                  <input
                    type="url"
                    name="trailer_url"
                    value={formData.trailer_url}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              {/* PRESETS BUTTONS */}
              <div>
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                  Estilos fotográficos de muestra rápidos:
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_POSTERS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-neutral-300 border border-white/10 transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TOGGLES */}
              <div className="pt-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="disponible"
                    checked={formData.disponible}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-red-600 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-white">Disponible en Catálogo</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-red-600 cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-amber-400">Destacar en Hero Banner</span>
                </label>
              </div>

            </div>

            {/* RIGHT COLUMN: LIVE CARD PREVIEW */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Vista Previa en Vivo
              </span>
              
              <div className="w-56 rounded-2xl overflow-hidden glass-card border border-white/15 shadow-2xl bg-[#09090f]">
                <div className="relative aspect-[2/3] w-full bg-black">
                  <img
                    src={formData.poster_url || "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white uppercase">
                    {formData.tipo}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 text-amber-400 text-[10px] font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{formData.calificacion}</span>
                  </div>
                </div>

                <div className="p-3">
                  <p className="font-bold text-white text-xs truncate">
                    {formData.titulo || "Título de ejemplo"}
                  </p>
                  <p className="text-[11px] text-red-400 truncate mt-0.5">
                    {formData.genero || "Género"}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    {formData.anio_estreno} • {formData.tipo === 'serie' ? `${formData.temporadas} Temp.` : `${formData.duracion_min} min`}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flash-button px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Título')}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

