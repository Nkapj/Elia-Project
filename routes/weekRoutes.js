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
});




router.post('/', async (req, res) => {

    try{
        const {startDate,endDate} = req.body

        const newWeek = new Week({startDate,endDate});
        const saveWeek = await newWeek.save()
        res.status(200).json(saveWeek)
    } catch (err) {
        console.error(err);
        res.status(500).json('erreur de chargement')
    }
})

module.exports = router;