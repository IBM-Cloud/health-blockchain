import React, { Component } from 'react';
import Summary from './Summary';
import Challenges from './Challenges';
import Market from './Market';
import History from './History';
import TabBar from './TabBar';
import './Profile.css';

const hiddenDiv = {
  visibility: 'hidden'
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {},
      errorMessage: '',
      selectedStage: ''
    };
    this.changeStage = this.changeStage.bind(this);
  }

  changeStage(newStage) {
    this.setState({ selectedStage: newStage });
  }

  render() {
    let stage;
    switch (this.state.selectedStage) {
      case 'challenges':
        stage = <Challenges />;
        break;
      case 'history':
        stage = <History />;
        break;
      case 'market':
        stage = <Market changeStage={this.changeStage} />;
        break;
      default:
        stage = <Summary />;
        break;
    }
    return (
      <div className="screen">
        <div className="navigationbar">
          <div id="leftnav" role="presentation" className="leftnav" onClick={() => this.changeStage('challenges')}>
            {(this.state.selectedStage !== 'market') ? '' : '<' }
          </div>
          <div id="navigation" className="bar">{this.state.selectedStage.toUpperCase()}</div>
          <div id="rightnav" role="presentation" className="rightnav" onClick={() => this.changeStage('market')}>
            <img id="rightnavimg" alt="Add Challenge" src="images/add.svg" className="navimg" style={(this.state.selectedStage !== 'challenges') ? hiddenDiv : {}} />
          </div>
        </div>
        <div id="stages" className="stages">
          {stage}
        </div>
        <div className="messagearea" id="messagearea">
          {this.state.errorMessage}
        </div>
        <TabBar selectedStage={this.state.selectedStage} changeStage={this.changeStage} />
      </div>
    );
  }
}

export default Profile;
