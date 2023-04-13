var socket = io();

var messages = document.getElementsById('messages');
var form = document.getElementsById('form');
var input = document.getElementsById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(input.checked){
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on ('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

//confirmacion de login

function login() { //se ejecuta cuando se presiona el boton de login

    var correo, Contraseña;
    //verificación sin tokens
    correo = document.getElementById('email').value;  //obtiene el valor del campo email
    Contraseña = document.getElementById('pass').value; //obtiene el valor del campo pass

    if(correo == "admin@hotmail.com" && Contraseña == "12345678"){ //se comprueba si el correo y la contraseña son correctos
        location.href = "datos.html";
        alert("Iniciaste Sesión");
    }else{ //se comprueba si el correo y la contraseña son incorrectos
        location.href = "index.html";
        alert("Usuario o contraseña incorrectos");
    }
    
    }