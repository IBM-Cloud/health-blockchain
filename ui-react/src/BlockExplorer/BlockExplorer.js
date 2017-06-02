import React, { Component } from 'react';
import './Block.css';
import Block from './Block';

class BlockExplorer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    };
    this.getBlocks = this.getBlocks.bind(this);
    this.getBlocks();
  }

  getBlocks() {
    fetch('/api/private/blockchain/blocks', {
      credentials: 'include'
    }).then(response => response.json())
      .then((blocks) => {
        console.log(blocks);
        this.setState({ blocks });
      });
  }

  render() {
    return (
      <div className="blockExplorer">
        {this.state.blocks.map((block, index) => (
          <Block block={block}/>
        ))}
      </div>
    );
  }
}

export default BlockExplorer;
