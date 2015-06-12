var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');


exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find({}, function (err, links) {
    if(err) console.error('Error in fetching links');
    res.send(200, links);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findOne({url : uri}, function(err,link) {
    if (link) {
      res.send(200, link);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        link.save(function(err,newLink) {
          if (err) console.error('error in saving new link')
          res.send(200, newLink);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function (err, user) {
    if (err) console.error('Error finding username');
    console.log("user: ",user)
    if (!user) {
      res.redirect('/login');
    } else {
      console.log('user found');
      user.comparePassword(password, function(err, match) {
        console.log('user matches = ', match);
        if (match) {
          console.log('user matches');
          util.createSession(req, res, user);
        } else {
          console.log('user doesnt match bounce to login');
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username:username}, function(err,user) {
    if (err) console.error('error finding user in signup');
    if (!user) {
      var newUser = new User({
        username: username,
        password: password
      });
      newUser.save(function(err,user) {
        util.createSession(req,res,user);
      });
    } else {
      console.log('Account already exists');
      res.redirect('/signup');
    }
  });

};

exports.navToLink = function(req, res) {
  Link.findOne({ code: req.params[0] }, function(err, link) {
    if (err) console.error('Error navigating to Link')
    if (!link) {
      res.redirect('/');
    } else {
      link.visits +=1;
      link.save(function (err, link) {
        if (err) console.error('Error re-saving link after updating visits');
        return res.redirect(link.url);
      });
    }
  });
};
