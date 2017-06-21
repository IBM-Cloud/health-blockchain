import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem, DetailPageHeader, Icon, Module, ModuleHeader, ModuleBody } from 'carbon-components-react';
import OrgLayout from './OrgLayout';
import './ChallengeDetails.css';
import API from '../callAPI';

class ChallengeDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      challengeDetails: {},
      challengeSummary: {
        participants: '-',
        rewards: {
          granted: '-',
          reserved: '-',
          remaining: '-'
        }
      }
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
        <DetailPageHeader title={challenge.title} statusText="Active">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/organization">Challenges</Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </DetailPageHeader>
        <Module size="double">
          <ModuleHeader>
            Overview
          </ModuleHeader>
          <ModuleBody>
            <div className="indicators">
              <div className="indicator">
                <div className="indicator-value">
                  <img className="indicator-icon" src={`/images/${challenge.image}`} />
                </div>
                <div className="indicator-label">
                  {challenge.activity}
                </div>
              </div>
              <div className="indicator">
                <div className="indicator-value">
                  {summary.participants}
                </div>
                <div className="indicator-label">Participants</div>
              </div>
              <div className="indicator">
                <div className="indicator-value">
                  {summary.rewards.reserved}
                </div>
                <div className="indicator-label">Token<br/>Reserved</div>
              </div>
              <div className="indicator">
                <div className="indicator-value">
                  {summary.rewards.granted}
                </div>
                <div className="indicator-label">Rewards<br/>Granted</div>
              </div>
              <div className="indicator">
                <div className="indicator-value">
                  {summary.rewards.remaining}
                </div>
                <div className="indicator-label">Tokens<br/>Remaining</div>
              </div>
            </div>
          </ModuleBody>
        </Module>
      </OrgLayout>
    );
  }
}

export default ChallengeDetails;
