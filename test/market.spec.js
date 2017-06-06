// Licensed under the Apache License. See footer for details.
/* global require, describe, it, before */
const supertest = require('supertest');
const assert = require('chai').assert;

describe('Market', () => {
  const orgUsername = `jim-${new Date().getTime()}@insurance.com`;
  const orgPassword = '456';
  const anotherOrgUsername = `jane-${new Date().getTime()}@cloud.com`;
  const anotherOrgPassword = '456';

  let app;
  let api;
  let anotherOrgApi;
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
  let addedChallenge;

  before((done) => {
    require('../server')((err, readyApp) => {
      app = readyApp;
      api = supertest.agent(app); // .agent() persists cookies between calls
      anotherOrgApi = supertest.agent(app); // .agent() persists cookies between calls
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

  it('can register another account', (done) => {
    anotherOrgApi.post('/api/users/signup')
      .send(`email=${anotherOrgUsername}`)
      .send(`password=${anotherOrgPassword}`)
      .send('organization=cloud.com')
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
        addedChallenge = result.body;
        assert(addedChallenge._id != null);
        assert(addedChallenge._rev != null);
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

  it('can not update a challenge she does not own', (done) => {
    anotherOrgApi.put(`/api/market/challenges/${addedChallenge._id}`)
      .send(addedChallenge)
      .expect(401)
      .end((err) => {
        done(err);
      });
  });

  it('can not delete a challenge she does not own', (done) => {
    anotherOrgApi.delete(`/api/market/challenges/${addedChallenge._id}`)
      .send(addedChallenge)
      .expect(401)
      .end((err) => {
        done(err);
      });
  });

  it('can update a challenge he owns', (done) => {
    addedChallenge.goal = 15;
    api.put(`/api/market/challenges/${addedChallenge._id}`)
      .send(addedChallenge)
      .expect(200)
      .end((err, result) => {
        assert.equal(15, result.body.goal);
        assert.notEqual(addedChallenge._rev, result.body._rev);
        addedChallenge = result.body;
        done(err);
      });
  });

  it('can delete a challenge he owns', (done) => {
    api.delete(`/api/market/challenges/${addedChallenge._id}`)
      .send(addedChallenge)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });
});
