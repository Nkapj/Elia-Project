const connectDB = require('../server/config/dbElia');
const userRoutes = require('./routes/userRoutes')
const dayRoutes = require('./routes/dayRoutes');
const weekRoutes = require('./routes/weekRoutes');
const express = require ('express');
const axios = require ('axios');


require('dotenv').config();


connectDB();

//


const app = express();

port = process.env.Port || 5000;



app.use('/api/users/', userRoutes);

app.use('/api/days', dayRoutes);

app.use('/api/weeks', weekRoutes);



app.get('/',(req,res) => {
    res.send('hello world')
})



app.listen(port, () => {
    
    console.log(`server lancé sur port ${port}`)
});

