import React, { Component } from 'react';
import './Profile.css';
import './Challenges.css';
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
    this.addWorkout = this.addWorkout.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.getChallenges();
  }

  getChallenges() {
    API.getRequest('/api/account/challenges').then(challenges =>
          this.setState({ challenges }));
  }

  // TODO: There has to be a better way of doing this
  // Sets animation field for the challenge to true and
  // set it back to false 100ms later.
  // This translates to css className toggle
  animate(index) {
    console.log('index', index);
    const challenges = this.state.challenges;
    challenges[index].animate = true;
    this.setState({ challenges });

    setTimeout(() => {
      challenges[index].animate = false;
      this.setState({ challenges });
    }, 100);
  }

  addWorkout(challenge, index) {
    this.animate(index);
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
      image: challenge.image
    }).then(() => this.getChallenges());
  }


  render() {
    return (
      <div id="challengesstage" className="stage">
        <div className="challengelist" id="challengelist">
          <div className="messagearea" id="messagearea">
            {this.state.errorMessage}
          </div>
          {this.state.challenges.map((challenge, index) => (
            <div className="challengeitem" key={challenge._id}>
              <div className={challenge.animate ? 'challengevisual challengevisual-animate' : 'challengevisual'}>
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
                {challenge.logged >= challenge.goal ?
                  <button disabled className="challengebutton">
                    COMPLETED
                  </button>
                  :
                  <button className="challengebutton" onClick={() => this.addWorkout(challenge, index)}>
                    ADD WORKOUT
                  </button>
                }
              </div>
            </div>
        ))}
        </div>
      </div>
    );
  }
}

export default Challenges;
