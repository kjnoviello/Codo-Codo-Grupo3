const db = require("../db/db");

//Obtenemos todos los usuarios

const getAllUsers = async (req, res) => {
  try {
    const [usuarios] = await db.execute("SELECT * FROM usuarios");
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

//obtenemos un usuario por ID

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [usuario] = await db.execute(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );

    if (usuario.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      res.status(200).json(usuario[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

//Creamos un Usuario

const createUser = async (req, res) => {
  const { nombre, email, telefono } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)",
      [nombre, email, telefono]
    );

    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

//Actualizamos el usuario

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  const sql =
    "UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id_usuario = ?";

  try {
    const [result] = await db.execute(sql, [nombre, email, telefono, id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    } else {
      res.json({ mensaje: "Usuario Actualizado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

//Eliminamos un usuario por ID

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id_usuario = ?";

  try {
    const [result] = await db.execute(sql, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    } else {
      res.json({ mensaje: "Usuario borrado con éxito" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al borrar el usuario" });
  }
};

//Exportamos los modulos
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
