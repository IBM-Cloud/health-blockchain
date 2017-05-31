import React, { Component } from 'react';
import Logo from '../Logo';
import TabBar from '../TabBar';
import '../Phone/Phone.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {},
      errorMessage: ''
    };
    this.getSummary = this.getSummary.bind(this);
    this.getSummary();
  }

  getSummary() {
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
      <div className="screen">
        <div className="navigationbar">
          <div id="leftnav" className="leftnav" onClick={this.getSummary}></div>
          <div id="navigation" className="bar">SUMMARY</div>
          <div id="rightnav" className="rightnav" onClick={this.addChallenges}>
            {/* <img id="rightnavimg" src="images/add.svg" className="navimg" style="visibility:hidden;" /> */}
          </div>
        </div>
        <div id="stages" className="stages">
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
        </div>
        <div>{this.state.errorMessage}</div>
        <TabBar />
      </div>
    );
  }
}

export default Profile;