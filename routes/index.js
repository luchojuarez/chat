module.exports = function(io,passportSocketIo) {
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');

    //this middlewere add to req information about geolocalization
    var saveGuest = require('../setups/middlewere').saveGuest;
    var ipMiddleware = require('../setups/middlewere').ipMiddleware;
    var alreadyLogged = require('../setups/middlewere').alreadyLogged;

    router.get('/',
        alreadyLogged,// if user is logged redirect
        ipMiddleware,//save ip info in request
        saveGuest,//if a new guest save it
        function(req, res) {
            res.render("index",{user:req.user})
    });

    router.post('/',function (req,res) {
        res.render('index',{
            nombre:req.body.nombre
        })
    });

    io.on('connection',function (socket) {

        socket.on('newMessage',function (data) {
            //en broadcast para que les llegue a todos
            console.log("broadcast andando",data);
            socket.broadcast.emit('newMessage',data)
        })

    })

    return router;
};
