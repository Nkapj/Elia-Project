const connectDB = require('../server/config/dbElia');
const userRoutes = require('./routes/userRoutes')
const express = require ('express');
const axios = require ('axios');

require('dotenv').config();


connectDB();

//


const app = express();

port = process.env.Port || 5000;

app.use('/api', userRoutes);


app.get('/',(req,res) => {
    res.send('hello world')
})





app.listen(port, () => {
    
    console.log(`server lancé sur port ${port}`)
});

