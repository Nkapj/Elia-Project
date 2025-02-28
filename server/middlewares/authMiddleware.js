const jwt = require('jsonwebtoken');


const authMiddleware = (req,res, next) => {
        try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if(!token) return res.status(401).json({error: 'accés refusé'});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
        }  catch (err){
                console.log('Erreur authMiddleware:', err.message)
                return res.status(403).json({error: 'acces invalide'})
        }
};

module.exports = authMiddleware;