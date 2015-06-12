var Link = require('./link.js');
var User = require('./user.js');

console.log('in testLink.js');
var aUser = new User({
    username: 'kyle',
    password: 'wineme'
  });

aUser.save(function (err, user) {
  if (err) console.error(err);
  console.log('saved', user);

  User.findOne({username: 'kyle'}, function (err, kyle) {
    console.log(kyle);
  });
});
