var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = db.Schema({
  username: String,
  password: String
});

// console.log('in user.js');
userSchema.methods.talk = function() {
    console.log('my name is:',this.username);
};

userSchema.methods.hashPassword = function(callback){
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      callback();
    });
};

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.pre('save', function(next) {
  this.hashPassword(next);
});

module.exports = db.model('User', userSchema);
