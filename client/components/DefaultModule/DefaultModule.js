import React from 'react';
import styles from './DefaultModule.css';

import defaultNotifications from '../../data/defaultNotifications';


class DefaultModule extends React.Component{
  constructor() {
    super();
  }

  componentDidMount() {
    let exists = this.props.notifications.types['Default'];
    if (!exists) {
      let notification = defaultNotifications['Default'];
      let newNotification = Object.assign({}, notification);
      this.props.addNotification(newNotification);
    }

  }

  render() {
  	return(
  	  <div>
  	  </div>
  	);
  }
}

export default DefaultModule;
