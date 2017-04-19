var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose')

var Message = new Schema({
    text: String,
    date: { type: Date, default: Date.now },
    from: {
        username:String,
        referencia:{type: Schema.ObjectId,ref: 'User'}
    },
    to:   {
        username:String,
        referencia:{type: Schema.ObjectId,ref: 'User'}
    },
    read: { type: Date},
});

Message.plugin(passportLocalMongoose);

module.exports = mongoose.model('Message', Message);

var User = require('./user');

module.exports.parse=function (query) {
    var result=[];
    User.find().
        select('_id username').
        exec(function (err,users) {
            for(m of query){
                var username = buscar(users,m.from)
                result.push({
                    text:m.text,
                    username:username
                })
            }
            return result;
        }
    )
}

//busca en un arreglo de [{_id username}]
function buscar(arreglo,id2) {
    var arr=JSON.parse(JSON.stringify(arreglo));
    var id=JSON.parse(JSON.stringify(id2));
    for(item of arr){
        if(item._id===id)
            return item.username
    }
    return undefined
}
