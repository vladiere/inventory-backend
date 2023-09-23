const mysql = require('mysql2');
const config = require('./config');

const params = {
    user: config.mysql.user,
    password: config.mysql.pass,
    host: config.mysql.host,
    database: config.mysql.database
}

const Connect = async () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(params);

        connection.connect(error => {
            if (error) {
                reject(error); 
                return;
            }

            resolve(connection);
        })
    })
}

const Query = async (connection, query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                reject(error);
                return
            };

            resolve(result);
            connection.end();
        })
    })
}

module.exports = { Connect, Query};