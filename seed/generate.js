const fs = require('fs');

const organizations = [
  {
    name: 'Cloud Insurance Co.',
    domain: 'insurance.com'
  },
  {
    name: 'Employer Co.',
    domain: 'acme.com'
  },
  {
    name: 'Pharma Co.',
    domain: 'pharma.com'
  }
];
const challengeTemplates = [
  {
    title: 'Bike To Work',
    image: 'bike.svg',
    unit: 'workout',
    activity: 'CYCLING',
    description: 'Earn a water bottle for 10 bike commutes to work',
  },
  {
    title: 'Fit For Work',
    image: 'skip.svg',
    unit: 'workout',
    activity: 'ANY',
    description: '$100 health insurance credit for 30 workouts a year',
  },
  {
    title: 'Stair Challenge',
    image: 'stairs.svg',
    unit: 'workout',
    activity: 'STAIRS',
    description: 'Bobble hat for 1000 stairs climbed this winter',
  },
  {
    title: 'Runners Life Insurance',
    image: 'runner.svg',
    unit: 'workout',
    activity: 'RUNNING',
    description: '20% discount for 20 runs a year',
  },
  {
    title: 'Marathon Qualifying',
    image: 'runner.svg',
    unit: 'workout',
    activity: 'RUNNING',
    description: 'Run one marathon in less than 4 hours',
  }
];
const participantCount = 200;
const marketChallengeCount = organizations.length * challengeTemplates.length;
const userChallengeCounts = [1, 2, 3];

// password
const passwordHash = '$2a$10$N3V83DLnNa8iTbiXi/f4c.9bz.NYFrqBeTeCKK/1LEAgZN8lUUqq.';

const users = [
  'john', 'jim', 'joe',
];

const participantDomains = [
  'company.com', 'acme.com', 'super.it'
];

const database = {
  orgAccounts: [],
  userAccounts: [],
  market: [],
  challenges: [],
  workouts: []
};

let userId = 0;

// create account admins
organizations.forEach((organization) => {
  users.forEach((user) => {
    database.orgAccounts.push({
      _id: `${userId}`,
      email: `${user}@${organization.domain}`,
      password: passwordHash,
      organization: organization.name,
    });
    userId += 1;
  });
});

// create users
// user@domain by default
participantDomains.forEach((domain) => {
  users.forEach((user) => {
    database.userAccounts.push({
      _id: `${userId}`,
      email: `${user}@${domain}`,
      password: passwordHash
    });
    userId += 1;
  });
});

// and fill with more users
for (let index = database.userAccounts.length; index < participantCount; index += 1) {
  database.userAccounts.push({
    _id: `${userId}`,
    email: `${users[index % users.length]}-${userId}@${participantDomains[index % participantDomains.length]}`,
    password: passwordHash
  });
  userId += 1;
}

const goals = [5, 10];

// create market challenges
for (let index = 0; index < marketChallengeCount; index += 1) {
  // pick a template
  const tmpl = challengeTemplates[index % challengeTemplates.length];
  const challenge = JSON.parse(JSON.stringify(tmpl));
  challenge._id = `${index}`;
  challenge.organization = organizations[index % organizations.length].name;
  challenge.goal = goals[index % goals.length];
  challenge.rewards = participantCount;
  challenge.start = '2017-06-15T16:00:00.000Z';
  challenge.end = '2018-06-15T16:00:00.000Z';

  database.market.push(challenge);
}

// subscribe users to market challenges
let subscribedChallengeCount = 0;
database.userAccounts.forEach((user, userIndex) => {
  for (let index = 0;
    index < userChallengeCounts[userIndex % userChallengeCounts.length];
    index += 1) {
    const challenge = database.market[subscribedChallengeCount % database.market.length];
    database.challenges.push({
      _id: `${subscribedChallengeCount}`,
      accountId: user._id,
      challengeId: challenge._id
    });
    subscribedChallengeCount += 1;
  }
});

const goalCompletion = [1.0, 0.25, 0.5];
let workoutId = 0;

// for each market challenge
database.market.forEach((marketChallenge, marketChallengeIndex) => {
  // find the user who have subscribed
  const userChallenges =
    database.challenges.filter(userChallenge => userChallenge.challengeId === marketChallenge._id);

  // set the number of rewards to at least cover the registered users
  if (marketChallengeIndex % 2 === 0) {
    marketChallenge.rewards = Math.floor(userChallenges.length * 1.3);
  } else {
    marketChallenge.rewards = userChallenges.length;
  }

  // generate workouts for these users
  userChallenges.forEach((userChallenge, userIndex) => {
    const count = marketChallenge.goal * goalCompletion[userIndex % goalCompletion.length];
    console.log('generating', count, 'workouts for', userChallenge.accountId, userChallenge.challengeId);
    for (let index = 0; index < count; index += 1) {
      database.workouts.push({
        _id: `${workoutId}`,
        accountId: userChallenge.accountId,
        challengeId: userChallenge.challengeId,
        date: '2017-06-17T10:00:00.000Z',
        start: '2017-06-17T10:00:00.000Z',
        end: '2017-06-17T11:00:00.000Z',
        calories: 500,
        distance: 14,
        pace: 8.5,
        heart: 65,
        activity: marketChallenge.activity,
        image: marketChallenge.image,
      });
      workoutId += 1;
    }
  });
});

fs.writeFileSync('./seed/account.json', JSON.stringify(database.orgAccounts.concat(database.userAccounts), '', 2));
fs.writeFileSync('./seed/market.json', JSON.stringify(database.market, '', 2));
fs.writeFileSync('./seed/challenges.json', JSON.stringify(database.challenges, '', 2));
fs.writeFileSync('./seed/workouts.json', JSON.stringify(database.workouts, '', 2));
