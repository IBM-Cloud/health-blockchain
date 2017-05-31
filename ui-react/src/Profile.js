import React, { Component } from 'react';
import './Phone/Phone.css';

class Profile extends Component {

  challengeView(){
    // TODO
  }

  addChallenges(){
    // TODO
  }

  render() {
    return (
      <div className="profile">
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
                        <div className="title"><a href="/">FITCHAIN</a></div>
                        <div className="chain">
                            <div className="join"></div>
                            <div className="link"></div>
                            <div className="join"></div>
                            <div className="link"></div>
                            <div className="join"></div>
                            <div className="link"></div>
                            <div className="join"></div>
                            <div className="link"></div>
                            <div className="join"></div>
                            <div className="link"></div>
                            <div className="join"></div>
                            <div className="link"></div>
                            <div className="join"></div>
                        </div>
                    </div>
                    <div className="challenges">
                        <div id="challengecount" className="challengecount"></div>
                        <div className="challengelabel">CHALLENGES</div>
                    </div>
                    <div className="challengedata">
                        <div className="workouts">
                            <div id="workoutcount" className="workoutcount"></div>
                            <div className="workoutlabel">WORKOUTS</div>
                        </div>
                        <div className="rewards">
                            <div id="rewardcount" className="rewardcount"></div>
                            <div className="rewardlabel">REWARDS</div>
                        </div>
                    </div>
                    <div className="challengedata">
                        <div className="workouts">
                            <div id="hourcount" className="workoutcount"></div>
                            <div className="workoutlabel">HOURS</div>
                        </div>
                        <div className="rewards">
                            <div id="caloriecount" className="rewardcount"></div>
                            <div className="rewardlabel">CALORIES</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="challengesstage" className="stage">
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
            </div>

        </div>
        <div className="tabbar">
            {/* <img id="summary" style="opacity:1;" className="tabimage" src="images/summary.svg" onClick="selectTab(event)" /> */}
            {/* <img id="challenges" style="opacity:0.4;" className="tabimage" src="images/target.svg" onClick="selectTab(event)" /> */}
            {/* <img id="history" style="opacity:0.4;" className="tabimage" src="images/time.svg" onClick="selectTab(event)" /> */}
        </div>
      </div>
    );
  }
}

export default Profile;
