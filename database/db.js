//Invocamos mysql
//Necesitas instalar este complemento nmp i mysql
const mysql = require('mysql');

//Creamos la conexión
//En esta parte declaras los datos de conexion, como lo son el nombre de la base de datos etc.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//Este apartado es opcional solo nos permite visualizar por conzola si se establecio la conexión
connection.connect((error) => {
    if (error) {
        console.log('Error de conexión Codigo: ' + error);
        return;
    }
    console.log('!DB connection');
});
module.exports = connection;