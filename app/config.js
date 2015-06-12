var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
  console.log('connection opened to mongodb');
});


module.exports = mongoose;
