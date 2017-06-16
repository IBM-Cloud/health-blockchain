import React, { Component } from 'react';
import './Profile.css';
import API from '../../callAPI';

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
    this.startWorkout = this.startWorkout.bind(this);
  }

  componentDidMount() {
    this.getChallenges();
  }

  getChallenges() {
    API.getRequest('/api/account/challenges').then(challenges =>
          this.setState({ challenges }));
  }

  startWorkout(challenge) {
    console.log(challenge);

    API.postRequest('/api/account/workouts', {
      challengeId: challenge.challengeId,
      date: '2017-03-31T10:00:00.000Z',
      start: '2017-03-31T10:00:00.000Z',
      end: '2017-03-31T12:00:00.000Z',
      calories: 500,
      distance: 14,
      pace: 8.5,
      heart: 65,
      activity: 'CYCLING',
      image: 'bike.svg'
    }).then(() => this.getChallenges());
  }
  render() {
    console.log(this.state.challenges);
    return (
      <div id="challengesstage" className="stage">
        <div className="challengelist" id="challengelist">
          <div className="messagearea" id="messagearea">
            {this.state.errorMessage}
          </div>
          {this.state.challenges.map(challenge => (
            <div className="challengeitem" key={challenge._id}>
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
                <button className="challengebutton" onClick={() => this.startWorkout(challenge)}>
                  ADD WORKOUT
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
