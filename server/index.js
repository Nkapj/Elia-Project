const connectDB = require('../server/config/dbElia');
const userRoutes = require('./routes/userRoutes')
const dayRoutes = require('./routes/dayRoutes');
const weekRoutes = require('./routes/weekRoutes');
const express = require ('express');
const axios = require ('axios');
const path = require('path');
const cors = require('cors');



require('dotenv').config();


connectDB();

//


const app = express();

port = process.env.Port || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Remplace par l'URL de ton front-end si nécessaire
  methods: ['GET', 'POST'], // Liste des méthodes autorisées
  credentials: true, // Si tu utilises des cookies ou des sessions
}));

app.use(express.static(path.join(__dirname, '../front-end/dist')));

app.use('/api/users', userRoutes);

app.use('/api/days', dayRoutes);

app.use('/api/weeks', weekRoutes);


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/dist', 'index.html'));
// });


app.listen(port, () => {
    console.log(`server lancé sur port ${port}`)
});

