import React, { Component } from 'react';
import Logo from '../Logo';
import TabBar from '../TabBar';
import '../Phone/Phone.css';

class Challenges extends Component {

  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();
  }

  getChallenges() {
    fetch('/challenges', {
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        response.json().then(json =>
          this.setState(
            { challenges: json.challenges }));
        return response;
      }
      this.setState({ errorMessage: 'Error calling API.' });
      return response;
    });
  }
  render() {
    return (
      <div id="challengesstage" className="stage">
        <div className="challengelist" id="challengelist">{this.state.challenges.length} challenges</div>
      </div>
    );
  }
}

export default Challenges;
