var socket = io();

var messages = document.getElementById('messages');
var m1 = document.getElementById('m1')
var flag = document.getElementById('flag');
var host = document.getElementById('host');
var sensData1 = document.getElementById('sensData1');
var sensData2 = document.getElementById('sensData2');
var sensData3 = document.getElementById('sensData3');
var sensData4 = document.getElementById('sensData4');
var sensData5 = document.getElementById('sensData5');
var sensData6 = document.getElementById('sensData6');

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

socket.on('infoEsp32', (data) => {
    console.log(data);
    console.log(typeof data);
    Jsonobj2(data);
})

setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  m1.innerHTML = d.toLocaleTimeString();
}

function Jsonobj(obj){
    var myObj = JSON.parse(obj);
    console.log(myObj);
    sensData1.innerHTML = myObj.sens1;
    sensData2.innerHTML = myObj.sens2;
    sensData3.innerHTML = myObj.sens3;
    sensData4.innerHTML = myObj.sens4;
    sensData5.innerHTML = myObj.sens5;
    sensData6.innerHTML = myObj.sens6;
}

function Jsonobj2(obj){
    var myObj = JSON.parse(obj);
    console.log(myObj);
    flag.innerHTML = myObj.now;
    host.innerHTML = `Localhost: ${myObj.host}`;
}
