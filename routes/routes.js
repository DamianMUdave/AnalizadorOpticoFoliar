const http = require('http');
const express = require('express');
const {Server} = require("socket.io");
const app = express.Router();
const server = http.createServer(app);
const io = new Server(server);
const connection = require('../database/db');
var sensor = '';

//login (index)
app.get("/", (req, res) => {
    //                          index.html
    //res.sendFile(__dirname + "/views/login")
    res.render('index');
})

//dashboard, donde se enseñaran los datos
//"/sensor"
app.get("/dashboard", (req, res) => {
    //dashboard               /public/echo.html
    //res.sendFile(__dirname+"/views/dashboard");
    //res.render('dashboard');
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

    connection.query('SELECT '+
    'sensor.*, minerales.`Nnitrogeno`, minerales.`Pfosforo`, minerales.`Kpotasio`, minerales.`MgMagnesio` '+
    'FROM '+
    '`sensor`, `minerales` '+
    'WHERE '+
    'Valor = 138 and sensor.`IDPlant` = minerales.`IDPlant`', /*[sensor],*/ async (error, results) => {
        if(error){
            console.log(error);
        }else{
            //result = results;
            console.log("");
            console.log("Resultados de la consulta:");
            console.log(results);
            res.render('dashboard', {results});
        }
    });
    
})

//registro
app.get("/register", (req, res) => {
    //res.sendFile(__dirname+"/views/register");
    res.render('register');
})

//Exportar el modulo
module.exports = app;

/*Este archivo estaba en la carpeta JS de public*/