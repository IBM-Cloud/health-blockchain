import React, { Component } from 'react';
import Phone from './Phone/Phone';
import BlockExplorer from './BlockExplorer/BlockExplorer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="splitView">
          <Phone />
          <BlockExplorer />
        </div>

      </div>
    );
  }
}

export default App;
