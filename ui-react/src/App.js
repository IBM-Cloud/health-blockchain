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
  }

  isLoggedIn() {
    fetch('/isLoggedIn', {
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        console.log('loggedin');
        response.json().then((json) => {
          console.log(json.outcome);
          if (json.outcome === 'success') {
            this.setState(
              { loggedIn: true });
          }
        });
        return response;
      }
      this.setState({ errorMessage: 'Error calling API.' });
      return response;
    });
  }

  login() {
    fetch('/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.email, password: this.state.password
      })
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        this.props.onLogIn();
        return response;
      }
      this.setState({ errorMessage: 'Network response was not ok.' });
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
