/* This is a little node app that makes Challenges in the Challenge database */

var mongoose = require('mongoose');
var Challenge = require('./models/challenge');

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

mongoose.connect(mongoDbUrl, mongoDbOptions);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
    title: String,
    image: String,
    start: Date,
    end: Date,
    goal: Number,
    unit: String,
    activity: String
*/

function makeChallenge(title, image, start, end, goal, unit, activity) {

    var challenge = new Challenge();
    challenge.title = title;
    challenge.image = image;
    challenge.start = start;
    challenge.end = end;
    challenge.goal = goal;
    challenge.unit = unit;
    challenge.activity = activity;

    challenge.save(function (err) {
        if (err) {
            throw err;
        }
    })
}

Challenge.collection.remove();

/* - - - - - - - - - - */

var startdate = new Date(2017, 4, 1);
var enddate = new Date(2017, 4, 31);

makeChallenge('Bike To Work', '', startdate, enddate, 31, 'days', 'cycle');

startdate = new Date(2017, 0, 1);
enddate = new Date(2017, 11, 31);

makeChallenge('Fit For Work', '', startdate, enddate, 365, 'days', 'any');
