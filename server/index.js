const connectDB = require('../server/config/dbElia');
const userRoutes = require('./routes/userRoutes')
const dayRoutes = require('./routes/dayRoutes');
const weekRoutes = require('./routes/weekRoutes');
const express = require ('express');
const axios = require ('axios');
const path = require('path');



require('dotenv').config();


connectDB();

//


const app = express();

port = process.env.Port || 5000;



app.use('/api/users/', userRoutes);

app.use('/api/days', dayRoutes);

app.use('/api/weeks', weekRoutes);

app.use(express.static(path.join(__dirname, '../front-end/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/dist', 'index.html'));
});


// app.get('/',(req,res) => {
//     res.send('hello world')
// })



app.listen(port, () => {
    
    console.log(`server lancé sur port ${port}`)
});

