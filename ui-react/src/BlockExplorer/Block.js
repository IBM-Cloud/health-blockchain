import React, { Component } from 'react';
import './Block.css';

class Block extends Component {
  login() {
    console.log('login', this);
  }
  render() {
    return (
      <div>
        <div className="verticalChain">
          <div className="verticalJoin" />
          <div className="verticalLink" />
          <div className="verticalJoin" />
        </div>
        <div className="block">
          <div className="blockRow">
            <div className="blockRowLabel">Block</div>
            <div>
              <input className="blockRowInput" type="text" value="'<%= block.id %>'" />
            </div>
          </div>
          {/* <!--Nonce--> */}
          <div className="blockRow">
            <div className="blockRowLabel">Nonce</div>
            <div><input className="blockRowInput" type="text" value="'<%= block.id %>'" /></div>
          </div>
          {/* <!--TX--> */}
          <div className="blockRow">
            <div className="blockRowLabel">TX</div>
            <div>
              <textarea className="blockRowTextArea">
                asdf
              </textarea>
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
