import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './Phone/Phone.css';


class TabBar extends Component {

  render() {
    return (
      <div className="tabbar">
        <img id="summary" className="tabimage" alt="summary" src="images/summary.svg" />
        <img id="challenges" className="tabimage" alt="challenges" src="images/target.svg" />
        <img id="history" className="tabimage" alt="history" src="images/time.svg" />
      </div>
    );
  }
}

TabBar.propTypes = {
};

export default TabBar;
