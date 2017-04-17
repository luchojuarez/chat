module.exports = function(io,passportSocketIo) {
    var express = require('express');
    var router = express.Router();
    /* GET home page. */

    router.get('/', function(req, res) {
        //console.log("user conected from: ",req.headers['user-agent']);
        console.log("----------------------------------------------user: ", req.user);
        res.render("index")
    });

    router.post('/',function (req,res) {
        res.render('index',{
            nombre:req.body.nombre
        })
    });

    io.on('connection',function (socket) {
        /*io.set('authorization', function (data, callback) {
            if(data.headers.cookie) {
                // save parsedSessionId to handshakeData
                data.cookie = cookie.parse(data.headers.cookie);
                data.sessionId = parseSignedCookie(data.cookie['connect.sid'], 'totallysecret');
            }
            callback(null, true);
        });*/

        socket.on('newMessage',function (data) {
            //en broadcast para que les llegue a todos
            console.log("broadcast andando",data);
            socket.broadcast.emit('newMessage',data)
        })

    })

    return router;
};
