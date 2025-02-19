const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const register = async (req, res) => {
    try {
            const {firstname, lastname, email, password, role} = req.body;

            if(req.user.role !== 'admin'){
                return res.status(403).json({error: "Accès refusé : seuls les admins peuvent créer un compte"})
            };
            

            const hashPassword = await bcrypt.hash(password,10);
            const newUser =  new User({firstname, lastname, email, password: hashPassword, role});
            

            await newUser.save();
            res.status(200).json('bien enregistré');
        } catch (err){
            console.log("Erreur lors de l'enregistrement :", err);
            res.status(500).json({"error": "error in register"})
        }
};




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "48h" }
        );

        res.json({ token });
    } catch (err) {
        console.error("Erreur login:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};


module.exports = { register, login};