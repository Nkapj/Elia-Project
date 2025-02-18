
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

router.put("/:id", async (req, res) => {
    try {
      const { schedule } = req.body;
  
      const updatedDay = await Day.findByIdAndUpdate(req.params.id,
        {
          $set: { schedule:schedule }
        },
        { 
          new: true,  // Retourner le document mis à jour
          runValidators: true, // Valider les données avant de mettre à jour
        }
      );
  
      res.json(updatedDay); // Retourne le document mis à jour
    } catch (err) {
      console.error("Error updating day:", err);  // Afficher l'erreur dans la console
      res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
  });
  

module.exports = router;