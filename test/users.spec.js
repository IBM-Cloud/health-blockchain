// Licensed under the Apache License. See footer for details.
/* global require, describe, it, before */
const supertest = require('supertest');
const assert = require('chai').assert;

describe('Users', () => {
  const username = `john-${new Date().getTime()}@acme.com`;
  const password = '123';

  let app;
  let api;

  before((done) => {
    require('../server')((err, readyApp) => {
      app = readyApp;
      api = supertest.agent(app); // .agent() persists cookies between calls
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

  it('can log out', (done) => {
    api.post('/api/users/logout')
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it('can check if it is no longer logged', (done) => {
    api.get('/api/users/isLoggedIn')
      .expect(200)
      .end((err, result) => {
        assert.equal('failure', result.body.outcome);
        done(err);
      });
  });

  it('can log in', (done) => {
    api.post('/api/users/login')
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
});
