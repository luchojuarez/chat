module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    /* GET home page. */

    router.get('/', function(req, res) {
        res.render('chatRoom',{
            nick:req.nick
        })
    });


    return router;
};
