// Licensed under the Apache License. See footer for details.
const express = require('express');
const path = require('path');
const async = require('async');

const router = express.Router();
const dba = 'challenges';
const marketDbName = 'market';
const workoutsDbName = 'workouts';
let Challenges;
let Market;
let Workouts;

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ message: 'You need to be authenticated' });
  }
}

router.get('/', checkAuthenticated, (req, res) => {
  console.log(`Retrieving accepted challenges for ${req.user._id}`);

  let userChallenges;

  async.waterfall([
    // retrieve accepted challenges
    (callback) => {
      Challenges.find({
        selector: {
          accountId: req.user._id
        }
      }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          userChallenges = result.docs;
          callback();
        }
      });
    },
    // augment with market data
    (callback) => {
      Market.list({ include_docs: true }, (marketErr, marketResult) => {
        if (marketErr) {
          callback(marketErr);
          return;
        }

        // copy attributes from the market
        const market = marketResult.rows.map(row => row.doc);
        userChallenges.forEach((userChallenge) => {
          const marketChallenge =
            market.find(mc => mc._id === userChallenge.challengeId);
          ['image', 'start', 'end', 'title', 'goal'].forEach((key) => {
            userChallenge[key] = marketChallenge[key];
          });
        });

        callback();
      });
    },
    // retrieve workouts
    (callback) => {
      Workouts.find({
        selector: {
          accountId: req.user._id
        }
      }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          // compute the LOGGED value for each challenge
          const workouts = result.docs;
          userChallenges.forEach((userChallenge) => {
            userChallenge.logged =
              workouts.filter(workout => workout.challengeId === userChallenge.challengeId).length;
          });
          callback();
        }
      });
    },
  ], (err) => {
    if (err) {
      res.status(500).send({ ok: false });
    } else {
      res.send(userChallenges);
    }
  });
});

router.post('/accept/:marketChallengeId', checkAuthenticated, (req, res) => {
  console.log(`Accepting challenge for ${req.user._id}:`, req.params.marketChallengeId);
  const userChallenge = {
    accountId: req.user._id,
    challengeId: req.params.marketChallengeId
  };
  Challenges.insert(userChallenge, (err, result) => {
    if (err) {
      res.status(500).send({ ok: false });
    } else {
      userChallenge._id = result.id;
      userChallenge._rev = result.rev;
      res.status(201).send(userChallenge);
    }
  });
});

router.get('/summary', checkAuthenticated, (req, res) => {
  const summary = {
    challenges: -1,
    workouts: -1,
    rewards: -1,
    hours: -1,
    calories: -1
  };

  async.waterfall([
    // get the challenges the user has subscribed to
    (callback) => {
      Challenges.find({
        selector: {
          accountId: req.user._id
        }
      }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          summary.challenges = result.docs.length;
          callback(null, result.docs);
        }
      });
    },
    // augment with market data
    (userChallenges, callback) => {
      Market.list({ include_docs: true }, (marketErr, marketResult) => {
        if (marketErr) {
          callback(marketErr);
          return;
        }

        // copy attributes from the market
        const market = marketResult.rows.map(row => row.doc);
        userChallenges.forEach((userChallenge) => {
          const marketChallenge =
            market.find(mc => mc._id === userChallenge.challengeId);
          ['image', 'start', 'end', 'title', 'goal', 'activity'].forEach((key) => {
            userChallenge[key] = marketChallenge[key];
          });
        });

        callback(null, userChallenges);
      });
    },
    // get the user workouts
    (userChallenges, callback) => {
      Workouts.find({
        selector: {
          accountId: req.user._id
        }
      }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          const workouts = result.docs;
          summary.workouts = workouts.length;
          summary.calories = workouts.map(workout => workout.calories)
            .reduce((previous, current) => previous + current, 0);
          let duration = 0;
          workouts.forEach((workout) => {
            if (workout.start && workout.end) {
              duration += (Date.parse(workout.end) - Date.parse(workout.start));
            }
          });
          summary.hours = (duration / 1000 / 60 / 60).toFixed(1);

          let rewards = 0;
          userChallenges.forEach((userChallenge) => {
            // for each challenge, count the workouts
            const count = workouts.filter(workout =>
              workout.challengeId === userChallenge.challengeId &&
              workout.activity === userChallenge.activity).length;
            if (count >= userChallenge.goal) {
              // goal reached, the user deserves the reward!
              rewards += 1;
            }
          });
          summary.rewards = rewards;

          callback();
        }
      });
    },
  ], (err) => {
    if (err) {
      res.status(500).send({ ok: false });
    } else {
      res.send(summary);
    }
  });
});

module.exports = (appEnv, readyCallback) => {
  const Database = require('../../config/database');
  Workouts = Database(appEnv, workoutsDbName, null, () => {
    Market = Database(appEnv, marketDbName, null, () => {
      Challenges = Database(appEnv, dba,
        path.resolve(`${__dirname}/../../seed/challenges.json`), () => {
          readyCallback(null, router);
        });
    });
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
