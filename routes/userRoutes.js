
const User = require ("../models/User");
const express = require ('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt')




router.get('/',  async (req,res) => {
    try{
        const users = await User.find({});
        res.json(users);
    } catch (err){
        return res.status(500).json({message : "erreur serveur "})
    }
});



router.get('/profil', authMiddleware, async (req,res) => {
    try{
        const profil = await User.findById(req.user.userid);
        if(!profil) {
            return res.status(404).json('utilisateur non trouvé')
        }
        res.json(profil);
    } catch (err){
        return res.status(500).json({message : "erreur serveur "})
    }
});



router.get('/hash-passwords', async (req, res) => {
    try {
        const users = await User.find();
        for (let user of users) {
            if (!user.password.startsWith("$2b$")) { // Vérifie si déjà hashé
                const hash = await bcrypt.hash(user.password, 10);
                user.password = hash;
                await user.save();
            }
        }
        res.json({ message: "Tous les mots de passe sont maintenant hashés !" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Erreur lors du hash", details: err });
    }
});





module.exports = router;