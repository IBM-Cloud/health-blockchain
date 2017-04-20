/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

/* - - - - - - - - - - - - - - - - - - - - - */

var config = require('./config/credentials.json');

var FitbitApiClient = require("fitbit-node");

var client = new FitbitApiClient(config.fitbit.clientID, config.fitbit.clientSecret);

/* fitbit callback */

app.get('/data', function (req, res) {

});

app.get("/authorize", function (req, res) {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'https://fitchain.mybluemix.net/fitbit'));
});

// handle the callback from the Fitbit authorization flow
app.get("/fitbit", function (req, res) {
    // exchange the authorization code we just received for an access token

    console.log('callback response');

    console.log(res);

    client.getAccessToken(req.query.code, 'https://fitchain.mybluemix.net/fitbit').then(function (result) {
        // use the access token to fetch the user's profile information
        client.get("/activities/date/2017-04-20.json", result.access_token).then(function (results) {
            res.send(results[0]);
        });
    }).catch(function (error) {
        res.send(error);
    });
});


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
