// Licensed under the Apache License. See footer for details.
/* global require, describe, it, before */
const supertest = require('supertest');
const assert = require('chai').assert;

describe('Market', () => {
  let app;
  let apiAnon;

  before((done) => {
    require('../server')((err, readyApp) => {
      app = readyApp;
      apiAnon = supertest(app);
      done();
    });
  });

  it('can retrieve market challenges', (done) => {
    apiAnon.get('/api/market/challenges')
      .expect(200)
      .end((err, result) => {
        assert(result.body.length > 0);
        done(err);
      });
  });
});
