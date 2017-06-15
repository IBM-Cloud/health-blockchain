// Licensed under the Apache License. See footer for details.
const express = require('express');
const path = require('path');

const router = express.Router();
const dba = 'market';
let Database;

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.organization) {
    next();
  } else {
    res.status(401).send({ message: 'You need to be authenticated and part of an organization' });
  }
}

// | GET    | /api/market/challenges | view available challenges
router.get('/market/challenges', (req, res) => {
  console.log('Retrieving market challenges');
  Database.list({ include_docs: true }, (err, result) => {
    if (err) {
      res.status(500).send({ ok: false });
    } else {
      res.send(result.rows.map(row => row.doc));
    }
  });
});

// | GET    | /api/organization/challenges | view challenges owned by the current organization
router.get('/organization/challenges', checkAuthenticated, (req, res) => {
  console.log(`Retrieving organization challenges for ${req.user._id} / ${req.user.organization}`);
  Database.find({
    selector: {
      organization: req.user.organization
    }
  }, (err, result) => {
    if (err) {
      res.status(500).send({ ok: false });
    } else {
      console.log('Retrieved', result);
      res.send(result.docs);
    }
  });
});

// | POST   | /api/organization/challenges | allows an organization to submit a new challenge to the market
// requires authentication
// user must be an organization
router.post('/organization/challenges', checkAuthenticated, (req, res) => {
  console.log(`Storing new challenge for ${req.user._id} / ${req.user.organization}:`, req.body);
  const challenge = req.body;
  // sanity check
  delete challenge._id;
  delete challenge._rev;
  // assign this workout to the current user
  challenge.organization = req.user.organization;
  Database.insert(challenge, (err, result) => {
    if (err) {
      res.status(500).send({ ok: false });
    } else {
      challenge._id = result.id;
      challenge._rev = result.rev;
      res.status(201).send(challenge);
    }
  });
});

// | PUT   | /api/organization/challenges | allows an organization to update its challenge
// requires authentication
// user must be an organization
// challenge must be owned by user
router.put('/organization/challenges/:id', checkAuthenticated, (req, res) => {
  console.log(`Updating challenge for ${req.user._id} / ${req.user.organization}:`, req.body);
  const challenge = req.body;
  if (!challenge._id || !challenge._rev) {
    res.status(500).send({ message: 'Missing _id or _rev' });
  } else {
    Database.get(challenge._id, (err, existing) => {
      if (err) {
        console.log(err);
        res.status(500).send({ ok: false });
      } else if (existing.organization !== req.user.organization) {
        res.status(401).send({ ok: false, message: 'Not owner' });
      } else {
        challenge.updated_at = new Date();
        Database.insert(challenge, (insertErr, updated) => {
          if (insertErr) {
            console.log(err);
            res.status(500).send({ ok: false });
          } else {
            challenge._rev = updated.rev;
            res.status(200).send(challenge);
          }
        });
      }
    });
  }
});

// | DELETE | /api/organization/challenges | allows an organization to delete its challenge from the market
// requires authentication
// user must be an organization
// challenge must be owned by user
router.delete('/organization/challenges/:id', checkAuthenticated, (req, res) => {
  console.log(`Removing workout for ${req.user._id} / ${req.user.organization}:`, req.body);
  const challenge = req.body;
  if (!challenge._id || !challenge._rev) {
    res.status(500).send({ message: 'Missing _id or _rev' });
  } else {
    Database.get(challenge._id, (err, existing) => {
      if (err) {
        console.log(err);
        res.status(500).send({ ok: false });
      } else if (existing.organization !== req.user.organization) {
        res.status(401).send({ ok: false, message: 'Not owner' });
      } else {
        Database.destroy(challenge._id, challenge._rev, (deleteErr, result) => {
          if (deleteErr) {
            res.status(500).send({ ok: false });
          } else {
            res.status(200).send(result);
          }
        });
      }
    });
  }
});

module.exports = (appEnv, readyCallback) => {
  Database = require('../config/database')(appEnv, dba,
    path.resolve(`${__dirname}/../seed/market.json`), () => {
      readyCallback(null, router);
    });
};


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
