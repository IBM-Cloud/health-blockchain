import React, { Component } from 'react';
import Logo from '../Logo';
import TabBar from '../TabBar';
import '../Phone/Phone.css';

class Summary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      summary: {},
      errorMessage: ''
    };
    this.challengeView = this.challengeView.bind(this);
    this.challengeView();
  }

  challengeView() {
    fetch('/summary', {
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        response.json().then(json =>
          this.setState(
            { summary: json }));
        return response;
      }
      this.setState({ errorMessage: 'Error calling API.' });
      return response;
    });
  }
  render() {
    return (
      <div id="summarystage" className="stage">
        <div className="summarybox">
          <Logo />

          <div className="challenges">
            <div id="challengecount" className="challengecount">
              {this.state.summary.challenges}
            </div>
            <div className="challengelabel">CHALLENGES</div>
          </div>
          <div className="challengedata">
            <div className="workouts">
              <div id="workoutcount" className="workoutcount">
                {this.state.summary.workouts}
              </div>
              <div className="workoutlabel">WORKOUTS</div>
            </div>
            <div className="rewards">
              <div id="rewardcount" className="rewardcount">
                {this.state.summary.rewards}
              </div>
              <div className="rewardlabel">REWARDS</div>
            </div>
          </div>
          <div className="challengedata">
            <div className="workouts">
                <div id="hourcount" className="workoutcount">
                  {this.state.summary.hours}
                </div>
                <div className="workoutlabel">HOURS</div>
            </div>
            <div className="rewards">
                <div id="caloriecount" className="rewardcount">
                  {this.state.summary.calories}
                </div>
                <div className="rewardlabel">CALORIES</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
