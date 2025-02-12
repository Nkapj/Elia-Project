const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const express = require('express');



require('dotenv').config();


const register = async (req, res) => {
    
    try {
            const {firstname, lastname, email, password, role} = req.body;
            // if(req.body.user !== 'admin'){
            //     return res.status(403).json({error: "adressez vous aupres d'un admin"})
            // };

            const hashPassword = await bcrypt.hash(password,10);
            
            const newUser =  new User({firstname, lastname, email, password: hashPassword, role});
            console.log(newUser);
            
            await newUser.save();
            res.status(200).json('bien enregistré');
        } catch (err){
            res.status(500).json({"error": "error in register"})
        }
};


const login = async (req,res) => {
    try {  
        const {email , password } = req.body;
        const user = await User.findOne({email});
        if (user) {      
            console.log(user);

            const match = await bcrypt.compare(password, user.password)
            console.log(match);
            
            if(!user || !match){
                res.status(401).json('mot de passe et/ou email incorrect');
            }

            const token = jwt.sign(
                {userId: user._id, role: user.role},
                    process.env.JWT_SECRET,
                {expiresIn: '48h'}
            );

            res.json({token});
        }
        res.status(500).json({"error": "user dont exist"})
    
        }catch (err){
        console.log("no")
        res.status(500).json({"error": "error in server"})
        }
};


const hashpasswords =  async (req,res) =>{
    try{
        const users = await User.find();
        for(let user of users){
            if(!user.password.startsWith("$2b$")){
                const hash= await bcrypt.hash(user.password, 10);
                user.password =hash;
                await user.save();
            }
            
        }
        res.json('tout les mdp hashé')
    } catch (err){
        res.status(500).json('erreur lors du hash')
    }
};

module.exports = { hashpasswords}

module.exports = {register, login};