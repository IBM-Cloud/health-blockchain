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

  it('can register an account', (done) => {
    api.post('/signup')
      .send(`email=${username}`)
      .send(`password=${password}`)
      .expect(302)
      .end((err) => {
        done(err);
      });
  });

  it('can register another account', (done) => {
    apiAnotherUser.post('/signup')
      .send(`email=${anotherUsername}`)
      .send(`password=${anotherPassword}`)
      .expect(302)
      .end((err) => {
        done(err);
      });
  });

  it('can retrieve workouts for a registered account', (done) => {
    api.get('/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(0, res.body.length);
        done(err);
      });
  });

  it('can save a workout', (done) => {
    api.post('/workouts')
      .send(workout)
      .expect(201)
      .end((err, res) => {
        workout = res.body;
        done(err);
      });
  });

  it('can retrieve created workouts', (done) => {
    api.get('/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(1, res.body.length);
        assert.equal('bike', res.body[0].activity);
        assert.equal(0, res.body[0].calories);
        done(err);
      });
  });

  it('can not see John workouts', (done) => {
    apiAnotherUser.get('/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(0, res.body.length);
        done(err);
      });
  });

  it('can update a workout', (done) => {
    workout.calories = 500;
    api.put(`/workouts/${workout._id}`)
      .send(workout)
      .expect(200)
      .end((err, res) => {
        workout = res.body;
        done(err);
      });
  });

  it('can delete a workout', (done) => {
    api.delete(`/workouts/${workout._id}`)
      .send(workout)
      .expect(201)
      .end((err) => {
        done(err);
      });
  });

  it('can have no workouts', (done) => {
    api.get('/workouts')
      .expect(200)
      .end((err, res) => {
        assert.equal(0, res.body.length);
        done(err);
      });
  });

  it('can not retrieve workouts if not logged in', (done) => {
    apiAnon.get('/workouts')
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});
