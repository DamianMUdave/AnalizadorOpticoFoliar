var socket = io();

var sensData1 = document.getElementById('sensData1');
var sensData2 = document.getElementById('sensData2');
var sensData3 = document.getElementById('sensData3');
var sensData4 = document.getElementById('sensData4');

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

setInterval(myTimmer, 1000);

function myTimmer() {
    const d = new Date();
    hora.innerHTML = d.toLocaleTimeString();
}

function Jsonobj(obj) {
    var myObj = JSON.parse(obj);
    console.log(myObj);
    sensData1.innerHTML = myObj.sens1;
    sensData2.innerHTML = myObj.sens2;
    sensData3.innerHTML = myObj.sens3;
    sensData4.innerHTML = myObj.sens4;
}