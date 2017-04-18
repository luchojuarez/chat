var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

var Message = new Schema({
    text: String,
    date: { type: Date, default: Date.now },
    from: {type: Schema.ObjectId,ref: 'User'},
    to:   {type: Schema.ObjectId,ref: 'User'},
    read: { type: Date},
});

Message.plugin(passportLocalMongoose);

module.exports = mongoose.model('Message', Message);
