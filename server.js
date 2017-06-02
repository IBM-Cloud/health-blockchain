// Licensed under the Apache License. See footer for details.
const express = require('express');
const cfenv = require('cfenv');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const async = require('async');

// configuration ===============================================================
// load local VCAP configuration
let vcapLocal = null;
if (require('fs').existsSync('./vcap-local.json')) {
  try {
    vcapLocal = require('./vcap-local.json');
    console.log('Loaded local VCAP', vcapLocal);
  } catch (e) {
    console.error(e);
  }
}

// get the app environment from Cloud Foundry, defaulting to local VCAP
const appEnvOpts = vcapLocal ? {
  vcap: vcapLocal
} : {};
const appEnv = cfenv.getAppEnv(appEnvOpts);

// create a new express server
const app = express();

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(flash()); // use connect-flash for flash messages stored in session

// required for passport
app.use(session({
  secret: 'health-blockchain',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.set('view engine', 'html');

// user management
app.use('/api/users', require('./routes/users'));

// challenges
app.use(require('./routes/challenges'));

// internal API to view the blocks - not something we would really expose in a real app
app.use('/api/private/blockchain', require('./routes/blockchain.js'));

// serve the react app files
app.use(express.static(`${__dirname}/ui-react/build`));

function initializeApp(readyCallback) {
  async.waterfall([
    // initialize passport configuration
    (callback) => {
      require('./config/passport')(passport, appEnv, () => {
        // user database created
        callback();
      });
    },
    // user workouts
    (callback) => {
      require('./routes/workouts')(appEnv, (err, router) => {
        app.use('/api/account/workouts', router);
        callback();
      });
    }
  ], (err) => {
    readyCallback(err, app);
  });
}

app.start = () => {
  // start server on the specified port and binding host
  app.listen(appEnv.port, '0.0.0.0', () => {
    // print a message when the server starts listening
    console.log(`server starting on ${appEnv.url}`);
  });
};

module.exports = (readyCallback) => {
  initializeApp(readyCallback);
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
