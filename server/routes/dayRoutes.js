const Day = require ('../models/Day');
const express = require ('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');




router.get('/',authMiddleware ,async (req,res) => {
    try {
        const day = await Day.find({});      
        res.json(day)
    } catch (err) {
        console.error('erreur charge day')
        res.status(500).json
    }
}); 

router.get('/:id',authMiddleware ,async (req,res) => {
  try {
      const day = await Day.findById(req.params.id);      
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

router.put("/:id",authMiddleware ,async (req, res) => {
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