const express = require('express');
const app = express.Router();

//login (primero en aparecer al ingresar a la pagina)
app.get("/", (req, res) => {
    //                        index.html
    //res.sendFile(__dirname + "/views/login")
    res.render('index');
})
//dashboard, donde se enseñaran los datos
//"/sensor"
app.get("/dashboard", (req, res) => {
    //dashboard             /public/echo.html
    //res.sendFile(__dirname+"/views/dashboard");
    res.render('dashboard');
})
//registro
app.get("/register", (req, res) => {
    //res.sendFile(__dirname+"/views/register");
    res.render('register');
})

module.exports = app;