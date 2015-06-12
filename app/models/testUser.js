var Link = require('./link.js');
console.log('in testLink.js');
var link = new Link({
  url: 'http://www.espn.com',
  title: 'espn',
  base_url: 'http://12.2.12.12'
});

link.save(function (err, link) {
  if (err) console.error(err);
  console.log('saved', link);

  Link.find({}, function(err, link){
    console.log(link);
  });

});

