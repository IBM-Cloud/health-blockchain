// Licensed under the Apache License. See footer for details.
const express = require('express');

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
router.get('/challenges', (req, res) => {
  res.sendFile(`${__dirname}/json/market-get-challenges.json`);
  // TO BE ENABLED when we can create organizations and sign in
  // console.log('Retrieving market challenges');
  // Database.list((err, result) => {
  //   if (err) {
  //     res.status(500).send({ ok: false });
  //   } else {
  //     console.log('Retrieved', result);
  //     res.send(result.docs);
  //   }
  // });
});

// | POST   | /api/market/challenges | allows an organization to submit a new challenge to the market
// requires authentication
// user must be an organization
router.post('/challenges', checkAuthenticated, (req, res) => {
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

// | PUT   | /api/market/challenges | allows an organization to update its challenge
// requires authentication
// user must be an organization
// challenge must be owned by user
router.put('/challenges/:id', checkAuthenticated, (req, res) => {
  console.log(`Updating challenge for ${req.user._id} / ${req.user.organization}:`, req.body);
  const challenge = req.body;
  if (challenge.organization !== req.user.organization) {
    res.status(401).send({ message: 'Wrong organization' });
  } else if (!challenge._id || !challenge._rev) {
    res.status(500).send({ message: 'Missing _id or _rev' });
  } else {
    challenge.updated_at = new Date();
    Database.insert(challenge, (err, result) => {
      if (err) {
        res.status(500).send({ ok: false });
      } else {
        challenge._rev = result.rev;
        res.status(200).send(challenge);
      }
    });
  }
});

// | DELETE | /api/market/challenges | allows an organization to delete its challenge from the market
// requires authentication
// user must be an organization
// challenge must be owned by user
router.delete('/challenges/:id', checkAuthenticated, (req, res) => {
  console.log(`Removing workout for ${req.user._id} / ${req.user.organization}:`, req.body);
  const challenge = req.body;
  if (challenge.organization !== req.user.organization) {
    res.status(401).send({ message: 'Wrong organization' });
  } else if (!challenge._id || !challenge._rev) {
    res.status(500).send({ message: 'Missing _id or _rev' });
  } else {
    Database.destroy(challenge._id, challenge._rev, (err, result) => {
      if (err) {
        res.status(500).send({ ok: false });
      } else {
        res.status(201).send(result);
      }
    });
  }
});

function initCloudant(appEnv, readyCallback) {
  const cloudantURL = appEnv.services.cloudantNoSQLDB[0].credentials.url || appEnv.getServiceCreds('health-blockchain-db').url;
  const Cloudant = require('cloudant')({ url: cloudantURL, plugin: 'retry', retryAttempts: 10, retryTimeout: 500 });

  // Create the accounts DB if it doesn't exist
  Cloudant.db.create(dba, (err) => {
    if (err) {
      console.log('Database already exists:', dba);
    } else {
      console.log('New database created:', dba);
    }
    readyCallback();
  });
  Database = Cloudant.use(dba);
}

module.exports = (appEnv, readyCallback) => {
  initCloudant(appEnv, () => {
    readyCallback(null, router);
  });
};
