import React, { Component } from 'react';
import '../Phone/Phone.css';

class Summary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      marketChallenges: [],
      errorMessage: ''
    };
    this.getChallenges = this.getChallenges.bind(this);
    this.getChallenges();
  }

  getChallenges() {
    fetch('/api/market/challenges', {
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        response.json().then(challenges =>
          this.setState(
            { marketChallenges: challenges }));
        return response;
      }
      this.setState({ errorMessage: 'Error calling API.' });
      return response;
    });
  }

  render() {
    return (
      <div id="marketstage" className="stage">
        <div className="challengelist" id="marketlist">
          {this.state.marketChallenges.map((challenge, index) => (
            <div className="marketitem" >
              <div className="challengetitle">
                {challenge.title}
              </div>
              <div className="marketvisual" >
                <img className="marketicon" alt={challenge.title} src={`images/${challenge.image}`} />
              </div>
              <div className="marketdescription">
                {challenge.description}
              </div>
              <button className="marketbutton">
                ACCEPT CHALLENGE
              </button>
            </div>

          ))}
        </div>
      </div>
    );
  }
}

export default Summary;
