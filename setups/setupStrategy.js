var passport    = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../models/user');

/*
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.use('register',new LocalStrategy({passReqToCallback : true},
    function(req,username, password, done) {
        console.log("/////////////////////////////////////////---------------------to bien");
        User.findOne({'username':username},function(err, user) {
            // In case of any error return
            if (err)return done(err);
            //ya existe
            if (user) {
                console.log('User already exists');
                return done(null, false,req.flash('message','User Already Exists'));
            } else {
                var newUser = new User();
                newUser.username = username;
                newUser.password = createHash(password);
                // save the user
                newUser.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);
                        throw err;
                    }
                    console.log('User Registration succesful');
                    return done(null, newUser);
                });
            }
        });
    }
))

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

passport.use('login',new LocalStrategy({passReqToCallback : true},
    function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username },function(err, user) {
        // In case of any error, return using the done method
        if (err)return done(err);
        // Username does not exist, log error & redirect back
        if (!user)return done(null, false,req.flash('message', 'User Not found.'));
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)){
            console.error('Invalid Password');
            return done(null, false,req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
        }
    );
}));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) { return cb(err); }
        done(err, user);
    });
});
*/



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
