import React, { Component } from 'react';
import Phone from './Phone/Phone';
import Login from './Login';
import Profile from './Profile/Profile';
import BlockExplorer from './BlockExplorer/BlockExplorer';
import './App.css';
import API from './callAPI';

const Route = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  PROFILE: 'profile',
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      route: Route.LOGIN,
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedIn();

    this.onLogIn = this.onLogIn.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  onLogIn() {
    this.setState({
      route: Route.LOGIN
    });
  }

  onLoggedIn() {
    this.setState({
      route: Route.PROFILE
    });
  }

  onSignup() {
    this.setState({
      route: Route.SIGNUP
    });
  }

  isLoggedIn() {
    API.getRequest('/api/users/isLoggedIn').then(json =>
          json.outcome === 'success' && this.setState({ route: Route.PROFILE }));
  }

  logout() {
    API.postRequest('/api/users/logout')
    .then(() => this.setState({ route: Route.LOGIN }));
  }

  render() {
    let view;
    switch (this.state.route) {
      case Route.SIGNUP:
        view = <Login isLogin={false} onSubmit={this.onLoggedIn} onNavigate={this.onLogIn} />;
        break;
      case Route.PROFILE:
        view = <Profile />;
        break;
      case Route.LOGIN:
      default:
        view = <Login isLogin onSubmit={this.onLoggedIn} onNavigate={this.onSignup} />;
        break;
    }
    return (
      <div className="App">
        <div className="splitView">
          <Phone homeButton={this.logout}>
            {view}
          </Phone>
          <BlockExplorer />
        </div>

      </div>
    );
  }
}

export default App;
