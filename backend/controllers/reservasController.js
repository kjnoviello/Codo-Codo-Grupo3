//Importamos la conexión de la base de datos
const db = require("../db/db");

//Obtenemos todas las reservas

const getAllReservations = async (req, res) => {
  try {
    const [reservas] = await db.execute("SELECT * FROM reservas");
    res.status(200).json(reservas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

//Obtenemos una reserva por ID

const getRervationById = async (req, res) => {
  const { id } = req.params;

  try {
    const [reserva] = await db.execute(
      "SELECT * FROM reservas WHERE id_reserva = ?",
      [id]
    );

    if (reserva.length === 0) {
      res.status(404).json({ error: "reserva no encontrada" });
    } else {
      res.status(200).json(reserva[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener la reserva" });
  }
};

//Creamos Una reserva

const createReservation = async (req, res) => {
  const { numero_personas, fecha, horario, mensaje_reserva, id_usuario } =
    req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO reservas (numero_personas, fecha, horario ,mensaje_reserva,id_usuario) VALUES (?, ?, ?,?,?)",
      [numero_personas, fecha, horario, mensaje_reserva, id_usuario]
    );

    res.status(201).json({ message: "Reserva creada", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

//Actualizamos una reserva por ID

const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { numero_personas, fecha, horario, mensaje_reserva, id_usuario } =
    req.body;

  const sql =
    "UPDATE reservas SET numero_personas = ?, fecha = ?, horario = ?,mensaje_reserva=?,id_usuario=? WHERE id_reserva = ?";

  try {
    const [result] = await db.execute(sql, [
      numero_personas,
      fecha,
      horario,
      mensaje_reserva,
      id_usuario,
      id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: "reserva no encontrada" });
    } else {
      res.json({ mensaje: "reserva Actualizada" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la reserva" });
  }
};

//Eliminamos una reserva por su ID

const deleteReservation = async (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM reservas WHERE id_reserva = ?";

  try {
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: "Reserva no encontrada" });
    } else {
      res.json({ mensaje: "Reserva borrada con éxito" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al borrar la reserva" });
  }
};

//Obtenemos las reservas por usuario

const getReservationsByUserId = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [reservas] = await db.execute(
      "SELECT * FROM reservas WHERE id_usuario = ?",
      [id_usuario]
    );

    if (reservas.length === 0) {
      res
        .status(404)
        .json({ error: "No se encontraron reservas para este usuario" });
    } else {
      res.status(200).json(reservas);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al obtener las reservas del usuario" });
  }
};

module.exports = {
  getAllReservations,
  getRervationById,
  createReservation,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
};
