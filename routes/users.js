// Licensed under the Apache License. See footer for details.
const express = require('express');
const passport = require('passport');

const router = express.Router();

// process the signup form
router.post('/signup', (req, res) => {
  passport.authenticate('local-signup', {
    failureFlash: true // allow flash messages
  }, (err, user, info) => {
    if (err) {
      res.status(500).send({ ok: false, outcome: 'failure' });
    } else if (user) {
      req.logIn(user, () => {
        res.send({
          ok: true,
          email: user.email,
          outcome: 'success'
        });
      });
    } else {
      res.status(401).send({ ok: false, message: info.message || info, outcome: 'failure' });
    }
  })(req, res);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.send({ ok: true });
});

router.post('/login', (req, res) => {
  passport.authenticate('local-login', {
    failureFlash: true // allow flash messages
  }, (err, user, info) => {
    if (err) {
      res.status(500).send({ ok: false, outcome: 'failure' });
    } else if (user) {
      req.logIn(user, () => {
        res.send({
          ok: true,
          email: user.email,
          outcome: 'success'
        });
      });
    } else {
      res.status(401).send({ ok: false, message: info.message || info, outcome: 'failure' });
    }
  })(req, res);
});

router.get('/isLoggedIn', (req, res) => {
  const result = {
    outcome: 'failure'
  };

  if (req.isAuthenticated()) {
    result.outcome = 'success';
    result.email = req.user.email;
  }

  res.send(result);
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
