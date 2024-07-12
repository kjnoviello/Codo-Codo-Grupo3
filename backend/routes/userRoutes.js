const express = require("express");

const router = express.Router();

const userController = require("../controllers/usuarioController");
const reservationController = require("../controllers/reservasController");
//Usuarios
router.get("/users", userController.getAllUsers);

router.get("/user/:id", userController.getUserById);

router.post("/user/create", userController.createUser);

router.put("/user/:id", userController.updateUser);

router.delete("/user/:id", userController.deleteUser);

//Reservas

module.exports = router;
