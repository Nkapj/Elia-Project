//configuration de mongoose pour la co a la DB
const mongoose = require('mongoose');


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            
        });
        console.log("tout es ok pour mongo");
    } catch (err) {
        console.error("erreur de co a la db");
    }
}

module.exports = connectDB;
