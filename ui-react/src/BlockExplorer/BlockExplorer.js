import React, { Component } from 'react';
import './Block.css';
import Block from './Block';

class BlockExplorer extends Component {
  login() {
    console.log('login', this);
  }
  render() {
    return (
      <div className="blockExplorer">
        <Block />
        <Block />
        <Block />
      </div>

    );
  }
}

export default BlockExplorer;
