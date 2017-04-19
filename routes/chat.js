module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');
    var Message = require('../models/message');

    //this middlewere add to req information about geolocalization
    var noAlreadyLogged = require('../setups/middlewere').noAlreadyLogged;

    router.get('/',
        noAlreadyLogged,//if not logged go to
        function(req, res) {
            Message.find().exec(function (err,messages) {
                if(err) return console.error(err);
                res.render("chat",{
                    user:req.user,
                    messages:messages
                })
            })
    });

    io.on('connection',function (socket) {

        socket.on('newMessage',function (data) {
            Message.create({
                text:data.message,
                from:{
                    username:data.user.username,
                    referencia:data.user
                },
                date:data.date
            },function (err, mensaje) {
                if (err) return console.error(err);
                //en broadcast para que les llegue a todos
                socket.broadcast.emit('newMessage',data)
            });
        })

    })

    return router;
};
