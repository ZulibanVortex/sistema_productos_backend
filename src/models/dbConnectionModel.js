const mysql = require("mysql");
const configServe = require('../config/config')
const dbConfig = configServe().configmysql;




// Crear una conexión a la base de datos
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});


// Abre la conexión con mysql
connection.connect(error => {
    if (error) throw error;
});


module.exports = connection;