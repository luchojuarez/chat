module.exports = function(io,passportSocketIo) {
    var express = require('express');
    var router = express.Router();
    /* GET home page. */
    //middleware to get ip in request
    var requestIp = require('request-ip');
    var geoip = require('geoip-lite');
    const ipMiddleware = function(req, res, next) {
        const clientIp = requestIp.getClientIp(req);
        var geo = geoip.lookup(clientIp);
        req.ipGeo={geo:geo,ip:clientIp}
        /*{ range: [ 3200196608, 3200200703 ],
            country: 'AR',
            region: '05',
            city: 'Rio Cuarto',
            ll: [ -32.8417, -64.3 ],
            metro: 0,
            zip: 5800
        }*/
        next();
    };

    router.get('/',ipMiddleware, function(req, res) {
        //console.log("user conected from: ",req.headers['user-agent']);
        console.log(req.ipGeo);
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
