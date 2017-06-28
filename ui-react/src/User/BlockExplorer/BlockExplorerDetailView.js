import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Block.css';
import Block from './Block';

class BlockExplorerDetailView extends Component {


  render() {
    return (
      <div className="BlockExplorerDetailView">

        {this.props.blocks.map(block => (
          <Block block={block} key={block.id} />
        ))}
      </div>
    );
  }
}

BlockExplorerDetailView.propTypes = {
  blocks: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onMin: PropTypes.func.isRequired
};

export default BlockExplorerDetailView;
