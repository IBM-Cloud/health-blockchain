import React from 'react';
import { storiesOf } from '@storybook/react';
import ChallengeDetails from './ChallengeDetails';

storiesOf('ChallengeDetails', module)
  .add('empty', () => (
    <ChallengeDetails />
  ))
  .add('challenge', () => (
    <ChallengeDetails
      details={{
        title: 'A challenge',
        image: 'bike.svg',
        activity: 'CYCLING'
      }}
      summary={{
        participants: 150,
        rewards: {
          total: 1000,
          granted: 500,
          reserved: 200,
          remaining: 300
        }
      }}
    />
  ));
