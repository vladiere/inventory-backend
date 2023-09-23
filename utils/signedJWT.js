const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const signedJWT = (user, callback) => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config.token.expireTime) * 100000;
    var expirationTimeInSec = Math.floor(expirationTime / 1000);

    try {
        jwt.sign(
            { username: user[0].username },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSec
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        console.error('Signing JWT Error: ',error.message, error);
        callback(error, null);
    }
};

module.exports = signedJWT;