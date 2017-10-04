var app = require('express')(),
    server = require('http').createServer(app),
    // Chargement de socket.io
    io = require('socket.io').listen(server),
    express = require('express'),
    connections = [];
    users = [];


app.use(express.static(__dirname + '/public'));


// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Cette page est introuvable !');
});

// Quand un client se connecte
//* en parametre de la socket de l utilisateur en cours 

io.sockets.on('connection', function (socket) {
    //on émet un message au client avec socket.emit(). La fonction prend 2 paramètres :
    connections.push(socket);
    console.log('connected:  sockets connected', connections.length);

    //* deconnexion 

    socket.on('disconnect', function(data){

    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    // splice: *Ecrase une tranche de tableau à partir de l'indice debut et sur un nombre nb d'éléments.
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets disconnect');
    })

    socket.on('envois message', function(data){
        date = new Date();
        data.h = date.getHours();
        data.m = data
        io.sockets.emit('nouveau message', {
            msg:data,
            user:socket.username
        });
    })

    socket.on('nouveau utilisateur', function(data, callback){
        callback(true);
        console.log('true');
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    })


});
    function updateUsernames(){
        console.log('flase');

        io.sockets.emit('get users', users);
    }

server.listen(8080);
console.log('Server running...');