const http = require('http');
const express = require('express');
const {Server} = require("socket.io");
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//modulo de conexión a DB
const connection = require('./db');

var sensor = '';
//var result = {};
/*
console.log("PRUEBA CONSULTA");
console.log(sensor);
//console.log(result);
*/
io.on('connection', (socket) => {
    clientState = true;
    DataPrint(socket);
    //Datos recibidos del sensor
    socket.on('sens_Data', (data) => {
        var dt = JSON.stringify(data);
        //console.log(`message: ${dt}`);
        //io.emit('sensClientData', dt);
        console.log(dt);
        //sensor = myObj.sens1;
        sensor = 138;
        console.log("Valor del sensor en la coneccion: "+sensor);
    });
})
/*
console.log("PRUEBA SENSOR");
console.log("Valor del sensor: "+sensor);
*/
connection.query('SELECT '+
'sensor.*, minerales.`Nnitrogeno`, minerales.`Pfosforo`, minerales.`Kpotasio`, minerales.`MgMagnesio` '+
'FROM '+
'`sensor`, `minerales` '+
'WHERE '+
'Valor = 138 and sensor.`IDPlant` = minerales.`IDPlant`', async (error, results) => {
    if(error){
        console.log(error);
    }else{
        //result = results;
        /*
        console.log("");
        console.log("Resultados de la consulta:");
        console.log(results);
        */
        app.get("/dashboard", (req, res) => {
            res.render('dashboard', {results});
        })
    }
    //module.exports = results;
});

/*Este archivo estaba en la carpeta de JS de la carpeta public*/