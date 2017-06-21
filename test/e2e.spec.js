// Licensed under the Apache License. See footer for details.
/* global require, describe, it, before */
const supertest = require('supertest');
const assert = require('chai').assert;
const testutil = require('./util');

describe('End to end', () => {
  let user1Api;
  const user1Username = `user1-${new Date().getTime()}@acme.com`;
  const user1Password = '123';

  let user2Api;
  const user2Username = `user2-${new Date().getTime()}@acme.com`;
  const user2Password = '456';

  let org1Api;
  const org1Username = `org1-${new Date().getTime()}@org1.com`;
  const org1Password = '789';
  const org1Name = `org1-${new Date().getTime()}`;

  let marketChallenges;

  let app;
  let apiAnon;

  let org1Challenge1 = {
    title: 'Bike To Work',
    image: 'bike.svg',
    start: '2017-03-31T22:00:00.000Z',
    end: '2017-05-30T22:00:00.000Z',
    goal: 1,
    unit: 'workout',
    activity: 'CYCLING',
    description: 'Earn a water bottle for 10 bike commutes to work',
    rewards: 100
  };

  let org1Challenge2 = {
    title: 'Fit For Work',
    image: 'skip.svg',
    start: '2016-12-31T23:00:00.000Z',
    end: '2017-12-30T23:00:00.000Z',
    goal: 30,
    unit: 'workout',
    activity: 'ANY',
    description: '$100 health insurance credit for 30 workouts a year',
    rewards: 200
  };

  let user1WorkoutForOrg1Challenge1;

  before((done) => {
    require('../server')((err, readyApp) => {
      app = readyApp;
      apiAnon = supertest(app);

      user1Api = supertest.agent(app);
      user2Api = supertest.agent(app);
      org1Api = supertest.agent(app);

      done();
    });
  });

  it('creates user1', (done) => {
    testutil.User.addUser(user1Api, user1Username, user1Password).then(done).catch(done);
  });

  it('creates user2', (done) => {
    testutil.User.addUser(user2Api, user2Username, user2Password).then(done).catch(done);
  });

  it('creates orgUser1 in org1', (done) => {
    testutil.User.addUser(org1Api, org1Username, org1Password, org1Name).then(done).catch(done);
  });

  it('captures the existing market', (done) => {
    testutil.Market.getMarket(org1Api)
      .then((market) => {
        marketChallenges = market;
      })
      .then(done)
      .catch(done);
  });

  it('creates org1Challenge1 in org1', (done) => {
    testutil.Organization.addChallenge(org1Api, org1Challenge1)
      .then((addedChallenge) => {
        org1Challenge1 = addedChallenge;
      })
      .then(done)
      .catch(done);
  });

  it('creates org1Challenge2 in org1', (done) => {
    testutil.Organization.addChallenge(org1Api, org1Challenge2)
      .then((addedChallenge) => {
        org1Challenge2 = addedChallenge;
      })
      .then(done)
      .catch(done);
  });

  it('confirms the challenges were created', (done) => {
    testutil.Market.getMarket(org1Api)
      .then((market) => {
        assert.equal(marketChallenges.length + 2, market.length);
        marketChallenges = market;
      })
      .then(done)
      .catch(done);
  });

  it('finds no challenge for user1', (done) => {
    testutil.User.getChallenges(user1Api)
      .then((challenges) => {
        assert.equal(0, challenges.length);
      })
      .then(done)
      .catch(done);
  });

  it('subscribes user1 to org1Challenge1', (done) => {
    testutil.User.subscribeToChallenge(user1Api, org1Challenge1._id)
      .then(done)
      .catch(done);
  });

  it('finds one challenge for user1', (done) => {
    testutil.User.getChallenges(user1Api)
      .then((challenges) => {
        assert.equal(1, challenges.length);
        assert.equal(org1Challenge1._id, challenges[0].challengeId);
        assert.equal(0, challenges[0].logged);
      })
      .then(done)
      .catch(done);
  });

  it('confirms one user has subscribed to org1Challenge1', (done) => {
    testutil.Organization.getChallengeSummary(org1Api, org1Challenge1._id)
      .then((summary) => {
        assert.equal(1, summary.participants);
        assert.equal(1, summary.rewards.reserved);
        assert.equal(0, summary.rewards.granted);
        assert.equal(99, summary.rewards.remaining);
        assert.equal(100, summary.rewards.total);
      })
      .then(done)
      .catch(done);
  });

  it('subscribes user2 to org1Challenge1', (done) => {
    testutil.User.subscribeToChallenge(user2Api, org1Challenge1._id)
      .then(done)
      .catch(done);
  });

  it('confirms two users have subscribed to org1Challenge1', (done) => {
    testutil.Organization.getChallengeSummary(org1Api, org1Challenge1._id)
      .then((summary) => {
        assert.equal(2, summary.participants);
        assert.equal(2, summary.rewards.reserved);
        assert.equal(0, summary.rewards.granted);
        assert.equal(98, summary.rewards.remaining);
        assert.equal(100, summary.rewards.total);
      })
      .then(done)
      .catch(done);
  });

  it('logs workout for user1 against org1Challenge1', (done) => {
    testutil.User.logWorkout(user1Api, {
      challengeId: org1Challenge1._id,
      date: '2017-03-31T10:00:00.000Z',
      start: '2017-03-31T10:00:00.000Z',
      end: '2017-03-31T12:00:00.000Z',
      calories: 500,
      distance: 14,
      pace: 8.5,
      heart: 65,
      activity: 'CYCLING',
      image: 'bike.svg'
    })
    .then((workout) => {
      user1WorkoutForOrg1Challenge1 = workout;
    })
    .then(done)
    .catch(done);
  });

  it('confirms one user has logged a workout to org1Challenge1', (done) => {
    testutil.Organization.getChallengeSummary(org1Api, org1Challenge1._id)
      .then((summary) => {
        assert.equal(2, summary.participants);
        assert.equal(1, summary.workouts);
        assert.equal(1, summary.rewards.reserved);
        assert.equal(1, summary.rewards.granted);
        assert.equal(98, summary.rewards.remaining);
        assert.equal(100, summary.rewards.total);
      })
      .then(done)
      .catch(done);
  });

  it('confirms user1 has one workout in his account', (done) => {
    testutil.User.getWorkouts(user1Api)
      .then((workouts) => {
        assert.equal(1, workouts.length);
      })
      .then(done)
      .catch(done);
  });

  it('can get workout summary for user1', (done) => {
    testutil.User.getChallengeSummary(user1Api)
      .then((summary) => {
        console.log(summary);
        assert.equal(1, summary.challenges);
        assert.equal(2, summary.hours);
        assert.equal(500, summary.calories);
      })
      .then(done)
      .catch(done);
  });

  it('can get challenge summary for user1', (done) => {
    testutil.User.getChallenges(user1Api)
      .then((challenges) => {
        assert.equal(1, challenges.length);
        assert.equal(org1Challenge1._id, challenges[0].challengeId);
        assert.equal(1, challenges[0].logged);
      })
      .then(done)
      .catch(done);
  });

  it('can update a user1 workout', (done) => {
    user1WorkoutForOrg1Challenge1.calories = 1500;
    user1Api.put(`/api/account/workouts/${user1WorkoutForOrg1Challenge1._id}`)
      .send(user1WorkoutForOrg1Challenge1)
      .expect(200)
      .end((err, res) => {
        user1WorkoutForOrg1Challenge1 = res.body;
        done(err);
      });
  });

  it('confirms user2 has no workouts', (done) => {
    testutil.User.getWorkouts(user2Api)
      .then((workouts) => {
        assert.equal(0, workouts.length);
      })
      .then(done)
      .catch(done);
  });

  it('can delete user1 workout', (done) => {
    testutil.User.deleteWorkout(user1Api, user1WorkoutForOrg1Challenge1)
      .then(done)
      .catch(done);
  });

  it('confirms user1 has no more workout in his account', (done) => {
    testutil.User.getWorkouts(user1Api)
      .then((workouts) => {
        assert.equal(0, workouts.length);
      })
      .then(done)
      .catch(done);
  });

  it('can not retrieve workouts if not logged in', (done) => {
    apiAnon.get('/api/account/workouts')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});
