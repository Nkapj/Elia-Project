const express = require('express');
const Week = require('../models/Week');

const router = express.Router();


router.get('/', async (req,res) =>{
    try {
        const weeks = await Week.find({});
        res.json(weeks);

    }catch (err){
        res.status(500).json('erreur de chargement');
    }
})

module.exports = router;