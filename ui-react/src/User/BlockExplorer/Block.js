import React, { Component } from 'react';
import './Block.css';

class Block extends Component {
  render() {
    return (
      <div>
        <div className="verticalChain">
          <div className="verticalJoin" />
          <div className="verticalLink" />
          <div className="verticalJoin" />
        </div>
        <div className="block">
          <div className="blockCap"></div>
          <div className="blockRow">
            <div className="blockRowLabel">Block</div>
            <div className="blockData">
              <input className="blockRowInput blockNumber" type="text" value={this.props.block.blockNumber} />
            </div>
          </div>
          {/* <!--Nonce--> */}
          <div className="blockRow">
            <div className="blockRowLabel">Nonce</div>
            <div className="blockData"><input className="blockRowInput" type="text" value="'<%= block.id %>'" /></div>
          </div>
          {/* <!--TX--> */}
          <div className="blockRow">
            <div className="blockRowLabel">TX</div>
            <div>
              <textarea className="blockRowTextArea" value="asdf" />
            </div>
          </div>
          <div className="blockRow blockFooter">
            <div className="blockRowLabel">HASH</div>
            <div className="hashCode">id</div>
          </div>
        </div>
      </div>

    );
  }
}

export default Block;
