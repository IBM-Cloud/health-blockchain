import React, { Component } from 'react';
import { TextInput, Button, FormGroup } from 'carbon-components-react';
import { browserHistory } from 'react-router';
import API from '../callAPI';
import './OrgLogin.css';


class OrgLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  navigate() {
    this.setState({ errorMessage: '' });
    // this.props.onNavigate();
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault(); // Don't submit the form. We will call the API ourself.
    this.setState({ errorMessage: '' });
    API.loginOrSignup('login', this.state.email, this.state.password)
    .then((body) => {
      if (body.ok && body.organization) {
        this.props.onLogin();
      } else {
        this.setState({ errorMessage: body.message });
      }
    });
  }
  render() {
    return (
      <div className="orgLoginContainer">
        <FormGroup>
          <TextInput
            className="some-class"
            id="email"
            name="email"
            labelText="Username"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            type="password"
            className="some-class"
            id="password"
            name="password"
            labelText="Password"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>

      </div>
    );
  }
}

export default OrgLogin;
