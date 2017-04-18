var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Guest = new Schema({
    geo: {
        range:{type: Array , default: []},
        country: String,
        region: String,
        city: String,
        ll: {type: Array , default: []},
        metro: Number,
        zip: Number
    },
    ip: String
});

module.exports = mongoose.model('Guest', Guest);
