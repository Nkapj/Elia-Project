//const mongoose = require ('mongoose');
const User = require ("../models/User");
const express = require ('express');
const router = express.Router();
const {register , login} = require('../controllers/autControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const hashPassword = require('../controllers/autControllers');

router.get('/',  async (req,res) => {
    try{
        const users = await User.find({});
        res.json(users);
    } catch (err){
        return res.status(500).json({message : "erreur serveur "})
    }
});



router.get('/profil', async (req,res) => {
    try{
        const profil = await User.findById(req.user.userID);
        if(!profil) {
            return res.status(404).json('utilisateur non trouvé')
        }
        res.json(profil);
    } catch (err){
        return res.status(500).json({message : "erreur serveur "})
    }
});

router.get('/hash-password', hashPassword);

router.post('/register', register);
router.post('/login', login)


///////////////////









module.exports = router;