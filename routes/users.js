// Licensed under the Apache License. See footer for details.
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

router.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/signup.html'));
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/signupSuccess', // redirect to the secure profile section
  failureRedirect: '/signupFailure', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/loginSuccess', // redirect to the secure profile section
  failureRedirect: '/loginFailure', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.get('/loginSuccess', (req, res) => {
  console.log('LOGIN SUCCESS');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    email: req.user.email,
    outcome: 'success'
  }, null, 3));
});

router.get('/loginFailure', (req, res) => {
  console.log('LOGIN FAILURE');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    outcome: 'failure'
  }, null, 3));
})

router.get('/signupSuccess', (req, res) => {
  console.log(req.user);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    outcome: 'success'
  }, null, 3));
});

router.get('/signupFailure', (req, res) => {
  console.log(req, res);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    outcome: 'failure'
  }, null, 3));
});

router.get('/isLoggedIn', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const result = {
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

router.get('/profile', (req, res) => {
  req.session.lastPage = '/profile';
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '../public/profile.html'));
  } else {
    res.redirect('/login');
  }
});

module.exports = router;

//------------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
