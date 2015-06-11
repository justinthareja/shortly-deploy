// var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
console.log('in config.js');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function (callback) {
  console.log('connection opened to mongodb');

});

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// var linkSchema = mongoose.Schema({
//     url: String,
//     base_url: String,
//     code: String,
//     title: String,
//     visits: Number
//   });

//   var userSchema = mongoose.Schema({
//     username: String,
//     password: String
//   });


  // var aUser = new User({
  //   username: 'joe',
  //   password: 'lolzz'
  // });

  // aUser.save(function (err, user) {
  //   if (err) console.error(err);
  //   console.log('saved', user);

  //   User.find({ username: 'joe' }, function(err, user){
  //     console.log(user)
  //   });

  // });

// exports.userSchema = userSchema;
// exports.linkSchema = linkSchema;

module.exports = mongoose;
