import React, { Component } from 'react';
import { TextInput, Button, Checkbox, FormGroup, Select, SelectItem } from 'carbon-components-react';
import API from '../callAPI';
import './OrgLogin.css';


class OrgLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      organization: '',
      errorMessage: '',
      isNewUser: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleIsNewUserChange = this.handleIsNewUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigate = this.navigate.bind(this);
  }
  handleInputChange(event) {
    console.log(event);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleIsNewUserChange(value) {
    this.setState({
      isNewUser: value
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
    API.loginOrSignup(this.state.isNewUser ? 'signup' : 'login',
      this.state.email, this.state.password,
      this.state.isNewUser ? this.state.organization : null)
    .then((body) => {
      if (body.ok) {
        if (body.organization) {
          this.props.onLogin();
        } else {
          this.setState({ errorMessage: 'User does not have org access.' });
        }
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

        <Checkbox
          checked={this.state.isNewUser}
          onChange={this.handleIsNewUserChange}
          className="some-class"
          id="isNewUser"
          labelText="Register a new account"
        />

        <FormGroup>
          <Select
            disabled={!this.state.isNewUser}
            name="organization"
            id="organization"
            onChange={this.handleInputChange}
            labelText="Organization"
            defaultValue="placeholder-item"
          >
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Select your organization"
            />
            <SelectItem text="Cloud Insurance Co." value="Cloud Insurance Co." />
            <SelectItem text="Employer Co." value="Employer Co." />
            <SelectItem text="Pharma Co." value="Pharma Co." />
          </Select>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
        <div className="loginErrorMessage">{this.state.errorMessage}</div>
      </div>
    );
  }
}

export default OrgLogin;
