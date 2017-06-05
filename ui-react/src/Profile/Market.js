import React, { Component } from 'react';
import './Profile.css';
import API from '../callAPI';

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
    API.getRequest('/api/market/challenges').then(body =>
          this.setState({ marketChallenges: body }));
  }

  render() {
    return (
      <div id="marketstage" className="stage">
        <div className="challengelist" id="marketlist">
          {this.state.marketChallenges.map(challenge => (
            <div className="marketitem" >
              <div className="challengetitle">
                {challenge.title}
              </div>
              <div className="marketvisual" >
                <img className="marketicon" alt={challenge.title} src={`images/${challenge.image}`} />
              </div>
              <div className="marketdescription">
                {challenge.description}
              </div>
              <button className="marketbutton">
                ACCEPT CHALLENGE
              </button>
            </div>

          ))}
        </div>
      </div>
    );
  }
}

export default Summary;
