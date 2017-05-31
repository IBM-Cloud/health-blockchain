import React, { Component } from 'react';
import Phone from './Phone/Phone';
import Login from './Login';
import Profile from './Stages/Profile';
import BlockExplorer from './BlockExplorer/BlockExplorer';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedIn();

    this.onLogIn = this.onLogIn.bind(this);
  }

  onLogIn() {
    this.setState({
      loggedIn: true
    });
  }

  isLoggedIn() {
    fetch('/isLoggedIn', { credentials: 'include' }).then((response) => {
      if (response.ok) {
        response.json().then(json => json.outcome === 'success' && this.setState({ loggedIn: true }));
        return response;
      }
      this.setState({ errorMessage: 'Error calling API.' });
      return response;
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
