var User = require('./user.js');
console.log('in testUser.js');
var aUser = new User({
    username: 'fred',
    password: 'lolzzy!'
  });

aUser.save(function (err, user) {
  if (err) console.error(err);
  console.log('saved', user);

  User.find({ username: 'fred' }, function(err, user){
    console.log(user);
  });

});
