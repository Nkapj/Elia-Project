const connectDB = require('./config/dbElia');
const userRoutes = require('./routes/userRoutes'); 
const dayRoutes = require('./routes/dayRoutes');
const weekRoutes = require('./routes/weekRoutes');
const express = require ('express');
const authMiddleware = require('./middlewares/authMiddleware');
const {register,login} = require('./controllers/autControllers');
const hashRoutes = require('./routes/userRoutes');


require('dotenv').config();
connectDB();
//
const app = express();
app.use(express.json());
port = process.env.Port || 3000;



app.post('/register', register);

app.post('/login', login);



app.get('/profil', userRoutes)
app.use('/api/hash', userRoutes)

app.use('/api/users/', userRoutes);

app.use('/api/days', dayRoutes);

app.use('/api/weeks', weekRoutes);



app.get('/',(req,res) => {
    res.send('hello world')
})



app.listen(port, () => {
    
    console.log(`server lancé sur port ${port}`)
});

