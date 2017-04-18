var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
    username: String,
    password: String,
    friend:{
        user:{type: Schema.ObjectId,ref: 'User'},//amigo
        chat:{type: Schema.ObjectId,ref: 'Chat'}//chat con amigo
    },
    ipGeo: {
        geo: {
            range:{type: Array},
            country: String,
            region: String,
            city: String,
            ll: {type: Array},
            metro: Number,
            zip: Number
        },
        ip: String
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
