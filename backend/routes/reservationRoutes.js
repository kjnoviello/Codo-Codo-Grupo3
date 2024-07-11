const express = require("express");

const router = express.Router();

const reservationController = require("../controllers/reservasController");
//Reservas
router.get("/reservations", reservationController.getAllReservations);

router.get("/reservation/:id", reservationController.getRervationById);

router.get(
  "/reservations/:id_usuario",
  reservationController.getReservationsByUserId
);

router.get(
  "/reservations-user/:id_usuario",
  reservationController.getReservationsWithUserData
);

router.post("/create-reservation", reservationController.createReservation);

router.put("/reservation/:id", reservationController.updateReservation);

router.delete("/reservation/:id", reservationController.deleteReservation);

router.post("/reservetion/date", reservationController.getReservationsByDate);

module.exports = router;
