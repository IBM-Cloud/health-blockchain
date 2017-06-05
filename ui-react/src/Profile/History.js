import React, { Component } from 'react';
import './Profile.css';
import API from '../callAPI';

const moment = require('moment');

const dateFormat = 'dddd MMM Do';
const timeFormat = 'h:mm';

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();
  }

  getChallenges() {
    API.getRequest('/api/account/challenges/history').then(body =>
          this.setState({ history: body.history }));
  }

  render() {
    return (
      <div id="historystage" className="stage">
        <div className="challengelist" id="historylist">
          {this.state.history.map(challenge => (
            <div className="historyitem" key={challenge.id}>
              <div className="historyvisual">
                <img className="historyicon" src={`images/${challenge.image}`} alt="history" />
              </div>
              <div className="historydetails">
                <div className="timestamp">
                  <div className="datestamp">{moment(challenge.date).format(dateFormat)}</div>
                  <div className="clock">
                    <div className="beginstamp">{moment(challenge.start).format(timeFormat)}</div>
                    <div className="dash">-</div>
                    <div className="endstamp">{moment(challenge.end).format(timeFormat)}</div>
                  </div>
                </div>
                <div className="progress">
                  <div className="begin">
                    <div className="beginlabel">CALORIES</div>
                    <div className="begins">{challenge.calories}</div>
                  </div>
                  <div className="conclude">
                    <div className="endlabel">HEART RATE</div>
                    <div className="ends">{challenge.heart}</div>
                  </div>
                </div>
                <div className="progress">
                  <div className="begin">
                    <div className="beginlabel">DISTANCE</div>
                    <div className="begins">{challenge.distance}km</div>
                  </div>
                  <div className="conclude">
                    <div className="endlabel">PACE</div>
                    <div className="ends">{challenge.pace}km/h</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default History;
