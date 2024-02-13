require('dotenv').config();

const jwt = require('jsonwebtoken');

async function getUser(token) {
    if (!token || token === 'undefined') return null;
    try {
        const user = jwt.verify(token, process.env.RSA_PRIVATE_KEY);
        return user;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return null;
        } else if (error.name === 'JsonWebTokenError') {
            return null;
        } else {
            throw error;
        }
    }
}

async function auth(req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).json({ error: 'Unauthorized - Access Token missing' });
    }
    const useruid = req.cookies.token;
    const user = await getUser(useruid);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized - Invalid Access Token' });
    }
    req.user = {userId:user.sub};
    next();
}

module.exports = {
    auth,
};
