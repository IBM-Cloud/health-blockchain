import React from 'react';
import { storiesOf } from '@storybook/react';
import Phone from './Phone';

storiesOf('Phone', module)
  .add('empty', () => (
    <Phone />
  ));
