const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Crear conexión temporal para crear la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Kusanagi83",
  port: process.env.DB_PORT || 3306,
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error en la conexión:", err);
    return;
  }
  console.log("Conectado");

  // Crear la base de datos 'filippo' si no existe
  const sqlCreateDb = "CREATE DATABASE IF NOT EXISTS filippo";
  connection.query(sqlCreateDb, (err, results) => {
    if (err) {
      console.error("Error al crear la base de datos 'filippo':", err);
      return;
    }
    console.log("Base de datos 'filippo' creada o ya existente");

    // Cambiar a la base de datos 'filippo'
    connection.changeUser({ database: "filippo" }, (err) => {
      if (err) {
        console.error("Error al cambiar a la base de datos 'filippo':", err);
        return;
      }

      // Crear la tabla 'usuarios'
      const createTableQueryUsuarios = `
        CREATE TABLE IF NOT EXISTS usuarios (
          id_usuario INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100),
          email VARCHAR(100),
          telefono VARCHAR(15)
        );
      `;
      connection.query(createTableQueryUsuarios, (err, results) => {
        if (err) {
          console.error("Error al crear la tabla 'usuarios':", err);
          return;
        }
        console.log("Tabla 'usuarios' creada o ya existente");

        // Crear la tabla 'reservas' que está relacionada con 'usuarios'
        const createTableQueryReservas = `
          CREATE TABLE IF NOT EXISTS reservas (
            id_reserva INT AUTO_INCREMENT PRIMARY KEY,
            numero_personas INT,
            fecha DATE,
            horario TIME,
            mensaje_reserva VARCHAR(255),
            id_usuario INT,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
          );
        `;
        connection.query(createTableQueryReservas, (err) => {
          if (err) {
            console.error("Error al crear la tabla 'reservas':", err);
          } else {
            console.log("Tabla 'reservas' creada o ya existente");
          }

          // Cerrar la conexión
          connection.end((err) => {
            if (err) {
              console.error("Error al cerrar la conexión:", err);
            } else {
              console.log("Conexión cerrada");
            }
          });
        });
      });
    });
  });
});
