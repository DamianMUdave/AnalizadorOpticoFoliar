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



connection.query('USE dron_foliar; SELECT sensor.*, minerales.`N-nitrogeno`, minerales.`P-fosforo`, minerales.`K-potasio`, minerales.`Mg-Magnesio` FROM `sensor`, `minerales` WHERE Valor=138 AND sensor.`ID-Plant` = minerales.`ID-Plant`;', (error, results) => {
    if (error) {
        console.log('Error en la consulta Codigo: ' + error);
        return;
    }

    // Mostramos los datos en la tabla HTML
    $.each(results, function (index, registro) {
        const fila = $('<tr>');
        fila.append($('<td>').text(registro.ID - Plant));
        fila.append($('<td>').text(registro.Name - Plant));
        fila.append($('<td>').text(registro.Valor));
        fila.append($('<td>').text(registro.N - nitrogeno));
        fila.append($('<td>').text(registro.P - fosforo));
        fila.append($('<td>').text(registro.K - potasio));
        fila.append($('<td>').text(registro.Mg - Magnesio));
        $('#datos').append(fila);
    });
});
module.exports = connection;