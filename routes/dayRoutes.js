
const Day = require ('../models/Day');

const express = require ('express');
const router = express.Router();



router.get('/', async (req,res) => {
    try {
        const day = await Day.find({});      
        res.json(day)
    } catch (err) {
        console.error('erreur charge day')
        res.status(500).json
    }
});



router.post('/', async (req, res) => {
    try{

        const {date, schedule} = req.body

        // if (!date || schedule){
        //     return res.status(400).json('info requise');
        // }
        const newDay = new Day({date, schedule});
        const saveDay = await newDay.save()
        res.status(200).json(saveDay);
    } catch (err){
        console.error("un erreur s'est produite lors de l'ajout",err);
        res.status(500).json('erreur survenue')
    }
});

module.exports = router;