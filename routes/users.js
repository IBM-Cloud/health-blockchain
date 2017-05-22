var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/signup', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../public/signup.html'));
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signupSuccess', // redirect to the secure profile section
  failureRedirect: '/signupFailure', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.get('/login', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/loginSuccess', // redirect to the secure profile section
  failureRedirect: '/loginFailure', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.get('/loginSuccess', function (req, res) {
  console.log('LOGIN SUCCESS');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    email: req.user.email,
    outcome: 'success'
  }, null, 3));
})

router.get('/loginFailure', function (req, res) {
  console.log('LOGIN FAILURE');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
      outcome: 'failure'
  }, null, 3));
})

router.get('/signupSuccess', function (req, res) {
  console.log(req.user);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    outcome: 'success'
  }, null, 3));
});

router.get('/signupFailure', function (req, res) {
  console.log(req, res);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        outcome: 'failure'
    }, null, 3));
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/isLoggedIn', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var result = {
    outcome: 'failure'
  };

  if (req.isAuthenticated()) {
    result.outcome = 'success';
    result.email = req.user.email;
    result.firstName = req.user.firstName;
    result.lastName = req.user.lastName;
  }

  res.send(JSON.stringify(result, null, 3));
});

router.get('/profile', function (req, res) {
  req.session.lastPage = "/profile";
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '../public/profile.html'));
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
