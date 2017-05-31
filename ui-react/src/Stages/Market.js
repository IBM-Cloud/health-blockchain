import React, { Component } from 'react';
import '../Phone/Phone.css';

class Summary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      marketChallenges: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();
  }

  getChallenges() {
    fetch('/market', {
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        response.json().then(json =>
          this.setState(
            { marketChallenges: json.challenges }));
        return response;
      }
      this.setState({ errorMessage: 'Error calling API.' });
      return response;
    });
  }

  render() {
    return (
      <div id="marketstage" className="stage">
        <div className="challengelist" id="marketlist">{this.state.marketChallenges.length} market challenges</div>
      </div>
    );
  }
}

export default Summary;
