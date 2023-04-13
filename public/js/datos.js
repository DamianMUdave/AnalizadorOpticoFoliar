var socket = io();

var SD1 = document.getElementById('sensData1');
var SD2 = document.getElementById('sensData2');
var SD3 = document.getElementById('sensData3');
var SD4 = document.getElementById('sensData4');

setInterval(myTimmer, 1000);

function myTimmer() {
    const d = new Date();
    hora.innerHTML = d.toLocaleTimeString();
}

function Jsonobj(obj) {
    var myObj = JSON.parse(obj);
    console.log(myObj);
    SD1.innerHTML = myObj.sens1;
    SD2.innerHTML = myObj.sens2;
    SD3.innerHTML = myObj.sens3;
    SD4.innerHTML = myObj.sens4;
}

function Jsonobj2(obj) {
    var myObj = JSON.parse(obj);
    console.log(myObj);

}