const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use(express.static(path.join(__dirname, "../public"), { index: false }));

app.get("/app", (req, res) => {
    const indexPath = path.join(__dirname, "public", "index.html");
    res.sendFile(indexPath);
});

// Helper
function normalizarEntrada(body) {
    const titulo = body.titulo ? body.titulo.trim() : "";
    const director = (body.director || body.autor || body.creador || "").trim();
    const genero = body.genero ? body.genero.trim() : "";
    const tipo = (body.tipo || "pelicula").toLowerCase().trim();

    // año
    const anioRaw = body.anio_estreno !== undefined
        ? body.anio_estreno
        : (body.anio !== undefined ? body.anio : body.anio_publicacion);
    const anioNum = Number(anioRaw);

    // duracion
    let duracionNum = 120;
    if (body.duracion_min !== undefined) {
        duracionNum = Number(body.duracion_min);
    } else if (body.duracion !== undefined) {
        const parsed = parseInt(body.duracion, 10);
        if (!isNaN(parsed)) duracionNum = parsed;
    }

    const calificacion = body.calificacion !== undefined ? Number(body.calificacion) : 8.5;
    const sinopsis = body.sinopsis || "";
    const poster_url = body.poster_url || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop";
    const banner_url = body.banner_url || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop";
    const trailer_url = body.trailer_url || "https://www.youtube.com/watch?v=0vxOhd4qlnA";
    const disponible = body.disponible !== undefined ? Boolean(body.disponible) : true;
    const destacado = body.destacado !== undefined ? Boolean(body.destacado) : false;
    const temporadas = body.temporadas !== undefined ? Number(body.temporadas) : 1;

    return {
        titulo,
        director,
        genero,
        tipo,
        anioNum,
        duracionNum,
        calificacion,
        sinopsis,
        poster_url,
        banner_url,
        trailer_url,
        disponible,
        destacado,
        temporadas
    };
}

// RAIZ GET /
app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "✨ Bienvenido a CINEPEAK API - Plataforma de Streaming & Gestión de Películas y Series",
        version: "2.0.0",
        estilo: "Awwwards Dark Glass Edition",
        endpoints: {
            obtenerTodo: "GET /peliculas (soporta ?tipo= &genero= &search=)",
            buscarPorGenero: "GET /peliculas/buscar?genero=",
            disponibles: "GET /peliculas/disponibles",
            destacadas: "GET /peliculas/destacadas",
            porId: "GET /peliculas/:id",
            crear: "POST /peliculas",
            actualizar: "PUT /peliculas/:id",
            cambiarDisponibilidad: "PATCH /peliculas/:id/disponible",
            cambiarDestacado: "PATCH /peliculas/:id/destacado",
            eliminar: "DELETE /peliculas/:id"
        }
    });
});

// GET /peliculas (con filtros tipo, genero, search, disponible)
const obtenerPeliculas = async (req, res) => {
    try {
        const { tipo, genero, search, q, disponible, destacado } = req.query;
        let query = "SELECT * FROM peliculas WHERE 1=1";
        const params = [];

        if (tipo) {
            query += " AND tipo = ?";
            params.push(tipo.toLowerCase());
        }

        if (genero) {
            query += " AND genero LIKE ?";
            params.push(`%${genero}%`);
        }

        if (disponible !== undefined) {
            query += " AND disponible = ?";
            params.push(disponible === "true" || disponible === "1");
        }

        if (destacado !== undefined) {
            query += " AND destacado = ?";
            params.push(destacado === "true" || destacado === "1");
        }

        const searchTerm = search || q;
        if (searchTerm) {
            query += " AND (titulo LIKE ? OR director LIKE ? OR sinopsis LIKE ? OR genero LIKE ?)";
            const wildcard = `%${searchTerm}%`;
            params.push(wildcard, wildcard, wildcard, wildcard);
        }

        query += " ORDER BY id DESC";

        const [rows] = await pool.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener películas:", error.message);
        res.status(500).json({ error: "Error al obtener películas y series", detalle: error.message });
    }
};

app.get("/peliculas", obtenerPeliculas);
app.get("/series", (req, res) => {
    req.query.tipo = "serie";
    return obtenerPeliculas(req, res);
});
// compatibilidad con rutas heredadas
app.get("/libros", obtenerPeliculas);

// GET /peliculas/buscar?genero= (compatibilidad exacta con test.http original)
const buscarPeliculas = async (req, res) => {
    const { genero, tipo, search } = req.query;

    if (!genero && !tipo && !search) {
        return res.status(400).json({ error: "El parámetro de búsqueda ('genero', 'tipo' o 'search') es obligatorio" });
    }

    try {
        let query = "SELECT * FROM peliculas WHERE 1=1";
        const params = [];

        if (genero) {
            query += " AND genero LIKE ?";
            params.push(`%${genero}%`);
        }
        if (tipo) {
            query += " AND tipo = ?";
            params.push(tipo.toLowerCase());
        }
        if (search) {
            query += " AND (titulo LIKE ? OR director LIKE ?)";
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await pool.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al buscar por género:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

app.get("/peliculas/buscar", buscarPeliculas);
app.get("/libros/buscar", buscarPeliculas);

// GET /peliculas/disponibles
const obtenerDisponibles = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM peliculas WHERE disponible = true ORDER BY calificacion DESC");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener disponibles:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

app.get("/peliculas/disponibles", obtenerDisponibles);
app.get("/libros/disponibles", obtenerDisponibles);

// GET /peliculas/destacadas
app.get("/peliculas/destacadas", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM peliculas WHERE destacado = true ORDER BY calificacion DESC");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener destacadas:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
});

// GET /peliculas/:id
const obtenerPorId = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM peliculas WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Película o serie no encontrada" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener por id:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

app.get("/peliculas/:id", obtenerPorId);
app.get("/libros/:id", obtenerPorId);

// POST /peliculas
const crearPelicula = async (req, res) => {
    const {
        titulo,
        director,
        genero,
        tipo,
        anioNum,
        duracionNum,
        calificacion,
        sinopsis,
        poster_url,
        banner_url,
        trailer_url,
        disponible,
        destacado,
        temporadas
    } = normalizarEntrada(req.body);

    const anioActual = new Date().getFullYear();

    // validaciones
    if (!titulo || !director || !genero) {
        return res.status(400).json({
            error: "Los campos 'titulo', 'director' (o 'autor') y 'genero' son obligatorios"
        });
    }

    // validación de año
    if (isNaN(anioNum) || anioNum < 1888 || anioNum > anioActual + 2) {
        return res.status(400).json({
            error: `El año debe ser un número válido entre 1888 y ${anioActual + 2}`
        });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO peliculas 
            (titulo, tipo, director, anio_estreno, duracion_min, genero, calificacion, sinopsis, poster_url, banner_url, trailer_url, disponible, destacado, temporadas) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                titulo,
                tipo,
                director,
                anioNum,
                duracionNum,
                genero,
                calificacion,
                sinopsis,
                poster_url,
                banner_url,
                trailer_url,
                disponible,
                destacado,
                temporadas
            ]
        );

        const nuevaPelicula = {
            id: result.insertId,
            titulo,
            tipo,
            director,
            anio_estreno: anioNum,
            duracion_min: duracionNum,
            genero,
            calificacion,
            sinopsis,
            poster_url,
            banner_url,
            trailer_url,
            disponible,
            destacado,
            temporadas
        };

        res.status(201).json(nuevaPelicula);
    } catch (error) {
        console.error("Error al crear película:", error.message);
        res.status(500).json({ error: "Error interno en el servidor", detalle: error.message });
    }
};

app.post("/peliculas", crearPelicula);
app.post("/libros", crearPelicula);

// PUT /peliculas/:id
const actualizarPelicula = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    const {
        titulo,
        director,
        genero,
        tipo,
        anioNum,
        duracionNum,
        calificacion,
        sinopsis,
        poster_url,
        banner_url,
        trailer_url,
        disponible,
        destacado,
        temporadas
    } = normalizarEntrada(req.body);

    const anioActual = new Date().getFullYear();

    if (!titulo || !director || !genero) {
        return res.status(400).json({
            error: "Los campos 'titulo', 'director' (o 'autor') y 'genero' son obligatorios"
        });
    }

    if (isNaN(anioNum) || anioNum < 1888 || anioNum > anioActual + 2) {
        return res.status(400).json({
            error: `El año debe ser un número válido entre 1888 y ${anioActual + 2}`
        });
    }

    try {
        const [result] = await pool.query(
            `UPDATE peliculas 
            SET titulo = ?, tipo = ?, director = ?, anio_estreno = ?, duracion_min = ?, genero = ?, calificacion = ?, sinopsis = ?, poster_url = ?, banner_url = ?, trailer_url = ?, disponible = ?, destacado = ?, temporadas = ? 
            WHERE id = ?`,
            [
                titulo,
                tipo,
                director,
                anioNum,
                duracionNum,
                genero,
                calificacion,
                sinopsis,
                poster_url,
                banner_url,
                trailer_url,
                disponible,
                destacado,
                temporadas,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Película o serie no encontrada" });
        }

        const peliculaActualizada = {
            id,
            titulo,
            tipo,
            director,
            anio_estreno: anioNum,
            duracion_min: duracionNum,
            genero,
            calificacion,
            sinopsis,
            poster_url,
            banner_url,
            trailer_url,
            disponible,
            destacado,
            temporadas
        };

        res.status(200).json(peliculaActualizada);
    } catch (error) {
        console.error("Error al actualizar:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

app.put("/peliculas/:id", actualizarPelicula);
app.put("/libros/:id", actualizarPelicula);

// PATCH /peliculas/:id/disponible
const cambiarDisponibilidad = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { disponible } = req.body;

    if (typeof disponible !== "boolean") {
        return res.status(400).json({
            error: "El campo 'disponible' es obligatorio y debe ser un valor booleano (true o false)"
        });
    }

    try {
        const [result] = await pool.query(
            "UPDATE peliculas SET disponible = ? WHERE id = ?",
            [disponible, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Película o serie no encontrada" });
        }

        res.status(200).json({ id, disponible });
    } catch (error) {
        console.error("Error al actualizar disponibilidad:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

app.patch("/peliculas/:id/disponible", cambiarDisponibilidad);
app.patch("/libros/:id/disponible", cambiarDisponibilidad);

// PATCH /peliculas/:id/destacado
app.patch("/peliculas/:id/destacado", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { destacado } = req.body;

    if (typeof destacado !== "boolean") {
        return res.status(400).json({
            error: "El campo 'destacado' es obligatorio y debe ser un booleano (true o false)"
        });
    }

    try {
        const [result] = await pool.query(
            "UPDATE peliculas SET destacado = ? WHERE id = ?",
            [destacado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Película o serie no encontrada" });
        }

        res.status(200).json({ id, destacado });
    } catch (error) {
        console.error("Error al actualizar destacado:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
});

// DELETE /peliculas/:id
const eliminarPelicula = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const [result] = await pool.query("DELETE FROM peliculas WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Película o serie no encontrada" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar:", error.message);
        res.status(500).json({ error: "Error interno en el servidor" });
    }
};

app.delete("/peliculas/:id", eliminarPelicula);
app.delete("/libros/:id", eliminarPelicula);

// iniciar el servidor
app.listen(PORT, () => {
    console.log(`🎬 Servidor CINEPEAK corriendo exitosamente en http://localhost:${PORT}`);
});

module.exports = app;
