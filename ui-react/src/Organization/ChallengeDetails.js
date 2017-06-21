import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
import OrgLayout from './OrgLayout';
import './ChallengeDetails.css';
import API from '../callAPI';

class ChallengeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      challengeDetails: {},
      challengeSummary: {}
    };
    this.getChallenges = this.getChallengeDetails.bind(this);
  }

  componentDidMount() {
    this.getChallengeDetails();
  }

  getChallengeDetails() {
    API.getRequest(`/api/organization/challenges/${this.props.params.challengeId}`).then(challengeDetails =>
          this.setState({ challengeDetails }));

    API.getRequest(`/api/organization/challenges/${this.props.params.challengeId}/summary`).then(challengeSummary =>
          this.setState({ challengeSummary }));
  }

  render() {
    const challenge = this.state.challengeDetails;
    const summary = this.state.challengeSummary;
    return (
      <OrgLayout>

        <Breadcrumb className="some-class">
          <BreadcrumbItem>
            <Link to="/organization">Challenges</Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <h3>{challenge.title}</h3>
        <br />
        <div className="summary-container">
          <div className="summary-item">
            <div className="org-challenge-icon-container">
              <img className="orgChallengeIcon" src={`/images/${challenge.image}`} alt="challenge" />
            </div>
            <div className="org-summary-text">Activity</div>
          </div>
          <div className="summary-item">
            <div className="org-challenge-text-container">
              {summary.participants}
            </div>
            <div className="org-summary-text">Participants</div>
          </div>
          <div className="summary-item">
            <div className="org-challenge-text-container">
              {summary.workouts}
            </div>
            <div className="org-summary-text">Completed</div>
          </div>
          <div className="summary-item">
            <div className="org-challenge-text-container">
              {summary.participants}
            </div>
            <div className="org-summary-text">Days to Go</div>
          </div>
        </div>

      </OrgLayout>
    );
  }
}

export default ChallengeDetails;
