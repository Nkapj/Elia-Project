require('dotenv').config();
const express = require ('express');
const connectDB = require('./config/dbElia');


const userRoutes = require('./routes/userRoutes'); 
const dayRoutes = require('./routes/dayRoutes');
const weekRoutes = require('./routes/weekRoutes');
const authRoutes = require('./routes/authRoutes');


connectDB();
const app = express();
app.use(express.json());


port = process.env.PORT || 3000;



app.use('/api/auth', authRoutes);

app.use('/api/users/', userRoutes);

app.use('/api/days', dayRoutes);
app.use('/api/weeks', weekRoutes);


// Route Test Serveur
app.get('/',(req,res) => {
    res.send('hello world')
})



app.listen(port, () => {

    console.log(`server lancé sur port ${port}`)
});
