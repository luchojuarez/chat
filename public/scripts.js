$(function() {
    //areas
    var $title = $('#titulo')
    var $loginPage = $('#login')
    var $chatPage  = $('#chat')
    var mySound = new Audio('/audio/brute-force.mp3'); mySound.load();
    var $usernameInput = $('#nombre').focus();

    //metaData
    var user = $(document).metaData.user;
    var prevMessages = $(document).metaData.messages;

    var $inputMessage = $('#chat_input'); // Input message input box
    var $messages = $('#mensajes'); // Messages area

    //var socket = io();
    var socket = io.connect('/');
    function insertPrevMessages(item,index) {
        var data = {
            user:item.from,
            message:item.text,
            date:item.date
        }
        if(item.from.username===user.username)
            addMsj(data,'me');
        else
            addMsj(data);
    }

    $(document).ready(function(){
        prevMessages.forEach(insertPrevMessages);
    });

    function sendMessage () {
        var message = $inputMessage.val();
        if(message){
            var data = {
                user:user,
                message:message,
                date:Date.now()
            }
            $inputMessage.val('');
            addMsj(data,'me');
            // tell server to execute 'new message' and send along one parameter
            socket.emit('newMessage', data)
        }
    }

    socket.on('newMessage' , function (data) {
        $(document).attr("title", data.user.username+" dice");
        mySound.play();
        addMsj(data)
    })

    $(window).keydown(function (event) {
        //si preciono enter
        if (event.which === 13)
            sendMessage();
    })

    //ver el mensaje
    $inputMessage.focus(function () {
        $(document).attr("title", 'Chat');
    })

    function addMsj(data,_from) {
        var fecha = new Date(data.date);
        if(_from=='me'){
            $messages.append('<div class="row msg_container base_sent"><div class="col-md-10 col-xs-10"><div class="messages msg_sent me"><p>'
                +data.message+
            '</p><informacion>'+fecha.toLocaleString()||''+'</informacion></div></div></div>')

        }else{
            $messages.append('<div class="row msg_container base_recive"><div class="col-md-10 col-xs-10"><div class="messages msg_recive"><p>'
                +data.message+
            '</p><informacion>'+data.user.username+' '+fecha.toLocaleString()||''+'</informacion></div></div></div>')
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

})
