//Creo la aplicacion Express
var app = require('express')();

//Defino el servidor
var http = require('http').Server(app);

//Defino el Socket
var io = require('socket.io')(http);

//Asignando puerto
var port = 3000;

//Defino la ruta raiz utilizando el metodo Get

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Conexion por medio Socket
io.on('connection', function (socket) {
    console.log("alguien se conectó");
    socket.on('canal-cliente', function (mensaje) {
        console.log(mensaje);
        let data = {
            fecha: new Date(),
            texto: mensaje.texto,
            usuario: mensaje.nombre
        };
        io.emit('canal-servidor', data);
    })

});

http.listen(port, function () {

    console.log("Servidor Conectado");
})
