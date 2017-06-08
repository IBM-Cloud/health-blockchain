import React, { Component } from 'react';
import { Button, Form, FormGroup, Checkbox, Toggle, Search, NumberInput, RadioButtonGroup, RadioButton, TextInput, Textarea } from 'carbon-components-react';
import OrgLayout from './OrgLayout';
import './NewChallenge.css';

class NewChallenge extends Component {

  onChange() {
    // TODO
  }

  onClick() {
    // TODO
  }

  toggle() {
    // TODO
  }
  render2() {
    return (
      <div>hi</div>
    );
  }

  render() {
    return (
      <OrgLayout>
        <div className="newChallengeConatiner">
          <FormGroup className="some-class" legendText="Text Input">
            <TextInput
              className="some-class"
              id="test2"
              labelText="Text Input"
              placeholder="Hint text here"
            />
          </FormGroup>
          <FormGroup className="some-class" legendText="Password field label">
            <TextInput
              type="password"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              className="some-class"
              id="test2"
              labelText="Password"
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup className="some-class" legendText="Checkbox">
            <Checkbox
              defaultChecked
              className="some-class"
              labelText="Checkbox"
              onChange={this.onChange()}
              id="checkbox-0"
            />
            <br />
            <Checkbox
              className="some-class"
              labelText="Checkbox"
              onChange={this.onChange()}
              id="checkbox-1"
            />
            <br />
            <Checkbox
              disabled
              className="some-class"
              labelText="Checkbox"
              onChange={this.onChange()}
              id="checkbox-2"
            />
          </FormGroup>
        </div>

      </OrgLayout>
    );
  }
}

export default NewChallenge;
