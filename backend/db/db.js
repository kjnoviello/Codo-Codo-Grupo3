const mysql = require("mysql2");

//! cambiar user, password y verificar puerto segun el usuario
const connection = mysql.createConnection({
    host: "localhost",
    user: "kevin",
    password: "k01164186",
    puerto: 3000
})

// Conectamos
connection.connect((err)=>{
    err ? console.log("Error en la conexion", err) : console.log("Conectado");
    
    // Se crea la BD filippo si no existe
    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS filippo'

    connection.query(sqlCreatedb, (err, results)=>{
        err ? console.log("Error al crear la BD filippo", err) : console.log("BD FILIPPO creada o ya existente");
        
        connection.changeUser({database:"filippo"}, (err)=>{
            if (err) {
                console.log("Error al consultar la BD filippo", err);
                return;
            }

            // Se crea la tabla usuario primero
            const createTableQueryUsuarios = `
                CREATE TABLE usuarios (
                    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100),
                    email VARCHAR(100),
                    telefono VARCHAR(15)
                );
            `;

            connection.query(createTableQueryUsuarios, (err, results)=>{
                err ? console.log("Error al crear la tabla usuarios", err) : console.log("Tabla usuarios creada o ya existente");

                // Si la tabla usuarios se crea exitosamente, entonces se crea la tabla reservas ya que estan relacionadas
                const createTableQueryReservas = `
                    CREATE TABLE reservas(
                        id_reserva INT AUTO_INCREMENT PRIMARY KEY,
                        numero_personas INT,
                        fecha DATE,
                        horario TIME,
                        mensaje_reserva VARCHAR(255),
                        id_usuario INT,
                        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
                    );
                `;

                connection.query(createTableQueryReservas, (err)=>{
                    err ? console.log("Error al crear la tabla reservas") : console.log("Tabla reservas creada o ya existente");
                });
            });
        });
    });
});

module.exports = connection;