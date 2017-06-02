// Licensed under the Apache License. See footer for details.
/* global require, describe, it, before */
const supertest = require('supertest');
const assert = require('chai').assert;

describe('Market', () => {
  const orgUsername = `jim-${new Date().getTime()}@insurance.com`;
  const orgPassword = '456';

  let app;
  let api;
  let apiAnon;

  let marketChallenges;
  const newChallenge = {
    title: 'Bike To Work',
    image: 'bike.svg',
    start: '2017-03-31T22:00:00.000Z',
    end: '2017-05-30T22:00:00.000Z',
    goal: 10,
    unit: 'workout',
    activity: 'CYCLING',
    description: 'Earn a water bottle for 10 bike commutes to work'
  };

  before((done) => {
    require('../server')((err, readyApp) => {
      app = readyApp;
      api = supertest.agent(app); // .agent() persists cookies between calls
      apiAnon = supertest(app);
      done();
    });
  });

  it('can register an account', (done) => {
    api.post('/api/users/signup')
      .send(`email=${orgUsername}`)
      .send(`password=${orgPassword}`)
      .send('organization=insurance.com')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it('can retrieve market challenges', (done) => {
    apiAnon.get('/api/market/challenges')
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

  it('can add a market challenge', (done) => {
    api.post('/api/market/challenges')
      .send(newChallenge)
      .expect(201)
      .end((err, result) => {
        assert(result.body._id != null);
        assert(result.body._rev != null);
        done(err);
      });
  });

  it('can confirm it was added to the list', (done) => {
    apiAnon.get('/api/market/challenges')
      .expect(200)
      .end((err, result) => {
        if (err) {
          done(err);
        } else {
          assert.equal(marketChallenges.length + 1, result.body.length);
          done();
        }
      });
  });
});
