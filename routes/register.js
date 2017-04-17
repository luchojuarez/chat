module.exports = function(io) {
    var passport = require('passport');
    var express = require('express');
    var app = express();
    var router = express.Router();


    router.get('/',function(req, res) {
        res.render('register', {} );
    });
    router.post('/',
        passport.authenticate('register', {failureRedirect: '/err'}),function (req,res) {
            console.log("body parsing", req.body);
            res.redirect('/');
    });


    return router;
};
