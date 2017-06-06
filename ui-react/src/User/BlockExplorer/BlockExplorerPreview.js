import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Block.css';

class BlockExplorerPreview extends Component {


  render() {
    return (
      <div role="presentation" onClick={this.props.onExpand}>
        {this.props.blocks.map(block => (
          <div key={block.blockNumber}>
            <div className="blockSmallLink" />
            <div className="blockSmall" />
          </div>
        ))}
      </div>
    );
  }
}

BlockExplorerPreview.propTypes = {
  blocks: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onExpand: PropTypes.func.isRequired
};

export default BlockExplorerPreview;
