const jwt = require('jsonwebtoken');

require('dotenv').config();


const authMiddleware = (req,res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) {
        return res.status(401).json({error: 'accés refusé'})
    }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }   catch (err){
        console.log('erreur lors de la verification', err)
        return res.status(403).json({error: 'acces invalide'})
    }
}

module.exports = authMiddleware;