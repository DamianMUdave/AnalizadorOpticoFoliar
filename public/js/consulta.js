const http = require('http');
const express = require('express');
const {Server} = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//modulo de conexión a DB
const connection = require('/Damian/ITT/Actividades Complementarias/Proyecto del dron/Dron 2.0/Analizador/database/db');

var sensor = '';
var result = [];

io.on('sensClientData', (data) => {
    var myObj = JSON.parse(data);
    console.log(myObj);
    //sensor = myObj.sens1;
    sensor = 138;
    console.log(sensor);
    connection.query('SELECT '+
    'sensor.*, minerales.`N-nitrogeno`, minerales.`P-fosforo`, minerales.`K-potasio`, minerales.`Mg-Magnesio` '+
    'FROM '+
    '`sensor`, `minerales` '+
    'WHERE '+
    'Valor = ? and sensor.`ID-Plant` = minerales.`ID-Plant`', [sensor], async (error, results) => {
        if(error){
            console.log(error);
        }else{
            result = results;
        }
        module.exports = result;
    })
})

module.exports = io;
/*
function Tabla(obj){
    var myObj = JSON.parse(obj);
    console.log(myObj);
    //sensor = myObj.sens1;
    sensor = 150;
    console.log(sensor);
    connection.query('SELECT '+
    'sensor.*, minerales.`N-nitrogeno`, minerales.`P-fosforo`, minerales.`K-potasio`, minerales.`Mg-Magnesio` '+
    'FROM '+
    '`sensor`, `minerales` '+
    'WHERE '+
    'Valor = ? and sensor.`ID-Plant` = minerales.`ID-Plant`', [sensor], async (error, results) => {
        if(error){
            console.log(error);
        }else{
            result = results;
        }
        module.exports = result;
    })
}*/