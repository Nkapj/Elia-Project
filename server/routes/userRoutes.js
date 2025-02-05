//const mongoose = require ('mongoose');

const User = require ("../models/User");
const express = require ('express');

const router = express.Router();


router.get('/users', async (req,res) => {
    try{
        
        const users = await User.find({}, "_id email");
        res.json(users);
    } catch (err){
        res.status(500).json({message : "erreur serveur "})
    }
});

module.exports = router;