const express = require ('express');
const { register, login } = require('../controllers/authControllers'); 
const authMiddleware = require('../middlewares/authMiddleware');
const User = require ("../models/User");

const router = express.Router();




// Routes Auth
router.post('/register', register);
router.post('/login', login);


// Routes Profil & Utilisateurs
router.get('/', authMiddleware, async (req,res) => {
    try{
        const users = await User.find({});
        res.json(users);
    } catch (err){
        return res.status(500).json({message : "erreur serveur "})
    }
});



router.get('/profil', authMiddleware, async (req,res) => {
    try{
        const profil = await User.findById(req.user.id);
        if(!profil) {
            return res.status(404).json('utilisateur non trouvé')
        }
        res.json(profil);
    } catch (err){
        return res.status(500).json({message : "erreur serveur "})
    }
});



module.exports = router;