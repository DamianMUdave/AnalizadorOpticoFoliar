var socket = io();

var messages = document.getElementById('messages');
var m1 = document.getElementById('m1')
var flag = document.getElementById('flag');
var host = document.getElementById('host');
var sensData1 = document.getElementById('sensData1');

socket.on('date', (data) => {
    messages.innerHTML = data
    let n = `"${data}"`;
    let nStr = n.replace(/\//g, '-');
    console.log(nStr);
    console.log(data)
    console.log(typeof data);
})

socket.on('sensClientData', (data) => {
    console.log(data);
    console.log(typeof data);
    Jsonobj(data);
})

function Jsonobj(obj) {
    var myObj = JSON.parse(obj);
    console.log(myObj);
    sensData1.innerHTML = myObj.sens1;
}

/*$(document).ready(function () {
    $.ajax({
        url: "./database/datos.php", // Archivo PHP que obtiene los datos
        type: "GET", // Método de petición HTTP
        success: function (data) {
            var datos = JSON.parse(data);
            var tbody = $("#tabla tbody");

            $.each(datos, function (index, registro) {
                var fila = $("<tr></tr>");
                fila.append($("<td></td>").text(registro.ID-Plant));
                fila.append($("<td></td>").text(registro.Name-Plant));
                fila.append($("<td></td>").text(registro.Valor));
                fila.append($("<td></td>").text(registro.N-nitrogeno));
                fila.append($("<td></td>").text(registro.P-fosforo));
                fila.append($("<td></td>").text(registro.K-potasio));
                fila.append($("<td></td>").text(registro.Mg-Magnesio));
                tbody.append(fila);
            });
        }
    });
});

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((error) => {
    if (error) {
        console.log('Error de conexión Codigo: ' + error);
        return;
    }
    console.log('!DB connection');
});

connect.query('SELECT sensor.*, minerales.`N-nitrogeno`, minerales.`P-fosforo`, minerales.`K-potasio`, minerales.`Mg-Magnesio` FROM `sensor`, `minerales` WHERE Valor = 138 and sensor.`ID-Plant` = minerales.`ID-Plant`;', (error, results) => {
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

connection.end();*/