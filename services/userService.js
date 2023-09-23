const { Connect, Query } = require('../configs/mysql.config');
const bcryptjs = require('bcryptjs');
const signedJWT = require('../utils/signedJWT');

const registerUser = async (userData) => {
    try {
        const hash = await bcryptjs.hash(userData.password, 10);
        
        let query = `INSERT INTO user (username, password) VALUES ('${userData.username}','${hash}');`;

        const connection = await Connect();
        const result = await Query(connection, query);

        if (result.affectedRows === 0) {
            return { message: 'Registration Error', status: 500 };
        }

        return result;
    } catch (error) {
        console.error('Error on Registration: ', error.message);
    }
}

const loginUser = async (username, password) => {
    try {
        let query = `SELECT * FROM user WHERE username = '${username}';`;

        const connection = await Connect();
        const users = await Query(connection, query);

        if (users.status === 404) {
            return { message: 'User not found' };
        }
        console.info(users[0])
        const result = await new Promise((resolve, reject) => {
            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    reject({
                        message: error.message,
                        error
                    })
                } else if (result) {
                    signedJWT(users, (_error, token) => {
                        if (_error) {
                            reject({
                                message: _error.message,
                                _error
                            })
                        } else if (token) {
                            resolve({
                                id: users[0].id,
                                username: users[0].username,
                                token
                            })
                        }
                    })
                } else {
                    reject({
                        message: 'Login failed wrong password',
                        status: 500
                    })
                }
            })
        })

        return result;
    } catch (error) {
        console.error('Error on Logging in User: ', error.message);
    }
}

module.exports = {
    registerUser,
    loginUser
}