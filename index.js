const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 4000;
var clientState = false;

app.use(express.static(path.join("public")))

app.get("/", (req,res) => {
    res.sendFile(__dirname + "index.html")
})

app.get("/sensor", (req,res)=>{
    res.sendFile(__dirname+"/public/echo.html");
})


function DataPrint(socket){
    if(!clientState == true){
      socket.send("No data for you sorry, check your credentials");
    }else{
      /* const ip = req.socket.remoteAddress; */
      console.log('A new client Connected!');
      socket.send('Welcome New Client!');
      var today= new Date().toLocaleString('es-Mx', { timeZone: 'America/Mexico_City', });
      console.log(today);
      /* console.log(ip); */
      socket.emit("date",today);
    }
  }


io.on('connection', (socket) => {
    clientState = true;
    DataPrint(socket);
    console.log('a user connected');
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