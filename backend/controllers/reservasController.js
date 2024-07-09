const db = require("../db/db");

// Crear una nueva reserva
const createReserva = (req, res) => {
    const { numero_personas, fecha, horario, mensaje_reserva, id_usuario } = req.body;
    const sql = 'INSERT INTO reservas (numero_personas, fecha, horario, mensaje_reserva, id_usuario) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [numero_personas, fecha, horario, mensaje_reserva, id_usuario], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Reserva creada con éxito', id_reserva: results.insertId });
    });
};


// Obtener todas las reservas con los datos del usuario, ordenadas por fecha y horario
const getAllReservas = (req, res) => {
    const sql = `
        SELECT reservas.*, usuarios.nombre, usuarios.email, usuarios.telefono
        FROM reservas
        JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
        ORDER BY reservas.fecha ASC, reservas.horario ASC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(results);
    });
};


// Obtener una reserva por ID con datos completos

const getReservaById = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT reservas.*, usuarios.nombre, usuarios.email, usuarios.telefono
        FROM reservas
        JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
        WHERE reservas.id_reserva = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(results); 
    });
};


// Actualizar una reserva existente
const updateReserva = (req, res) => {
    const { id } = req.params;
    const { numero_personas, fecha, horario, mensaje_reserva, id_usuario } = req.body;
    const sql = 'UPDATE reservas SET numero_personas = ?, fecha = ?, horario = ?, mensaje_reserva = ?, id_usuario = ? WHERE id_reserva = ?';
    db.query(sql, [numero_personas, fecha, horario, mensaje_reserva, id_usuario, id], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Reserva actualizada con éxito' });
    });
};



// Obtener reservas por fecha específica ordenadas por horario
const getReservasByFecha = (req, res) => {
    const { fecha } = req.params;
    const sql = `
        SELECT reservas.*, usuarios.nombre, usuarios.email, usuarios.telefono
        FROM reservas
        JOIN usuarios ON reservas.id_usuario = usuarios.id_usuario
        WHERE reservas.fecha = ?
        ORDER BY reservas.horario ASC
    `;
    db.query(sql, [fecha], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(results);
    });
};


// Eliminar una reserva por ID
const deleteReserva = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM reservas WHERE id_reserva = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({ message: 'Reserva eliminada con éxito' });
    });
};


module.exports = {
    getAllReservas,
    createReserva,
    updateReserva,
    getReservaById,
    getReservasByFecha,
    deleteReserva
};










