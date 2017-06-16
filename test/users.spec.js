// Licensed under the Apache License. See footer for details.
/* global require, describe, it, before */
const supertest = require('supertest');
const assert = require('chai').assert;

describe('Users', () => {
  const username = `john-${new Date().getTime()}@acme.com`;
  const password = '123';

  const orgUsername = `jim-${new Date().getTime()}@insurance.com`;
  const orgPassword = '456';
  const organization = `org-${new Date().getTime()}`;

  let app;
  let api;
  let apiAnon;

  before((done) => {
    require('../server')((err, readyApp) => {
      app = readyApp;
      api = supertest.agent(app); // .agent() persists cookies between calls
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

  it('can not log in with an organization if it is not part of one', (done) => {
    api.post('/api/users/login')
      .send(`email=${username}`)
      .send(`password=${password}`)
      .send('organization=anOrg')
      .expect(401)
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


  it('can register an organization account', (done) => {
    apiAnon.post('/api/users/signup')
      .send(`email=${orgUsername}`)
      .send(`password=${orgPassword}`)
      .send(`organization=${organization}`)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it('can login by specifying its organization', (done) => {
    apiAnon.post('/api/users/login')
      .send(`email=${orgUsername}`)
      .send(`password=${orgPassword}`)
      .send(`organization=${organization}`)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it('can not login without specifying its organization', (done) => {
    apiAnon.post('/api/users/login')
      .send(`email=${orgUsername}`)
      .send(`password=${orgPassword}`)
      .expect(401)
      .end((err) => {
        done(err);
      });
  });
});
