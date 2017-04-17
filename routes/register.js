module.exports = function(io) {
    var passport = require('passport');
    var express = require('express');
    var app = express();
    var router = express.Router();
    var User = require('../models/user')

    router.get('/',function(req, res) {
        res.render('register', {} );
    });
    

    router.post('/', function(req, res) {
        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err)
                return res.render("register", {info: "Sorry. That username already exists. Try again."});
            user.save(function (err,savedUser) {
                if(err) return console.error(err);
            })
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });

    return router;
};
