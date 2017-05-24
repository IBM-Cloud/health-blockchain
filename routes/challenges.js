// Licensed under the Apache License. See footer for details.
var express = require('express');
var router = express.Router();

router.get('/challenges', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('getting challenges');

    /* sample response data */

    var startDate = new Date(2017, 3, 1);
    var endDate = new Date(2017, 4, 31);

    var ffwstartdate = new Date(2017, 0, 1);
    var ffwenddate = new Date(2017, 11, 31);

    var challenges = [
        {
            title: 'Bike To Work',
            image: 'bike.svg',
            start: startDate,
            end: endDate,
            goal: 10,
            unit: 'workout',
            activity: 'CYCLING',
            logged: 6
    }, {
            title: 'Fit To Work',
            image: 'skip.svg',
            start: ffwstartdate,
            end: ffwenddate,
            goal: 30,
            unit: 'workout',
            activity: 'ANY',
            logged: 20
    }
  ];

    var response = {
        challenges: challenges,
        outcome: 'success'
    };

    res.send(JSON.stringify(response, null, 3));
})

router.get('/summary', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('getting summary');

    /* sample response data */

    res.send(JSON.stringify({
        challenges: 3,
        workouts: 57,
        rewards: 2,
        hours: 40,
        calories: 2000,
        outcome: 'success'
    }, null, 3));
});

router.get('/market', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log('getting challenges');

    /* sample response data */

    var startDate = new Date(2017, 3, 1);
    var endDate = new Date(2017, 4, 31);

    var ffwstartdate = new Date(2017, 0, 1);
    var ffwenddate = new Date(2017, 11, 31);

    var challenges = [
        {
            title: 'Bike To Work',
            image: 'bike.svg',
            start: startDate,
            end: endDate,
            goal: 10,
            unit: 'workout',
            activity: 'CYCLING',
            logged: 6,
            description: 'Earn a water bottle for 10 bike commutes to work'
    }, {
            title: 'Fit To Work',
            image: 'skip.svg',
            start: ffwstartdate,
            end: ffwenddate,
            goal: 30,
            unit: 'workout',
            activity: 'ANY',
            logged: 20,
            description: '$100 health insurance credit for 30 workouts a year'
    }
  ];

    var response = {
        challenges: challenges,
        outcome: 'success'
    };

    res.send(JSON.stringify(response, null, 3));
});

module.exports = router;

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
