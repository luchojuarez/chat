module.exports = function(io,passportSocketIo) {
    var express = require('express');
    var router = express.Router();

    //this middlewere add to req information about geolocalization
    var saveGuest = require('../setups/middlewere').saveGuest;
    var ipMiddleware = require('../setups/middlewere').ipMiddleware;

    router.get('/',
        ipMiddleware,//save ip info in request
        saveGuest,//if a new guest save it
        function(req, res) {
        //console.log("user conected from: ",req.headers['user-agent']);
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
