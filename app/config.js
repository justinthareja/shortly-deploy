var path = require('path');
var mongoose = require('mongoose');

var connections = {
  production : 'mongodb://MongoLab-y:D4Kati_sA9YTIsGhnRe5CDIvjHNMfbg9NwAg9mMn0Lw-@ds036698.mongolab.com:36698/MongoLab-y',
  development : 'mongodb://localhost/test'
};

var environment = process.env.NODE_ENV || 'development';

mongoose.connect(connections[environment]);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {

  console.log('connection opened to mongodb');
});


module.exports = mongoose;
