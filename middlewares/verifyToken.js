const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.warn('Unauthorize: No token provided');
        return res.status(500).json({ message: 'Unauthorize: No token provided'});
    }

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(500).json({ message: 'Invalid TOKEN'});
    }

    const token = authHeader.slice(7);

    jwt.verify(token, config.token.secret, (err, decoded) => {
        if (err) {
            console.error('Something is wrong in verifying TOKEN');
            return res.status(500).json({ message: 'Unauthorize: Invalid TOKEN'});
        }

        req.body.user = decoded.user; // Attach the data to the request for late use
        next();
    })
}

module.exports = verifyToken;