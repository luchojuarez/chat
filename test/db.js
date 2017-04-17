var utils = require('./utils');
var expect = require("chai").expect;
var userModel = require("../models/user");

var User = userModel.user

describe('Persistence in the database', function(){
    var user;
    beforeEach(function(){
        user=new User()
    });



    it('load user',function (done) {
        var userId;
        user.save(function (err,savedUser) {
            if(err) done(err)

            var savedUserId = savedUser._id;
            User.load(userId,function (err,loaded) {
                if (err) done(err);
                expect(savedUserId).to.be.eq(userId)
            })
        })
    })

})
