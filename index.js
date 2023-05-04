const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 4000;
var clientState = false;

//Para capturar los datos del formulario sin errores
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Invocamos dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//Motor de plantillas ejs
app.set('view engine', 'ejs');

//Invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

//Var de sesion
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//modulo de conexión a DB
const connection = require('./database/db');

app.use(express.static(path.join("public")))

//login (primero en aparecer al ingresar a la pagina)
app.get("/", (req,res) => {
    //                        index.html
    //res.sendFile(__dirname + "/views/login")
    res.render('index');
})
//dashboard, donde se enseñaran los datos
//"/sensor"
app.get("/dashboard", (req,res)=>{
    //dashboard             /public/echo.html
    //res.sendFile(__dirname+"/views/dashboard");
    res.render('dashboard');
})
//registro
app.get("/register", (req,res)=>{
    //res.sendFile(__dirname+"/views/register");
    res.render('register');
})

//Registración
app.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    //Encryptacion
    let pH = await bcryptjs.hash(pass, 8);
    //Consulta
    connection.query('INSERT INTO usuarios SET ?', {Nombre:name, Correo:email, Password:pH}, async(error, result) => {
        if (error) {
            console.log(error);
        }else{
            res.render('register',{
                alert: true,
                alertTitle: "Registration",
                alertMessage: "Registracion exitosa",
                alertIcon: "success",
                showconfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })
})

//Login - autorizacion
app.post('/auth', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(email, pass);
    //Desencryptacion
    let pH = await bcryptjs.hash(pass, 8);
    //Consulta
    if(email && pass) {
        connection.query ('SELECT * FROM usuarios WHERE Correo = ?', [email], async (error, results) => {
            console.log("Contraseña: "+pass);
            console.log("Encriptada: "+results[0].Password);
            console.log("PH: "+pH);
            if(!results || results.length == 0 || !(await bcryptjs.compare(pass, results[0].Password))){
                //Datos incorrectos
                console.log(await bcryptjs.compare(pass, results[0].Password));
                res.render('index', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: ''
                })
            }else{
                //Datos correctos
                req.session.loggedin = true;
                req.session.name = results[0].Nombre;
                res.render('index', {
                    alert: true,
                    alertTitle: "LOGEADO",
                    alertMessage: "Login correcto",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'dashboard'
                })
            }
        })
    }else{
        //res.send('Por favor ingrese usuario y/o contraseña');
        res.render('index', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor ingrese usuario y/o contraseña",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: 1500,
            ruta: ''
        })
    }
})

function DataPrint(socket){
    if(!clientState == true){
      socket.send("No data for you sorry, check your credentials");
    }else{
      console.log('A new client Connected!');
      socket.send('Welcome New Client!');
      var today= new Date().toLocaleString('es-Mx', { timeZone: 'America/Mexico_City', });
      console.log(today);
      socket.emit("date",today);
    }
}

io.on('connection', (socket) => {
    clientState = true;
    DataPrint(socket);
    console.log('a user connected');
    socket.on('event_name', (data) => {
        var dt = JSON.stringify(data);
        console.log(`message: ${dt}`);
        io.emit('infoEsp32',dt);
    });
    socket.on('sens_Data', (data) => {
        var dt = JSON.stringify(data);
        console.log(`message: ${dt}`);
        io.emit('sensClientData',dt);
    });
    socket.on('disconnect', () => {
        clientState = false;
        console.log('user disconnect');
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
})

server.listen(port, () => {
    console.log((new Date()) + `Server is listening on port ${port}\n App listen on http://localhost:${port}`);
}) 