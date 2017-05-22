var express = require('express');
var router = express.Router();
var fitbitClient;

function initializeFitbit(appEnv) {
  var fitbitCredentials;
  if (process.env.FITBIT) {
    console.log('Fitbit credentials provided as FITBIT environment variable', process.env.FITBIT);
    fitbitCredentials = JSON.parse(process.env.FITBIT);
  } else {
    console.log('Looking for Fitbit credentials in VCAP_SERVICES');
    fitbitCredentials = appEnv.getServiceCreds("fitbit");
  }

  if (fitbitCredentials) {
    console.log('Authorizing fitbit API');
    var FitbitApiClient = require("fitbit-node");
    fitbitClient = new FitbitApiClient(fitbitCredentials.clientID, fitbitCredentials.clientSecret);
    console.log('Fitbit API Authorized');
  } else {
    console.log('No Fitbit credentials specified');
  }
}

/* fitbit callback */

router.get('/data', function(req, res) {
  res.send('{}');
});

router.get("/authorize", function(req, res) {
  // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
  res.redirect(fitbitClient.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'https://fitchain.mybluemix.net/fitbit'));
});

// handle the callback from the Fitbit authorization flow
router.get("/fitbit", function(req, res) {
  // exchange the authorization code we just received for an access token

  console.log('callback response');
  console.log(res);

  fitbitClient.getAccessToken(req.query.code, 'https://fitchain.mybluemix.net/fitbit').then(function(result) {
    // use the access token to fetch the user's profile information
    fitbitClient.get("/activities/date/2017-04-20.json", result.access_token).then(function(results) {
      res.send(results[0]);
    });
  }).catch(function(error) {
    res.send(error);
  });
});

module.exports = (appEnv) => {
  initializeFitbit(appEnv);
  return router;
}
