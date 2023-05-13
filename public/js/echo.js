var socket = io();

var messages = document.getElementById('messages');
var sensData1 = document.getElementById('sensData1');
var sensData2 = document.getElementById('sensData2');
var sensData3 = document.getElementById('sensData3');
/*======================================================================*/
var sensor = '';
/*======================================================================*/

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
    Tabla(data);
})

function Jsonobj(obj) {
    var myObj = JSON.parse(obj);
    console.log(myObj);
    sensData1.innerHTML = myObj.sens1;
    sensData2.innerHTML = myObj.sens2;
    sensData3.innerHTML = myObj.sens3;
}

/*======================================================================*/
//modulo de conexión a DB
const connection = require('./database/db');

function Tabla(obj){
    var myObj = JSON.parse(obj);
    console.log(myObj);
    //sensor = myObj.sens1;
    sensor = 150;
    console.log(sensor);
    connection.query('SELECT '+
    'sensor.*, minerales.`N-nitrogeno`, minerales.`P-fosforo`, minerales.`K-potasio`, minerales.`Mg-Magnesio` '+
    'FROM '+
    '`sensor`, `minerales` '+
    'WHERE '+
    'Valor = ? and sensor.`ID-Plant` = minerales.`ID-Plant`', [sensor], async (error, results) => {
        if(error){
            console.log(error);
        }else{
            if (!results || results.length == 0) {

            } else {
                module.exports.results = results;
            }
        }
    })
}