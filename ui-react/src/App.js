import React, { Component } from 'react';
import Phone from './Phone/Phone';
import Login from './Login';
import Profile from './Profile';
import BlockExplorer from './BlockExplorer/BlockExplorer';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.onLogIn = this.onLogIn.bind(this);
  }

  onLogIn() {
    this.setState({
      loggedIn: true
    });
  }

  render() {
    return (
      <div className="App">
        <div className="splitView">
          <Phone>
            {this.state.loggedIn ?
              <Profile />
              :
              <Login onLogIn={this.onLogIn} />
            }
          </Phone>
          <BlockExplorer />
        </div>

      </div>
    );
  }
}

export default App;
