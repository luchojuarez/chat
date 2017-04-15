$(function() {
    //areas
    var $loginPage = $('#login')
    var $chatPage  = $('#chat')
    $chatPage.hide();

    var $usernameInput = $('#nombre').focus();

    var $inputMessage = $('#chat_input'); // Input message input box
    var $messages = $('#mensajes'); // Messages area

    var socket = io();

    var username

    function newUser() {
        username=$usernameInput.val();
        if(username){
            $loginPage.fadeOut();
            $chatPage.show();
            $inputMessage.focus();
        }
    }

    function sendMessage () {
        var message = $inputMessage.val();
        var data = {username:username,message:message}
        $inputMessage.val('');
        addMsj(data,'me');
        // tell server to execute 'new message' and send along one parameter
        socket.emit('newMessage', data)
    }

    socket.on('newMessage' , function (data) {
        addMsj(data)
    })

    $(window).keydown(function (event) {
        //si preciono enter
        if (event.which === 13)
            if(username)//si hay un usuario logueado quiere mandar mensaje
                sendMessage();
            else//sino es un logueo
                newUser()
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