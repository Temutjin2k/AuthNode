require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Token missing or malformed.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.email = decoded.email; 
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}


module.exports = verifyToken;