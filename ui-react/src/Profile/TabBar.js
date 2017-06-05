import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';

const opacityStyle = {
  opacity: '0.4'
};

class TabBar extends Component {


  render() {
    return (
      <div className="tabbar">
        <div
          role="presentation"
          className="tabButton"
          onClick={() => this.props.changeStage('summary')}
          style={(this.props.selectedStage !== 'summary') ? opacityStyle : {}}
        >
          <img id="summary" className="tabimage" alt="summary" src="images/summary.svg" />
        </div>
        <div
          role="presentation"
          className="tabButton"
          onClick={() => this.props.changeStage('challenges')}
          style={(this.props.selectedStage !== 'challenges' && this.props.selectedStage !== 'market') ? opacityStyle : {}}
        >
          <img id="challenges" className="tabimage" alt="challenges" src="images/target.svg" />
        </div>
        <div
          role="presentation"
          className="tabButton"
          onClick={() => this.props.changeStage('history')}
          style={(this.props.selectedStage !== 'history') ? opacityStyle : {}}
        >
          <img id="history" className="tabimage" alt="history" src="images/time.svg" />
        </div>
      </div>
    );
  }
}

TabBar.propTypes = {
  selectedStage: PropTypes.string,
  changeStage: PropTypes.func.isRequired
};

TabBar.defaultProps = {
  selectedStage: 'summary'
};

export default TabBar;
