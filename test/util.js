const assert = require('chai').assert;

module.exports = {
  User: {
    addUser: (userApi, username, password, organization) => new Promise((resolve, reject) => {
      let call = userApi.post('/api/users/signup').send(`email=${username}`).send(`password=${password}`);
      if (organization) {
        call = call.send(`organization=${organization}`);
      }
      call.expect(200).end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }),
    getChallenges: userApi => new Promise((resolve, reject) => {
      userApi.get('/api/account/challenges').expect(200).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    }),
    getChallengeSummary: userApi => new Promise((resolve, reject) => {
      userApi.get('/api/account/challenges/summary').expect(200).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    }),
    subscribeToChallenge: (userApi, challengeId) => new Promise((resolve, reject) => {
      userApi.post(`/api/account/challenges/accept/${challengeId}`).expect(201).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          assert.equal(challengeId, result.body.challengeId);
          resolve();
        }
      });
    }),
    logWorkout: (userApi, workout) => new Promise((resolve, reject) => {
      userApi.post('/api/account/workouts').send(workout).expect(201).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    }),
    getWorkouts: userApi => new Promise((resolve, reject) => {
      userApi.get('/api/account/workouts').expect(200).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    }),
    deleteWorkout: (userApi, workout) => new Promise((resolve, reject) => {
      userApi.delete(`/api/account/workouts/${workout._id}`).send(workout).expect(201).end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    })
  },

  Market: {
    getMarket: api => new Promise((resolve, reject) => {
      api.get('/api/market/challenges').expect(200).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    })
  },

  Organization: {
    addChallenge: (orgApi, challenge) => new Promise((resolve, reject) => {
      orgApi.post('/api/organization/challenges').send(challenge).expect(201).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          const addedChallenge = result.body;
          assert(addedChallenge._id !== null);
          assert(addedChallenge._rev !== null);
          assert(addedChallenge.organization !== null);
          resolve(addedChallenge);
        }
      });
    }),

    getChallengeSummary: (orgApi, challengeId) => new Promise((resolve, reject) => {
      orgApi.get(`/api/organization/challenges/${challengeId}/summary`).expect(200).end((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    })
  }

};
