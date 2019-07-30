const mysql = require('mysql')

const conn = mysql.createConnection(
    {
        user: 'weldi0811',
        password: 'Mysql123',
        host: 'db4free.net',
        database: 'dbsqlweldi9',
        port : 3306
    }
)

module.exports = conn