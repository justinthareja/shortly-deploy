var db = require('../config');
var crypto = require('crypto');


var linkSchema = db.Schema({
    url: String,
    base_url: String,
    code: String,
    title: String,
    visits: {type: Number, default: 0}
  });

linkSchema.pre('save', function(next) {
  this.createShortURL(next);
});

linkSchema.methods.createShortURL = function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
};

module.exports = db.model('Link', linkSchema);
