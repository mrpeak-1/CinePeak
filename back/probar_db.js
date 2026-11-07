const pool = require("./db");

async function probarConexion() {
  try {
    const conexion = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos 'cine_db' en MySQL!");
    const [rows] = await conexion.query("SELECT COUNT(*) AS total FROM peliculas");
    console.log(`total de peliculas y series cargadas: ${rows[0].total}`);
    conexion.release();
  } catch (error) {
    console.error("❌ error al conectar con la base de datos:", error.message);
  } finally {
    await pool.end();
  }
}

probarConexion();

