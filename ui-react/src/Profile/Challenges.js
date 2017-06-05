import React, { Component } from 'react';
import '../Phone/Phone.css';
import API from '../callAPI';

const moment = require('moment');

const timeFormat = 'YYYY-MM-DD';

class Challenges extends Component {

  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.startChallenge = this.startChallenge.bind(this);
    this.getChallenges();
  }

  getChallenges() {
    API.getRequest('/api/account/challenges').then(challenges =>
          this.setState({ challenges }));
  }

  startChallenge(challenge) {
    console.log(this, challenge);
    // TODO
  }
  render() {
    return (
      <div id="challengesstage" className="stage">
        <div className="challengelist" id="challengelist">
          <div className="messagearea" id="messagearea">
            {this.state.errorMessage}
          </div>
          {this.state.challenges.map((challenge, index) => (
            <div className="challengeitem" key={`challenge-${index}`}>
              <div className="challengevisual">
                <img className="challengeicon" src={`images/${challenge.image}`} alt="challenge" />
              </div>
              <div className="challengeblock">
                <div className="challengetitle">
                  {challenge.title}
                </div>
                <div className="time">
                  <div className="begin">
                    <div className="beginlabel">
                    STARTS
                  </div>
                    <div className="begins">
                      {moment(challenge.start).format(timeFormat)}
                    </div>
                  </div>
                  <div className="conclude">
                    <div className="endlabel">
                    ENDS
                  </div>
                    <div className="ends">
                      {moment(challenge.end).format(timeFormat)}
                    </div>
                  </div>
                </div>
                <div className="progress">
                  <div className="begin">
                    <div className="beginlabel">
                    GOAL
                  </div>
                    <div className="begins">
                      {challenge.goal}
                    </div>
                  </div>
                  <div className="conclude">
                    <div className="endlabel">
                    LOGGED
                  </div>
                    <div className="ends">
                      {challenge.logged}
                    </div>
                  </div>
                </div>
                <div className="progressbar" />
                <button className="challengebutton" onClick={() => this.startChallenge(challenge)}>
                  START WORKOUT
                </button>
              </div>
            </div>
        ))}
        </div>
      </div>
    );
  }
}

export default Challenges;
