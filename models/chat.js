var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

var Chat = new Schema({
    messages:{type: Array , default: []}
});

Chat.plugin(passportLocalMongoose);

module.exports = mongoose.model('Chat', Chat);
