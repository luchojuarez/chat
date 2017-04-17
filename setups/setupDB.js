var mongoose = require('mongoose')
var config = require('../config');

function clearDB() {
  for (var i in mongoose.connection.collections) {
    mongoose.connection.collections[i].remove(function() {});
  }
}

if (mongoose.connection.readyState === 0) {
  mongoose.connect(config.db[process.env.NODE_ENV], function (err) {
    if (err) {
      throw err;
    }
    return clearDB();
  });
} else {
  return clearDB();
}
mongoose.connection.once('open', function() {console.log("db open: ",config.db[process.env.NODE_ENV]);});
