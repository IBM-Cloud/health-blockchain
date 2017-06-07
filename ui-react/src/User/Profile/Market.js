import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import API from '../../callAPI';

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      marketChallenges: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();

    this.acceptChallenge = this.acceptChallenge.bind(this);
  }

  getChallenges() {
    API.getRequest('/api/market/challenges').then(body =>
          this.setState({ marketChallenges: body }));
  }

  acceptChallenge(challengeID) {
    // POST /api/account/challenges/accept/:marketChallengeId
    // subscribe to a challenge found in the market
    console.log(`Accepting challenge with id ${challengeID}`);
    API.postRequest(`/api/account/challenges/accept/${challengeID}`).then(() =>
          this.props.changeStage('challages'));
  }

  render() {
    console.log(this.state.marketChallenges);
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
              <button className="marketbutton" onClick={() => this.acceptChallenge(challenge._id)}>
                ACCEPT CHALLENGE
              </button>
            </div>

          ))}
        </div>
      </div>
    );
  }
}

Market.propTypes = {
  changeStage: PropTypes.func.isRequired
};

export default Market;
