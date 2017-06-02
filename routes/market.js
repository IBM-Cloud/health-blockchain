// Licensed under the Apache License. See footer for details.
const express = require('express');

const router = express.Router();

// | GET    | /api/market/challenges | view available challenges
router.get('/challenges', (req, res) => {
  res.sendFile(`${__dirname}/json/market-get-challenges.json`);
});

// | PUT    | /api/market/challenges | allows an organization to submit a new challenge to the market
// requires authentication
// user must be an organization
router.put('/challenges', (req, res) => {
  res.send({});
});

// | POST   | /api/market/challenges | allows an organization to update its challenge
// requires authentication
// user must be an organization
// challenge must be owned by user
router.post('/challenges/:id', (req, res) => {
  res.send({});
});

// | DELETE | /api/market/challenges | allows an organization to delete its challenge from the market
// requires authentication
// user must be an organization
// challenge must be owned by user
router.delete('/challenges/:id', (req, res) => {
  res.send({});
});

module.exports = router;
