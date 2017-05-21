/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');

//---Deployment Tracker---------------------------------------------------------
require("cf-deployment-tracker-client").track();

var databaseStatus = false;

require('./config/passport')(passport);

var Account = require('./models/account');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

console.log('app environment');
console.log(appEnv);

console.log('process env mongodb');
console.log(appEnv.services['compose-for-mongodb']);

console.log('process env fitbit');

if (process.env.FITBIT) {

    var fitbitCredentials = JSON.parse(process.env.FITBIT);
    console.log(process.env.FITBIT);

    console.log(fitbitCredentials);
}
/* - - - - - - - - - - - - - - - - - - - - - */

var config;

var DEFINED_BY_ENVIRONMENT = 'defined by environment';

try {
    config = require('./config/credentials.json');
    console.log("Loaded local credentials");
} catch (e) {
    config = DEFINED_BY_ENVIRONMENT;
    console.warn('COULD NOT LOAD LOCAL CREDENTIAL FILE');
    console.warn(e);
}

console.log('config:');

console.log(config);

var FitbitApiClient = require("fitbit-node");

var fitbitConfig;

if (config === DEFINED_BY_ENVIRONMENT) {
    fitbitConfig = fitbitCredentials.fitbit;
    console.log('reading FITBIT config from Bluemix Configuration');
    console.log('fitbitConfig:', fitbitConfig);
} else {
    fitbitConfig = config.fitbit;
    console.log('reading FITBIT config from local Configuration');
}



console.log('Authorizing fitbit API');
var client = new FitbitApiClient(fitbitConfig.clientID, fitbitConfig.clientSecret);
console.log('Fitbit API Authorized');

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


// configuration ===============================================================

var mongoDbCredentials

if (config === DEFINED_BY_ENVIRONMENT) {

    console.log('MONGO CREDENTIALS');

    console.log(appEnv.services['compose-for-mongodb']);


    mongoDbCredentials = appEnv.services['compose-for-mongodb'][0].credentials;
} else {
    mongoDbCredentials = config.mongo[0].credentials;
}

console.log('Authorizing Mongo API');


var ca = [new Buffer(mongoDbCredentials.ca_certificate_base64, 'base64')];
mongoDbUrl = mongoDbCredentials.uri;
mongoDbOptions = {
    mongos: {
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        poolSize: 1,
        reconnectTries: 1
    }
};

mongoose.connect(mongoDbUrl, mongoDbOptions, function (error) {
    if (error) {
        console.log('Unable to connect to the database. Please start the server. Error:', error);
    } else {
        console.log('Connected to database');
    }
});

console.log('Mongo API authorized');

app.use(express.static(__dirname + '/public'));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'html');

// required for passport
app.use(session({
    secret: 'ana-insurance-bot',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var bcrypt = require('bcrypt-nodejs');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.get('/isLoggedIn', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var result = {
        outcome: 'failure'
    };

    if (req.isAuthenticated()) {
        result.outcome = 'success';
        result.username = req.user.local.email;
        result.firstName = req.user.local.firstName;
        result.lastName = req.user.local.lastName;
    }

    res.send(JSON.stringify(result, null, 3));
})


// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form

app.get('/signup', function (req, res) {
    res.sendfile('./public/signup.html');
});

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signupSuccess', // redirect to the secure profile section
    failureRedirect: '/signupFailure', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

app.get('/loginSuccess', function (req, res) {

    console.log('LOGIN SUCCESS');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        username: req.user.local.email,
        outcome: 'success'
    }, null, 3));
})

app.get('/loginFailure', function (req, res) {

    console.log('LOGIN FAILURE');

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        outcome: 'failure'
    }, null, 3));
})

app.get('/signupSuccess', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        username: req.user.local.email,
        firstName: req.user.local.first_name,
        lastName: req.user.local.last_name,
        outcome: 'success'
    }, null, 3));
})


app.get('/summary', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('getting summary');

    res.send(JSON.stringify({
        challenges: 3,
        workouts: 57,
        rewards: 2,
        hours: 40,
        calories: 2000,
        outcome: 'success'
    }, null, 3));
})

app.get('/signupFailure', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        outcome: 'failure'
    }, null, 3));
})

app.get('/profile', function (req, res) {
    req.session.lastPage = "/profile";

    if (req.isAuthenticated()) {
        res.sendfile('./public/profile.html');
    } else {
        res.sendfile('./public/login.html');
    }
});

app.get('/login', function (req, res) {
    res.sendfile('./public/index.html');
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/loginSuccess', // redirect to the secure profile section
    failureRedirect: '/loginFailure', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
