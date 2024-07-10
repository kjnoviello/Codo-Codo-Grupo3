const express = require("express");

const router = express.Router();

const reservationController = require("../controllers/reservasController");
//Reservas
router.get("/reservations", reservationController.getAllReservations);

router.get("/reservation/:id", reservationController.getRervationById);

router.post("/create-reservation", reservationController.createReservation);

router.put("/reservation/:id", reservationController.updateReservation);

router.delete("/reservation/:id", reservationController.deleteReservation);

router.get(
  "/reservations/:id_usuario",
  reservationController.getReservationsByUserId
);

//Reservas

module.exports = router;
