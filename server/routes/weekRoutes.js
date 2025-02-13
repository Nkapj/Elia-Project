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

router.get('/:id', async (req,res) =>{
    try {
        const week = await Week.findById(req.params.id);
        res.json(week);

    }catch (err){
        res.status(500).json('erreur de chargement');
    }
})

router.put("/:id", async (req, res) => {
    try {
      const { guard } = req.body;        
      const updatedWeek = await Week.findByIdAndUpdate(
        req.params.id,  
        { $set: { guard: guard } },  
        { new: true }
      );
      
  
      res.json(updatedWeek); // On envoie la semaine mise à jour au client
    } catch (err) {
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  });
  
  

module.exports = router;