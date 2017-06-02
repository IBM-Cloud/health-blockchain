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
  let api;
  let apiAnotherUser;
  let apiAnon;
  let workout = {
    activity: 'bike',
    calories: 0,
    start: new Date(),
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

  it('can check if it is logged', (done) => {
    api.get('/api/users/isLoggedIn')
      .expect(200)
      .end((err, result) => {
        assert.equal('failure', result.body.outcome);
        done(err);
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

  it('can ensure if it is logged', (done) => {
    api.get('/api/users/isLoggedIn')
      .expect(200)
      .end((err, result) => {
        assert.equal('success', result.body.outcome);
        assert.equal(username, result.body.email);
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
        assert.equal('bike', res.body[0].activity);
        assert.equal(0, res.body[0].calories);
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

  it('can update a workout', (done) => {
    workout.calories = 500;
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
