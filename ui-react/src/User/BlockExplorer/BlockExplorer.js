import React, { Component } from 'react';
import './Block.css';
import BlockExplorerPreview from './BlockExplorerPreview';
import BlockExplorerDetailView from './BlockExplorerDetailView';

class BlockExplorer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      preview: true
    };
    this.getBlocks = this.getBlocks.bind(this);
    this.getBlocks();
  }

  getBlocks() {
    fetch('/api/private/blockchain/blocks', {
      credentials: 'include'
    }).then(response => response.json())
      .then((blocks) => {
        this.setState({ blocks });
      });
  }

  render() {
    return (
      <div>

          <BlockExplorerDetailView
            blocks={this.state.blocks}
            onMin={() => this.setState({ preview: true })}
          />
        
      </div>
    );
  }
}

export default BlockExplorer;
