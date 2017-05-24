// Licensed under the Apache License. See footer for details.
const express = require('express');

const router = express.Router();
let fitbitClient;

function initializeFitbit(appEnv) {
  let fitbitCredentials;
  if (process.env.FITBIT) {
    console.log('Fitbit credentials provided as FITBIT environment variable', process.env.FITBIT);
    fitbitCredentials = JSON.parse(process.env.FITBIT);
  } else {
    console.log('Looking for Fitbit credentials in VCAP_SERVICES');
    fitbitCredentials = appEnv.getServiceCreds('fitbit');
  }

  if (fitbitCredentials) {
    console.log('Authorizing fitbit API');
    const FitbitApiClient = require('fitbit-node');
    fitbitClient = new FitbitApiClient(fitbitCredentials.clientID, fitbitCredentials.clientSecret);
    console.log('Fitbit API Authorized');
  } else {
    console.log('No Fitbit credentials specified');
  }
}

/* fitbit callback */

router.get('/data', (req, res) => {
  res.send('{}');
});

router.get('/authorize', (req, res) => {
  // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
  res.redirect(fitbitClient.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'https://fitchain.mybluemix.net/fitbit'));
});

// handle the callback from the Fitbit authorization flow
router.get('/fitbit', (req, res) => {
  // exchange the authorization code we just received for an access token

  console.log('callback response');
  console.log(res);

  fitbitClient.getAccessToken(req.query.code, 'https://fitchain.mybluemix.net/fitbit').then((result) => {
    // use the access token to fetch the user's profile information
    fitbitClient.get('/activities/date/2017-04-20.json', result.access_token).then((results) => {
      res.send(results[0]);
    });
  }).catch((error) => {
    res.send(error);
  });
});

module.exports = (appEnv) => {
  initializeFitbit(appEnv);
  return router;
};

//------------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
