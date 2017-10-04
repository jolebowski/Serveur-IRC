//*Ensuite, nous pouvons effectuer des actions du côté du client pour communiquer avec le serveur.
$(document).ready(function(){
    var socket = io.connect('http://localhost:8080');
    var messageform = $('#messageform');
    var message  = $('#message');
    var chat = $('#chat');

    var messageArea = $('#messageArea');
    var userFormArea = $('#userFormArea');
    var userForm = $('#userForm');
    var username = $('#username');
    var users = $('#users');

    messageform.submit(function(e){
        e.preventDefault();
        socket.emit('envois message', message.val());
        message.val('');
    });
    socket.on('nouveau message', function(data){
        parseCommand(data.msg);
        chat.append('<div class="well"><strong>'+data.user+'</strong> :'+data.msg+ '</div>');
    })

    userForm.submit(function(e){
    e.preventDefault();
        socket.emit('nouveau utilisateur', username.val(), function(data){
            if(data){
                userFormArea.hide(),
                messageArea.show()
            }
        });
        username.val('');
    });
    socket.on('get users', function(data){
        var html = '';
        for(i = 0; i < data.length;i++){
            html += '<li class="list-group-item">'+data[i]+'</li>';
        }
        users.html(html);
    })


    function parseCommand (msg) {
        var argv = msg.split(' ')[1];
        
        if (msg) {
            if (msg[0] == '/' && msg[1]) {
                console.log(msg);
                switch (msg) {
                    case '/nick':
                        break;

                }
            }
        }
    }

});