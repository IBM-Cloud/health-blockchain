// Licensed under the Apache License. See footer for details.
const async = require('async');
const fs = require('fs');

function Database(appEnv, dbName, seedFilename, readyCallback) {
  const cloudantURL = appEnv.services.cloudantNoSQLDB[0].credentials.url || appEnv.getServiceCreds('health-blockchain-db').url;
  const Cloudant = require('cloudant')({ url: cloudantURL, plugin: 'retry', retryAttempts: 10, retryTimeout: 500 });
  const self = this;

  this.db = Cloudant.use(dbName);

  async.waterfall([
    // Create the database if it doesn't exist
    (callback) => {
      Cloudant.db.create(dbName, (err) => {
        if (err) {
          console.log('Database already exists:', dbName);
        } else {
          console.log('New database created:', dbName);
        }
        callback();
      });
    },
    // Seed with data
    (callback) => {
      // nothing to do if no seed file
      if (!seedFilename) {
        callback();
        return;
      }

      self.db.list((err, result) => {
        if (err) {
          console.log(err);
          callback();
        } else if (result.total_rows === 0 && seedFilename) {
          const docs = JSON.parse(fs.readFileSync(seedFilename));
          console.log('Injecting', docs.length, 'rows in', dbName);
          self.db.bulk({ docs }, (insertErr) => {
            if (insertErr) {
              console.log(insertErr);
            }
            callback();
          });
        } else {
          callback();
        }
      });
    }], () => {
    readyCallback();
  });
}

module.exports = function(appEnv, dbName, seedFilename, readyCallback) {
  return new Database(appEnv, dbName, seedFilename, readyCallback).db;
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
