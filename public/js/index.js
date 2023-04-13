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