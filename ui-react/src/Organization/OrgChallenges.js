import React, { Component } from 'react';
import { Icon, Button, Card, CardContent, OverflowMenuItem, OverflowMenu, CardFooter, CardStatus, CardActions, CardActionItem } from 'carbon-components-react';
import API from '../callAPI';
import './carbon-components.css';
import './OrgChallenges.css';

class OrgChallenges extends Component {

  constructor(props) {
    super(props);
    this.state = {
      marketChallenges: []
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();
  }

  getChallenges() {
    API.getRequest('/api/market/challenges').then(body =>
          this.setState({ marketChallenges: body }));
  }

  onClick(challenge) {
    console.log(challenge);
  }
  render() {
    return (
      <div className="orgChallenges">
        <h3>All Challenges ({this.state.marketChallenges.length})</h3>
        <div className="actionContainer">
          <Button small>New Challenge</Button>
        </div>
        <div className="cardContainer">
          {
            this.state.marketChallenges.map(challenge => (
              <Card key={challenge._id} onClick={() => this.onClick(challenge)} className="challengeCard">
                <div className="overflowMenuContainer">
                  <OverflowMenu className="overflowMenu">
                    <OverflowMenuItem className="some-class" itemText="Stop App" />
                  </OverflowMenu>
                </div>
                <div className="bx--card-overview__about" >
                  <div className="bx--about__icon">
                    <img className="orgChallengeIcon" src={`images/${challenge.image}`} alt="challenge" />
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

                <CardFooter>
                  <CardStatus runningText="Active" />
                  <CardActions>
                    <CardActionItem iconName="restart_icon" />
                  </CardActions>
                </CardFooter>
              </Card>
          ))
          }
        </div>
      </div>
    );
  }
}

export default OrgChallenges;
