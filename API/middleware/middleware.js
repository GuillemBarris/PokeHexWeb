import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(403).json({ error: 'Access denied. No token provided.' });
    }

    try {
        
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;

        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = payload.exp - currentTime;
        if (timeLeft <= 300) {
            const newToken = jwt.sign({ user: payload.user }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.setHeader('Authorization', `Bearer ${newToken}`);
        }

        next(); 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please log in again.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token. Please provide a valid token.' });
        } else {
            return res.status(500).json({ error: 'Internal server error during token verification.' });
        }
    }
};