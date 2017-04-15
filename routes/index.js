module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    /* GET home page. */

    router.get('/', function(req, res) {
        res.render("index")
    });

    router.post('/',function (req,res) {
        console.log("user conected from: ",req.headers['user-agent']);
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