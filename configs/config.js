const MYSQL_HOST = 'localhost';
const MYSQL_USER = 'root';
const MYSQL_PASS = '31N$t31n';
const MYSQL_DATABASE = 'inventory';

const TOKEN_EXPIRETIME = 3600;
const TOKEN_ISSUER = 'MIT';
const TOKEN_SECRET_KEY = 'thisisnothingbutsecret';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
}

const TOKEN = {
    expireTime: TOKEN_EXPIRETIME,
    issuer: TOKEN_ISSUER,
    secret: TOKEN_SECRET_KEY
}

const config = {
    mysql: MYSQL,
    token: TOKEN
}

module.exports = config;