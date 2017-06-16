// Licensed under the Apache License. See footer for details.
/* global require, describe, it, before */
const supertest = require('supertest');
const assert = require('chai').assert;

describe('End to end', () => {
  const username = `john-${new Date().getTime()}@acme.com`;
  const password = '123';
  const anotherUsername = `jane-${new Date().getTime()}@acme.com`;
  const anotherPassword = '456';

  let app;
  let marketChallenges;
  let api;
  let apiAnotherUser;
  let apiAnon;
  let workout = {
    challengeId: 'bikeToWork',
    date: '2017-03-31T10:00:00.000Z',
    start: '2017-03-31T10:00:00.000Z',
    end: '2017-03-31T12:00:00.000Z',
    calories: 500,
    distance: 14,
    pace: 8.5,
    heart: 65,
    activity: 'CYCLING',
    image: 'bike.svg'
  };

  before((done) => {
    require('../server')((err, readyApp) => {
      app = readyApp;
      api = supertest.agent(app); // .agent() persists cookies between calls
      apiAnotherUser = supertest.agent(app);
      apiAnon = supertest(app);
      done();
    });
  });

  it('can register an account', (done) => {
    api.post('/api/users/signup')
      .send(`email=${username}`)
      .send(`password=${password}`)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it('can register another account', (done) => {
    apiAnotherUser.post('/api/users/signup')
      .send(`email=${anotherUsername}`)
      .send(`password=${anotherPassword}`)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it('can retrieve market challenges', (done) => {
    api.get('/api/market/challenges')
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          assert(result.body.length > 0);
          marketChallenges = result.body;
          done();
        }
      });
  });

  it('has no challenge at first', (done) => {
    api.get('/api/account/challenges')
      .expect(200)
      .end((err, result) => {
        assert.equal(0, result.body.length);
        done(err);
      });
  });

  it('can subscribe to a market challenge', (done) => {
    api.post(`/api/account/challenges/accept/${marketChallenges[0]._id}`)
      .expect(201)
      .end((err, result) => {
        assert.equal(marketChallenges[0]._id, result.body.challengeId);
        done(err);
      });
  });

  it('has one challenge now', (done) => {
    api.get('/api/account/challenges')
      .expect(200)
      .end((err, result) => {
        assert.equal(1, result.body.length);
        assert.equal(marketChallenges[0]._id, result.body[0].challengeId);
        done(err);
      });
  });

  it('can retrieve workouts for a registered account', (done) => {
    api.get('/api/account/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(0, res.body.length);
        done(err);
      });
  });

  it('can save a workout', (done) => {
    api.post('/api/account/workouts')
      .send(workout)
      .expect(201)
      .end((err, res) => {
        workout = res.body;
        done(err);
      });
  });

  it('can retrieve created workouts', (done) => {
    api.get('/api/account/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(1, res.body.length);
        assert.equal('CYCLING', res.body[0].activity);
        assert.equal(500, res.body[0].calories);
        done(err);
      });
  });

  it('can not see John workouts', (done) => {
    apiAnotherUser.get('/api/account/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(0, res.body.length);
        done(err);
      });
  });

  it('can get workout summary', (done) => {
    api.get('/api/account/challenges/summary')
      .expect(200)
      .end((err, result) => {
        console.log(result.body);
        assert.equal(1, result.body.challenges);
        assert.equal(2, result.body.hours);
        assert.equal(500, result.body.calories);
        done(err);
      });
  });

  it('can update a workout', (done) => {
    workout.calories = 1500;
    api.put(`/api/account/workouts/${workout._id}`)
      .send(workout)
      .expect(200)
      .end((err, res) => {
        workout = res.body;
        done(err);
      });
  });

  it('can delete a workout', (done) => {
    api.delete(`/api/account/workouts/${workout._id}`)
      .send(workout)
      .expect(201)
      .end((err) => {
        done(err);
      });
  });

  it('can have no workouts', (done) => {
    api.get('/api/account/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(0, res.body.length);
        done(err);
      });
  });

  it('can not retrieve workouts if not logged in', (done) => {
    apiAnon.get('/api/account/workouts')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});
