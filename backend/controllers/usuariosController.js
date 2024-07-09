const db = require("../db/db");

// Crear un nuevo usuario
const createUsuario = (req, res) => {
    const { nombre, email, telefono } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
    db.query(sql, [nombre, email, telefono], (err, results) => {
        if (err) {console.log(err);
            return;
        }
        res.json({ message: 'Usuario creado con éxito', id_usuario: results.insertId});
    });
};


// Obtener todos los usuarios
const getAllUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuarios';

    db.query(sql, (err, results) => {
        if (err) {console.log(err);
            return;
        }
        res.json(results);
    });
};


// Actualizar un usuario existente
const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    const sql = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id_usuario = ?';
    db.query(sql, [nombre, email, telefono, id], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Usuario actualizado con éxito' });
    });
};


// Obtener un usuario por su ID
const getUsuarioById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(results);
    });
};



// Eliminar un usuario
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Usuario eliminado con éxito' });
    });
};


module.exports = {
    getAllUsuarios,
    createUsuario,
    updateUsuario,
    getUsuarioById,
    deleteUsuario
};