
const Day = require ('../models/Day');

const express = require ('express');
const router = express.Router();



router.get('/', async (req,res) => {
    try {
        const day = await Day.find({});
        console.log('cest ok',day);       
        res.json(day)
    } catch (err) {
        console.error('erreur charge day')
        res.status(500).json
    }
});

router.get('/:id', async (req,res) => {
    try {
        const day = await Day.findById(req.params.id);
        res.json(day)
    } catch (err) {
        console.error('erreur charge day')
        res.status(500).json
    }
});

// router.post('/', async (req, res) => {
//     const { email, password } = req.body;


module.exports = router;