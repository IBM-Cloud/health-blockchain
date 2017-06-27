import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Block.css';

class BlockExplorerPreview extends Component {


  render() {
    return (
      <div role="presentation" onClick={this.props.onExpand}>
<button className="blockchainButton"><img className="blockchainImage" src="images/blockchain.svg"></img></button>
      </div>
    );
  }
}

BlockExplorerPreview.propTypes = {
  blocks: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onExpand: PropTypes.func.isRequired
};

export default BlockExplorerPreview;
