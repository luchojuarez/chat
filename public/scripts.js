$(function() {
    //areas
    var $title = $('#titulo')
    var $loginPage = $('#login')
    var $chatPage  = $('#chat')
    var mySound = new Audio('/audio/brute-force.mp3'); mySound.load();
    var $usernameInput = $('#nombre').focus();
    var $user = $('#username')

    var $inputMessage = $('#chat_input'); // Input message input box
    var $messages = $('#mensajes'); // Messages area

    //var socket = io();
    var socket = io.connect('/');

    function sendMessage () {
        var message = $inputMessage.val();
        if(message.length>0){
            ///////////////////////////////////inproove this shit
            var data = {username:$user.val('username')[0].innerHTML,message:message}
            $inputMessage.val('');
            addMsj(data,'me');
            // tell server to execute 'new message' and send along one parameter
            socket.emit('newMessage', data)
        }
    }

    socket.on('newMessage' , function (data) {
        $(document).attr("title", data.username+" dice");
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
        console.log("lo vio");
    })

    function addMsj(data,_from) {
        if(_from=='me'){
            $messages.append('<div class="row msg_container base_sent"><div class="col-md-10 col-xs-10"><div class="messages msg_sent"><p>'
                +data.message+
            '</p></div></div></div>')
        }else{
            $messages.append('<div class="row msg_container base_recive"><div class="col-md-10 col-xs-10"><div class="messages msg_recive"><p>'
                +data.message+
            '</p><informacion>'+data.username+'</informacion></div></div></div>')
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    }
})
