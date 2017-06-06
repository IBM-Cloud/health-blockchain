import React from 'react';
import ReactDOM from 'react-dom';
import User from './User';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<User />, div);
});
