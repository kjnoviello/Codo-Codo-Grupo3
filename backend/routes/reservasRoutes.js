const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.get('/', reservasController.getAllReservas);
router.get('/:id', reservasController.getReservaById);
router.get('/fecha/:fecha', reservasController.getReservasByFecha);
router.post('/', reservasController.createReserva);
router.put('/:id', reservasController.updateReserva);
router.delete('/:id', reservasController.deleteReserva);

module.exports = router;
