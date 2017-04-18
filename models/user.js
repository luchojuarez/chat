var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
    username: String,
    password: String,
    friend:{
        user:{type: Schema.ObjectId,ref: 'User'},//amigo
        chat:{type: Schema.ObjectId,ref: 'Chat'}//chat con amigo
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
