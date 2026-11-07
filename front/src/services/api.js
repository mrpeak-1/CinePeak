const API_BASE = "http://localhost:3000";

// Fallback seed data with exact user-provided URLs and dedicated horizontal banners
export const FALLBACK_MEDIA = [
  {
    id: 1,
    titulo: "F1",
    tipo: "pelicula",
    director: "Joseph Kosinski",
    anio_estreno: 2025,
    duracion_min: 155,
    genero: "Acción / Deportes",
    calificacion: 9.2,
    sinopsis: "Brad Pitt encarna a Sonny Hayes, un expiloto de Fórmula 1 retirado que regresa para apadrinar a una joven promesa en la escudería ficticia APXGP.",
    poster_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6IGdXIi1QLhYDZSWScxSzuOn4U-6h1QqMW6h2mWIZk89MpNx2llcW16-e&s=10",
    banner_url: "https://cdn-9.motorsport.com/images/amp/Yv87wB10/s6/f1-movie-scene.jpg",
    trailer_url: "https://www.youtube.com/watch?v=8qhX_hG8Q5w",
    disponible: true,
    destacado: true,
    temporadas: 1
  },
  {
    id: 2,
    titulo: "The Odyssey",
    tipo: "pelicula",
    director: "Christopher Nolan",
    anio_estreno: 2026,
    duracion_min: 172,
    genero: "Épico / Ciencia Ficción",
    calificacion: 9.7,
    sinopsis: "Monumental odisea mitológica y existencial a través de los confines cuánticos y los mares cósmicos en busca del regreso al hogar.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BNTcyNmJlZmQtNDUwYy00NDBjLTg1NGQtYTY2Y2UxMWM3NmI1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    banner_url: "https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/images/regions/ca/share.jpg",
    trailer_url: "https://www.youtube.com/watch?v=0vxOhd4qlnA",
    disponible: true,
    destacado: true,
    temporadas: 1
  },
  {
    id: 3,
    titulo: "Mr. Robot",
    tipo: "serie",
    director: "Sam Esmail",
    anio_estreno: 2015,
    duracion_min: 48,
    genero: "Thriller / Ciberpunk",
    calificacion: 9.8,
    sinopsis: "Elliot Alderson, un genio hacker con ansiedad social, es reclutado por una enigmática sociedad clandestina de hacktivistas liderada por Mr. Robot.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BOTg4NTBiZDAtZTc0YS00NzZlLTg4Y2ItNGQ3M2ZlMDM5MWQzXkEyXkFqcGc@._V1_.jpg",
    banner_url: "https://wallpapercat.com/w/full/e/7/5/177838-3840x2160-desktop-4k-mr-robot-background-image.jpg",
    trailer_url: "https://www.youtube.com/watch?v=xIBiJ_SzJTA",
    disponible: true,
    destacado: true,
    temporadas: 4
  },
  {
    id: 4,
    titulo: "The Backrooms",
    tipo: "pelicula",
    director: "Kane Parsons",
    anio_estreno: 2025,
    duracion_min: 110,
    genero: "Terror / Suspenso",
    calificacion: 8.9,
    sinopsis: "Tras un accidente de fase cuántica, una expedición queda atrapada en los laberínticos niveles de alfombra húmeda y luces fluorescentes del espacio liminal.",
    poster_url: "https://thumb.wikimedia.org/wikipedia/en/thumb/3/3d/Backrooms_%28film%29_poster.jpg/250px-Backrooms_%28film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    banner_url: "https://thumb.wikimedia.org/wikipedia/en/thumb/3/3d/Backrooms_%28film%29_poster.jpg/250px-Backrooms_%28film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    trailer_url: "https://www.youtube.com/watch?v=H4gSTnN5V4k",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 5,
    titulo: "Spider-Man: Beyond the Spider-Verse",
    tipo: "pelicula",
    director: "Joaquim Dos Santos",
    anio_estreno: 2025,
    duracion_min: 142,
    genero: "Animación / Aventura",
    calificacion: 9.6,
    sinopsis: "Miles Morales desafía las leyes inmutables del canon multiversal y viaja por universos insólitos para salvar a sus seres queridos.",
    poster_url: "https://static.wikia.nocookie.net/sonyentertainment/images/7/71/Spider-Man-_Beyond_The_Spider-Verse_Updated_Poster.jpg/revision/latest?cb=20240117233233",
    banner_url: "https://4kwallpapers.com/images/wallpapers/spider-man-brand-3440x1440-26612.jpg",
    trailer_url: "https://www.youtube.com/watch?v=cqGjhVJWtEg",
    disponible: true,
    destacado: true,
    temporadas: 1
  },
  {
    id: 6,
    titulo: "El Mentalista (The Mentalist)",
    tipo: "serie",
    director: "Bruno Heller",
    anio_estreno: 2008,
    duracion_min: 44,
    genero: "Misterio / Policial",
    calificacion: 9.1,
    sinopsis: "Patrick Jane, un perspicaz ex psíquico dotado de asombrosas dotes de observación y deducción, colabora con el CBI para resolver crímenes y dar caza a Red John.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BMTgwZWU1MWEtMzU3ZC00ZGE4LTlhZmMtMmZkNjAwNWFhMDU3XkEyXkFqcGc@._V1_.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/q3pCsNvJ7CmdJUz2sJEEUY3pOPC.jpg",
    trailer_url: "https://www.youtube.com/watch?v=H7RtbGfG81Y",
    disponible: true,
    destacado: true,
    temporadas: 7
  },
  {
    id: 7,
    titulo: "John Wick: Capítulo 4",
    tipo: "pelicula",
    director: "Chad Stahelski",
    anio_estreno: 2023,
    duracion_min: 169,
    genero: "Acción / Neo-Noir",
    calificacion: 9.3,
    sinopsis: "John Wick desata su venganza contra la Alta Mesa global en Osaka, Berlín y París con una coreografía de combate hiperestética inigualable.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2u89.jpg",
    trailer_url: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 8,
    titulo: "Scarface (El Precio del Poder)",
    tipo: "pelicula",
    director: "Brian De Palma",
    anio_estreno: 1983,
    duracion_min: 170,
    genero: "Crimen / Drama",
    calificacion: 9.4,
    sinopsis: "La ascensión meteórica y sanguinaria de Tony Montana en el imperio del narcotráfico de Miami en la década de los ochenta.",
    poster_url: "https://riotheatre.ca/wp-content/uploads/2016/06/scarface-1-3.jpg",
    banner_url: "https://riotheatre.ca/wp-content/uploads/2016/06/scarface-1-3.jpg",
    trailer_url: "https://www.youtube.com/watch?v=7pQQHnqBa2E",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 9,
    titulo: "Una Película de Minecraft (A Minecraft Movie)",
    tipo: "pelicula",
    director: "Jared Hess",
    anio_estreno: 2025,
    duracion_min: 115,
    genero: "Aventura / Fantasía",
    calificacion: 8.6,
    sinopsis: "Jack Black interpreta a Steve en un viaje visual desbordante donde cuatro forasteros deben dominar la creatividad para defender el Overworld cúbico.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BYzFjMzNjOTktNDBlNy00YWZhLWExYTctZDcxNDA4OWVhOTJjXkEyXkFqcGc@._V1_.jpg",
    banner_url: "https://m.media-amazon.com/images/M/MV5BYzFjMzNjOTktNDBlNy00YWZhLWExYTctZDcxNDA4OWVhOTJjXkEyXkFqcGc@._V1_.jpg",
    trailer_url: "https://www.youtube.com/watch?v=PE2YZhcC4NY",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 10,
    titulo: "El bueno, el feo y el malo",
    tipo: "pelicula",
    director: "Sergio Leone",
    anio_estreno: 1966,
    duracion_min: 178,
    genero: "Western",
    calificacion: 9.5,
    sinopsis: "Tres pistoleros implacables compiten y conspiran mutuamente para desenterrar una fortuna en monedas de oro ocultas en un cementerio.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BN2FmNmM5OTUtODEwMC00NDE5LWI4ZTUtZTg1ZmZlYjVjN2EyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    banner_url: "https://m.media-amazon.com/images/M/MV5BN2FmNmM5OTUtODEwMC00NDE5LWI4ZTUtZTg1ZmZlYjVjN2EyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer_url: "https://www.youtube.com/watch?v=WCN5JJY_wiA",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 11,
    titulo: "Coyote vs. Acme",
    tipo: "pelicula",
    director: "Dave Green",
    anio_estreno: 2024,
    duracion_min: 100,
    genero: "Comedia / Animación",
    calificacion: 8.8,
    sinopsis: "Wile E. Coyote lleva a juicio a la megacorporación ACME por proveerle artefactos defectuosos durante décadas de cacerías fallidas.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BMDg5NDFkNTctZWE2ZC00MDYzLThlYjItZTljZDY3NTcwNjA3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    banner_url: "https://m.media-amazon.com/images/M/MV5BMDg5NDFkNTctZWE2ZC00MDYzLThlYjItZTljZDY3NTcwNjA3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 12,
    titulo: "El corazón de la bestia (Beastly)",
    tipo: "pelicula",
    director: "Daniel Barnz",
    anio_estreno: 2011,
    duracion_min: 86,
    genero: "Romance / Fantasía",
    calificacion: 7.8,
    sinopsis: "Un arrogante estudiante de Manhattan es maldecido con una apariencia deformada hasta que logre hallar el verdadero amor desinteresado.",
    poster_url: "https://cdn.cinemark-peru.com/content/posters/HO00009387.jpg",
    banner_url: "https://cdn.cinemark-peru.com/content/posters/HO00009387.jpg",
    trailer_url: "https://www.youtube.com/watch?v=Neo6W1fVmjc",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 13,
    titulo: "El doble (The Double)",
    tipo: "pelicula",
    director: "Richard Ayoade",
    anio_estreno: 2013,
    duracion_min: 93,
    genero: "Thriller Psicológico",
    calificacion: 8.3,
    sinopsis: "Un solitario oficinista ve su monótona existencia amenazada por un nuevo compañero físicamente idéntico pero carismático y manipulador.",
    poster_url: "https://m.media-amazon.com/images/S/pv-target-images/e043b1e95e135aaf9e6d6603f44b235524313a9897894409b7a405778113c195.jpg",
    banner_url: "https://m.media-amazon.com/images/S/pv-target-images/e043b1e95e135aaf9e6d6603f44b235524313a9897894409b7a405778113c195.jpg",
    trailer_url: "https://www.youtube.com/watch?v=eE0l42nS_jY",
    disponible: true,
    destacado: false,
    temporadas: 1
  },
  {
    id: 14,
    titulo: "Elvis Presley: Documental EPIC (That's The Way It Is)",
    tipo: "documental",
    director: "Denis Sanders",
    anio_estreno: 1970,
    duracion_min: 108,
    genero: "Documental / Musical",
    calificacion: 9.5,
    sinopsis: "El rey del rock and roll en la cima de su retorno artístico en Las Vegas, combinando íntimos ensayos vocales con conciertos legendarios.",
    poster_url: "https://thumb.wikimedia.org/wikipedia/en/thumb/5/5c/EPiC_Elvis_Presley_in_Concert.jpg/250px-EPiC_Elvis_Presley_in_Concert.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
    banner_url: "https://i.ytimg.com/vi/2s_dCvUgOBI/maxresdefault.jpg",
    trailer_url: "https://www.youtube.com/watch?v=W_n_4w3Q9sE",
    disponible: true,
    destacado: true,
    temporadas: 1
  },
  {
    id: 15,
    titulo: "Severance (Separación)",
    tipo: "serie",
    director: "Dan Erickson / Ben Stiller",
    anio_estreno: 2022,
    duracion_min: 52,
    genero: "Sci-Fi / Misterio",
    calificacion: 9.5,
    sinopsis: "En Lumon Industries, un innovador procedimiento quirúrgico separa los recuerdos laborales de la vida personal de sus empleados, creando misterios corporativos oscuros.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BZDI5YzJhODQtMzQyNy00YWNmLWIxMjUtNDBjNjA5YWRjMzExXkEyXkFqcGc@._V1_.jpg",
    banner_url: "https://m.media-amazon.com/images/M/MV5BZDI5YzJhODQtMzQyNy00YWNmLWIxMjUtNDBjNjA5YWRjMzExXkEyXkFqcGc@._V1_.jpg",
    trailer_url: "https://www.youtube.com/watch?v=xEQP4VVuyrY",
    disponible: true,
    destacado: false,
    temporadas: 2
  },
  {
    id: 16,
    titulo: "Breaking Bad",
    tipo: "serie",
    director: "Vince Gilligan",
    anio_estreno: 2008,
    duracion_min: 47,
    genero: "Crimen / Drama",
    calificacion: 9.9,
    sinopsis: "Un profesor de química diagnosticado con cáncer terminal recurre a la fabricación de metanfetamina para asegurar el futuro de su familia.",
    poster_url: "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    banner_url: "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    trailer_url: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    disponible: true,
    destacado: true,
    temporadas: 5
  }
];

export async function fetchPeliculas(params = {}) {
  const query = new URLSearchParams();
  if (params.tipo && params.tipo !== "todos") query.append("tipo", params.tipo);
  if (params.genero && params.genero !== "todos") query.append("genero", params.genero);
  if (params.search) query.append("search", params.search);
  if (params.disponible !== undefined) query.append("disponible", params.disponible);
  if (params.destacado !== undefined) query.append("destacado", params.destacado);

  const queryString = query.toString();
  const url = `${API_BASE}/peliculas${queryString ? `?${queryString}` : ""}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { data, isOnline: true };
  } catch (err) {
    console.warn("Backend offline or unreachable, using local state cache:", err.message);
    let filtered = [...FALLBACK_MEDIA];
    if (params.tipo && params.tipo !== "todos") {
      filtered = filtered.filter(item => item.tipo.toLowerCase() === params.tipo.toLowerCase());
    }
    if (params.genero && params.genero !== "todos") {
      filtered = filtered.filter(item => item.genero.toLowerCase().includes(params.genero.toLowerCase()));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(item => 
        item.titulo.toLowerCase().includes(q) || 
        item.director.toLowerCase().includes(q) ||
        item.sinopsis.toLowerCase().includes(q)
      );
    }
    if (params.disponible !== undefined) {
      filtered = filtered.filter(item => Boolean(item.disponible) === Boolean(params.disponible));
    }
    return { data: filtered, isOnline: false };
  }
}

export async function createPelicula(payload) {
  try {
    const res = await fetch(`${API_BASE}/peliculas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn("Local mock create:", err.message);
    const nuevo = { ...payload, id: Date.now() };
    FALLBACK_MEDIA.unshift(nuevo);
    return nuevo;
  }
}

export async function updatePelicula(id, payload) {
  try {
    const res = await fetch(`${API_BASE}/peliculas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn("Local mock update:", err.message);
    const idx = FALLBACK_MEDIA.findIndex(m => m.id === id);
    if (idx !== -1) {
      FALLBACK_MEDIA[idx] = { ...FALLBACK_MEDIA[idx], ...payload };
      return FALLBACK_MEDIA[idx];
    }
    return { id, ...payload };
  }
}

export async function patchDisponibilidad(id, disponible) {
  try {
    const res = await fetch(`${API_BASE}/peliculas/${id}/disponible`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disponible })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Local mock patch disponible:", err.message);
    const item = FALLBACK_MEDIA.find(m => m.id === id);
    if (item) item.disponible = disponible;
    return { id, disponible };
  }
}

export async function patchDestacado(id, destacado) {
  try {
    const res = await fetch(`${API_BASE}/peliculas/${id}/destacado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destacado })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Local mock patch destacado:", err.message);
    const item = FALLBACK_MEDIA.find(m => m.id === id);
    if (item) item.destacado = destacado;
    return { id, destacado };
  }
}

export async function deletePelicula(id) {
  try {
    const res = await fetch(`${API_BASE}/peliculas/${id}`, {
      method: "DELETE"
    });
    if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (err) {
    console.warn("Local mock delete:", err.message);
    const idx = FALLBACK_MEDIA.findIndex(m => m.id === id);
    if (idx !== -1) FALLBACK_MEDIA.splice(idx, 1);
    return true;
  }
}
