import React, { Component } from 'react';
import { Button, Card, OverflowMenuItem, OverflowMenu, CardFooter, CardStatus } from 'carbon-components-react';
import { Link } from 'react-router';
import API from '../callAPI';
import './OrgChallenges.css';
import OrgLayout from './OrgLayout';
import { browserHistory } from 'react-router';

class OrgChallenges extends Component {

  constructor(props) {
    super(props);
    this.state = {
      marketChallenges: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();
  }

  onClick(challenge) {
    browserHistory.push(`/organization/challenge/${challenge._id}`);
  }

  getChallenges() {
    API.getRequest('/api/organization/challenges').then((body) => {
      if (body) this.setState({ marketChallenges: body });
    });
  }


  render() {
    return (
      <OrgLayout>
        <div className="organization">
          <div className="orgChallengesContainer">
            <h3>All Challenges ({this.state.marketChallenges.length})</h3>
            <div className="actionContainer">
              <Link to="/organization/newChallenge"><Button small>New Challenge</Button></Link>
            </div>
            <div className="cardContainer">
              {
            this.state.marketChallenges.map(challenge => (
              <Card key={challenge._id} onClick={() => this.onClick(challenge)} className="challengeCard">
                <div className="overflowMenuContainer">
                  <OverflowMenu className="overflowMenu">
                    <OverflowMenuItem className="fcTextInput" itemText="End" />
                    <OverflowMenuItem className="fcTextInput" itemText="Delete" />
                  </OverflowMenu>
                </div>
                <div className="bx--card-overview__about" >
                  <div className="bx--about__icon">
                    <img className="orgChallengeIcon" src={`../images/${challenge.image}`} alt="challenge" />
                  </div>
                  <div className="bx--about__title" >
                    <p id="card-app-title" className="bx--about__title--name">
                      {challenge.title}
                    </p>
                    <h4 className="bx--about__title--additional-info">
                      {challenge.description}
                    </h4>
                  </div>
                </div>

                <CardFooter className="challengeCardFooter">
                  <CardStatus runningText="Active" />

                </CardFooter>
              </Card>
          ))
          }
            </div>
            <div>{this.state.errorMessage}</div>
          </div>
        </div>
      </OrgLayout>
    );
  }
}

export default OrgChallenges;
