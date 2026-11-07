import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroShowcase from './components/HeroShowcase';
import StatsBar from './components/StatsBar';
import MediaCard from './components/MediaCard';
import MediaModal from './components/MediaModal';
import TrailerModal from './components/TrailerModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import {
  fetchPeliculas,
  createPelicula,
  updatePelicula,
  patchDisponibilidad,
  patchDestacado,
  deletePelicula
} from './services/api';
import { Film, Sparkles, RefreshCw, Layers, Plus } from 'lucide-react';

export default function App() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Filters & Search
  const [activeTab, setActiveTab] = useState('todos'); // 'todos', 'pelicula', 'serie', 'documental'
  const [selectedGenre, setSelectedGenre] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'recientes', 'antiguos', 'alfabetico'

  // Modals
  const [mediaModal, setMediaModal] = useState({ isOpen: false, item: null });
  const [trailerModal, setTrailerModal] = useState({ isOpen: false, item: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null });

  // Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchPeliculas();
      setMediaList(res.data || []);
      setIsOnline(res.isOnline);
    } catch (err) {
      console.error(err);
      showToast('Error al conectar con la API', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter & Sort Logic
  const filteredAndSortedMedia = useMemo(() => {
    let result = [...mediaList];

    // Filter by Tab (Type)
    if (activeTab !== 'todos') {
      result = result.filter(item => (item.tipo || '').toLowerCase() === activeTab.toLowerCase());
    }

    // Filter by Genre
    if (selectedGenre !== 'todos') {
      result = result.filter(item =>
        (item.genero || '').toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Filter by Only Available
    if (onlyAvailable) {
      result = result.filter(item => Boolean(item.disponible));
    }

    // Filter by Search Term
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(item =>
        (item.titulo || '').toLowerCase().includes(q) ||
        (item.director || '').toLowerCase().includes(q) ||
        (item.sinopsis || '').toLowerCase().includes(q) ||
        (item.genero || '').toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return (Number(b.calificacion) || 0) - (Number(a.calificacion) || 0);
      }
      if (sortBy === 'recientes') {
        const yearA = Number(a.anio_estreno || a.anio || 0);
        const yearB = Number(b.anio_estreno || b.anio || 0);
        return yearB - yearA;
      }
      if (sortBy === 'antiguos') {
        const yearA = Number(a.anio_estreno || a.anio || 0);
        const yearB = Number(b.anio_estreno || b.anio || 0);
        return yearA - yearB;
      }
      if (sortBy === 'alfabetico') {
        return (a.titulo || '').localeCompare(b.titulo || '');
      }
      return 0;
    });

    return result;
  }, [mediaList, activeTab, selectedGenre, onlyAvailable, searchTerm, sortBy]);

  // Featured Blockbusters for the Hero Carousel
  const featuredList = useMemo(() => {
    const destacadas = mediaList.filter(m => m.destacado);
    if (destacadas.length > 0) return destacadas;
    // Fallback to top rated
    return [...mediaList].sort((a, b) => (Number(b.calificacion) || 0) - (Number(a.calificacion) || 0)).slice(0, 5);
  }, [mediaList]);

  // CRUD Actions
  const handleOpenCreateModal = () => {
    setMediaModal({ isOpen: true, item: null });
  };

  const handleOpenEditModal = (item) => {
    setMediaModal({ isOpen: true, item });
  };

  const handlePlayTrailer = (item) => {
    setTrailerModal({ isOpen: true, item });
  };

  const handleDeleteRequest = (item) => {
    setDeleteModal({ isOpen: true, item });
  };

  const handleSubmitModal = async (formData) => {
    if (mediaModal.item && mediaModal.item.id) {
      // Update
      const updated = await updatePelicula(mediaModal.item.id, formData);
      setMediaList(prev => prev.map(m => m.id === updated.id ? updated : m));
      showToast(`"${formData.titulo}" se actualizó correctamente`, 'success', 'Actualizado');
    } else {
      // Create
      const created = await createPelicula(formData);
      setMediaList(prev => [created, ...prev]);
      showToast(`"${formData.titulo}" se añadió al catálogo`, 'success', 'Nuevo Registro');
    }
  };

  const handleToggleDisponibilidad = async (item) => {
    const newStatus = !item.disponible;
    try {
      await patchDisponibilidad(item.id, newStatus);
      setMediaList(prev => prev.map(m => m.id === item.id ? { ...m, disponible: newStatus } : m));
      showToast(
        newStatus ? `"${item.titulo}" ahora está disponible en streaming.` : `"${item.titulo}" se pausó temporalmente.`,
        'info',
        newStatus ? 'Disponible' : 'Desactivado'
      );
    } catch (err) {
      showToast('Error al cambiar disponibilidad', 'error');
    }
  };

  const handleToggleDestacado = async (item) => {
    const newDestacado = !item.destacado;
    try {
      await patchDestacado(item.id, newDestacado);
      setMediaList(prev => prev.map(m => m.id === item.id ? { ...m, destacado: newDestacado } : m));
      showToast(
        newDestacado ? `"${item.titulo}" añadido a destacados.` : `"${item.titulo}" removido de destacados.`,
        'info'
      );
    } catch (err) {
      showToast('Error al cambiar estado destacado', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.item) return;
    const { id, titulo } = deleteModal.item;
    try {
      await deletePelicula(id);
      setMediaList(prev => prev.filter(m => m.id !== id));
      showToast(`"${titulo}" fue eliminado exitosamente`, 'success', 'Eliminado');
      setDeleteModal({ isOpen: false, item: null });
    } catch (err) {
      showToast('Error al eliminar', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col relative selection:bg-red-600 selection:text-white">

      {/* AMBIENT BACKGROUND GLOW HALOS */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-10 left-1/3 w-[500px] h-[500px] bg-rose-600/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* TOP NAVIGATION BAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenCreateModal={handleOpenCreateModal}
        isOnline={isOnline}
        totalCount={mediaList.length}
      />

      {/* HERO BANNER SHOWCASE */}
      <HeroShowcase
        featuredList={featuredList}
        onPlayTrailer={handlePlayTrailer}
        onEdit={handleOpenEditModal}
        onToggleDisponibilidad={handleToggleDisponibilidad}
      />

      {/* STATS & QUICK FILTERS BAR */}
      <StatsBar
        mediaList={mediaList}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onlyAvailable={onlyAvailable}
        setOnlyAvailable={setOnlyAvailable}
      />

      {/* MAIN CATALOG GRID SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-6 relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Catálogo de Peliculas</span>
                <span className="text-sm font-semibold text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                  {filteredAndSortedMedia.length}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {activeTab === 'todos'
                ? 'Explorando películas, series de televisión y documentales exclusivos'
                : activeTab === 'pelicula'
                  ? 'Grandes producciones cinematográficas y blockbusters mundiales'
                  : activeTab === 'serie'
                    ? 'Series aclamadas por la crítica y temporadas completas'
                    : 'Documentales históricos y musicales épicos'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              title="Refrescar catálogo"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-red-500' : ''}`} />
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="flash-button flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir al Catálogo</span>
            </button>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-2xl bg-white/5 border border-white/5" />
            ))}
          </div>
        )}

        {/* MEDIA GRID (4 COLUMNAS DESTACADAS) */}
        {!loading && filteredAndSortedMedia.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredAndSortedMedia.map(item => (
              <MediaCard
                key={item.id}
                item={item}
                onPlayTrailer={handlePlayTrailer}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteRequest}
                onToggleDisponibilidad={handleToggleDisponibilidad}
                onToggleDestacado={handleToggleDestacado}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredAndSortedMedia.length === 0 && (
          <div className="py-20 text-center glass-panel rounded-3xl border border-white/5 p-8 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center">
              <Film className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">No se encontraron títulos</h3>
              <p className="text-xs text-neutral-400 mt-1">
                No hay resultados para "{searchTerm || selectedGenre}". Intenta ajustar los filtros de búsqueda o registra una nueva obra.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => { setSearchTerm(''); setSelectedGenre('todos'); setActiveTab('todos'); setOnlyAvailable(false); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                Limpiar Filtros
              </button>
              <button
                onClick={handleOpenCreateModal}
                className="flash-button px-5 py-2 rounded-xl text-xs font-bold bg-red-600 text-white shadow-lg shadow-red-600/30 cursor-pointer"
              >
                Registrar Nuevo
              </button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/5 py-12 bg-black/60 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-black text-xl tracking-tighter text-white">CINEPEAK</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                AWWWARDS EDITION
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Sistema CRUD de Películas y Series de Alto Impacto Visual.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-400 font-mono">
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">React 19</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Vite 8</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Tailwind v4</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Express 4</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">MySQL cine_db</span>
          </div>

          <div className="text-xs text-neutral-400 text-center md:text-right">
            <span>© 2026 CinePeak • Diseñado con Glassmorphism & Microinteracciones</span>
          </div>
        </div>
      </footer>

      {/* MODALS & NOTIFICATIONS */}
      <MediaModal
        isOpen={mediaModal.isOpen}
        onClose={() => setMediaModal({ isOpen: false, item: null })}
        onSubmit={handleSubmitModal}
        initialData={mediaModal.item}
      />

      <TrailerModal
        isOpen={trailerModal.isOpen}
        onClose={() => setTrailerModal({ isOpen: false, item: null })}
        mediaItem={trailerModal.item}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={handleConfirmDelete}
        mediaItem={deleteModal.item}
      />

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
