//const mongoose = require ('mongoose');
const User = require ("../models/User");
const express = require ('express');
const path=require("path");

const router = express.Router();

const fs = require('fs');

router.get('/', async (req, res) => {
    try {
        // Récupérer tous les utilisateurs de la base de données
        const users = await User.find({});
        res.json(users);  // Envoie les utilisateurs sous forme de JSON
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });  // Si une erreur se produit
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Récupérer tous les utilisateurs de la base de données
        const user = await User.findById(req.params.id);
        res.json(user);  // Envoie les utilisateurs sous forme de JSON
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });  // Si une erreur se produit
    }
});



///////////////////



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

      // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

      // Générer un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });

    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});


///////////////////



router.post('/', async (req,res) => {
    try{
        
        const newUsers = new User(req.body)
        await newUsers.save(); 
        res.json(newUsers);
    } catch (err){
        res.status(400).json({message : "erreur de rajout "})
    }
});


module.exports = router;