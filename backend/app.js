//app.js 

const express = require('express');

const app = express();

const reservasRoutes = require('./routes/reservasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const PORT = 3000; 

app.use(express.json());

//ruta  principal es clientes
// app.use('/clientes', reservasRoutes);
// app.use('/clientes', usuariosRoutes);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

