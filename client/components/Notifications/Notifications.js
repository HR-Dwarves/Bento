import React from 'react';
import styles from './Notifications.css';

import firebaseApp from '../../base';
const database = firebaseApp.database();

class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {
      notifications: [
        {text: 'hello', dismiss: false},
        {text: 'goodbye cruel world', dismiss: true}
      ]
    };
  }

  componentDidMount() {

  }

  handleDismiss() {

  }

  render() {
    let notifications = this.state.notifications;
    let notificationsStyle = `${styles.notifications}`;

    return (
      <div className={notificationsStyle}>
        {notifications ? notifications.map((item, index) => {
          return <NotificationItem key={JSON.stringify(item)} index={index} dismiss={item.dismiss} text={item.text}/>
        }) : []}
      </div>
    )
  }
}

class NotificationItem extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    
  }

  handleDismiss() {

  }

  render() {
    let notificationStyle = `${styles.notification} notification`;

    return (
      <div className={notificationStyle}>
        <span>
          {this.props.text} / {JSON.stringify(this.props.dismiss)}
        </span>
      </div>
    )
  }
}

export default Notifications;
