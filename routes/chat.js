module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user');

    //this middlewere add to req information about geolocalization
    var noAlreadyLogged = require('../setups/middlewere').noAlreadyLogged;

    router.get('/',
        noAlreadyLogged,//if not logged go to
        function(req, res) {
            res.render("chat",{user:req.user})
    });

    return router;
};
