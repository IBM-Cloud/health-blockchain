import React, { Component } from 'react';
import './Phone/Phone.css';

class Profile extends Component {

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

  addChallenges(){
    // TODO
  }

  render() {
    return (
      <div className="screen">
        <div className="navigationbar">
          <div id="leftnav" className="leftnav" onClick={this.challengeView}></div>
          <div id="navigation" className="bar">SUMMARY</div>
          <div id="rightnav" className="rightnav" onClick={this.addChallenges}>
            {/* <img id="rightnavimg" src="images/add.svg" className="navimg" style="visibility:hidden;" /> */}
          </div>
        </div>
        <div id="stages" className="stages">
          {/* TODO: display flex summarystage */}
          <div id="summarystage" className="stage">
            <div className="summarybox">
              <div className="logoholder">
                <div className="title">
                  <a href="/">FITCHAIN</a>
                </div>
                <div className="chain">
                  <div className="join" />
                  <div className="link" />
                  <div className="join" />
                  <div className="link" />
                  <div className="join" />
                  <div className="link" />
                  <div className="join" />
                  <div className="link" />
                  <div className="join" />
                  <div className="link" />
                  <div className="join" />
                  <div className="link" />
                  <div className="join" />
                </div>
              </div>

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

          {/* <div id="challengesstage" className="stage">
              <div className="challengelist" id="challengelist">
              </div>
          </div>

          <div id="historystage" className="stage">
              <div className="challengelist" id="historylist">
              </div>
          </div>

          <div id="marketstage" className="stage">
              <div className="challengelist" id="marketlist">
              </div>
          </div> */}
        </div>
        <div className="tabbar">
          {this.state.errorMessage}
          <img id="summary" className="tabimage" alt="summary" src="images/summary.svg" />
          <img id="challenges" className="tabimage" alt="challenges" src="images/target.svg" />
          <img id="history" className="tabimage" alt="history" src="images/time.svg" />
        </div>
      </div>
    );
  }
}

export default Profile;
