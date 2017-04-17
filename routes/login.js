module.exports = function(io) {
    var passport = require('passport');
    var express = require('express');
    var app = express();
    var router = express.Router();
    var mongoose = require('mongoose')

    function alreadyLogged(req, res, next) {
        if (req.user) return res.redirect('/');
        next();
    }

    router.get('/',
        alreadyLogged, //if user are loged goto root
        function(req, res, next) {
        res.render('login', {
            user: req.user
        });
    });

    router.post('/',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/err',
            failureFlash: "Credenciales invalidas, intentelo nuevamente!",
        }));

    return router;
};
