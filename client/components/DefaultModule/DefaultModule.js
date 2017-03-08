import React from 'react';
import styles from './DefaultModule.css';

import defaultNotifications from '../../data/defaultNotifications';


class DefaultModule extends React.Component{

  componentDidMount() {
    if (!this.props.dashboard.modules) {
      let notification = defaultNotifications['Default'];
      let newNotification = Object.assign({}, notification);
      this.props.addNotification(newNotification);
    }
  }

  render() {
    let defaultStyle = `${styles.defaultCard} card`;

  	return(
  	  <div>
  	  </div>
  	);
  }
}

export default DefaultModule;

// <header className="card-header">
//   <div className="card-header-title">
//     Welcome!
//   </div>
// </header>
// <div className="card-content">
//   <p>To get started, click the settings button above to add modules to your dashboard!</p>
// </div>