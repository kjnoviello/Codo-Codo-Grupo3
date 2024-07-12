//app.js

const express = require("express");

const app = express();

const userRoutes = require("../routes/userRoutes");
const reservationRoutes = require("../routes/reservationRoutes");

const PORT = 3000;

app.use(express.json());
app.use("/clientes", userRoutes);
app.use("/clientes", reservationRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
git 