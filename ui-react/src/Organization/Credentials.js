import React, { Component } from 'react';
import { TextInput, Button, FormGroup, Select, SelectItem } from 'carbon-components-react';
import './OrgLogin.css';


class Credentials extends Component {

  render() {
    return (
      <div>
        <FormGroup>
          <TextInput
            className="some-class"
            id="email"
            name="email"
            labelText="Username"
            onChange={this.props.handleInputChange}
            value={this.props.email}
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            type="password"
            className="some-class"
            id="password"
            name="password"
            labelText="Password"
            onChange={this.props.handleInputChange}
            value={this.props.password}
          />
        </FormGroup>

        {!this.props.isLogin ? <FormGroup>
          <Select
            name="organization"
            id="organization"
            onChange={this.props.handleInputChange}
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
        </FormGroup> : ''}

        <Button onClick={this.props.handleSubmit}>Submit</Button>
        <div className="loginErrorMessage">{this.props.errorMessage}</div>
      </div>);
  }
}

export default Credentials;
