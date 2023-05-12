const express = require('express');
const app = express.Router();
const results = require('./public/js/echo').results;

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
    res.render('dashboard', {data: results});
})

//registro
app.get("/register", (req, res) => {
    //res.sendFile(__dirname+"/views/register");
    res.render('register');
})

//Exportar el modulo
module.exports = app;