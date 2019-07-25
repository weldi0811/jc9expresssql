const mysql = require('mysql')

const conn = mysql.createConnection(
    {
        user: 'userbersama',
        password: 'Mysql123',
        host: 'localhost',
        database: 'jc9mysql',
        port : 3306
    }
)

module.exports = conn