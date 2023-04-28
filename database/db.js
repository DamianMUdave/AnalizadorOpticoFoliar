//invocamos mysql
const mysql = require('mysql'); // necesitas instalar este complemento nmp i mysql

//creamos la conexión
const connection = mysql.createConnection({ //en esta parte declaras los datos de conexion, como lo son el nombre de la base de datos etc.
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
//console.log(connection);

connection.connect((error) => { //este apartado es opcional solo nos permite visualizar por conzola si se establecio la conexión
    if (error) {
        console.log('Error de conexión Codigo: ' + error);
        return;
    }
    //es opcional, podemos eliminarla.
    console.log('!DB connection');
});

module.exports = connection;