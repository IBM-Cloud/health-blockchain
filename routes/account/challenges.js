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
  Challenges.find({
    selector: {
      accountId: req.user._id
    }
  }, (err, result) => {
    if (err) {
      res.status(500).send({ ok: false });
    } else {
      console.log('Retrieved', result);
      const userChallenges = result.docs;

      // retrieve the challenge details and build a consolidated view
      Market.list({ include_docs: true }, (marketErr, marketResult) => {
        const market = marketResult.rows.map(row => row.doc);

        // copy attributes from the market
        userChallenges.forEach((userChallenge) => {
          const marketChallenge =
            market.find(mc => mc._id === userChallenge.challengeId);
          ['image', 'start', 'end', 'title', 'goal'].forEach((key) => {
            userChallenge[key] = marketChallenge[key];
          });
        });

        res.send(userChallenges);
      });
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

router.get('/summary', (req, res) => {
  const summary = {
    challenges: -1,
    workouts: -1,
    rewards: -1,
    hours: -1,
    calories: -1
  };

  // {
  //    "rewards": 2,
  // }
  async.waterfall([
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
          callback();
        }
      });
    },
    (callback) => {
      Workouts.find({
        selector: {
          accountId: req.user._id
        }
      }, (err, result) => {
        if (err) {
          callback(err);
        } else {
          summary.workouts = result.docs.length;
          summary.calories = result.docs.map(workout => workout.calories)
            .reduce((previous, current) => previous + current, 0);
          let duration = 0;
          result.docs.forEach((workout) => {
            if (workout.start && workout.end) {
              duration += (Date.parse(workout.end) - Date.parse(workout.start));
            }
          });
          summary.hours = (duration / 1000 / 60 / 60).toFixed(1);
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
