import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Notifications.css';


import firebaseApp from '../../base';
const database = firebaseApp.database();

class Notifications extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {

  }

  handleDismiss() {

  }

  render() {
    let notifications = this.props.notifications.items;
    let notificationsStyle = `${styles.notifications}`;
    // console.log(Array.isArray(notifications));

    return (
      <div className={notificationsStyle}>
        <ReactCSSTransitionGroup
        transitionName="module"
        transitionName={{enter: "bounceInRight", 
        leave: "bounceOutRight",
        appear: "bounceInRight"}}
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}>
          {notifications ? notifications.map((item, index) => {
            return <NotificationItem key={JSON.stringify(item)} index={index} {...item} removeNotification={this.props.removeNotification}/>
          }) : []}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

class NotificationItem extends React.Component {
  constructor() {
    super();

    this.handleDismiss = this.handleDismiss.bind(this);

  }

  componentDidMount() {
    // If dismiss is true, add SetTimeout for automatic dismissal after [3] seconds
    if (this.props) {
      let dismiss = this.props.dismiss;
      let timeout = this.props.timeout || 3000;
      if (dismiss) {
        let index = this.props.index;
        setTimeout(function(index){
          console.log('SET TIMEOUT FIRED', index);
          this.props.removeNotification(index)
        }.bind(this, index), timeout);
      }
    }
  }

  componentWillUnmount() {
    // Remove interval?
    // Not needed since setTimeout only runs once
  }

  handleDismiss() {
    // Remove notification from list upon click
    let index = this.props.index;
    this.props.removeNotification(index);
  }

  render() {
    let notificationStyle = `${styles.notification} notification animated box`;
    let dismissStyle = `${styles.dismiss} icon fa fa-times-circle`;

    return (
      <div className={notificationStyle}>
        <i className={dismissStyle} onClick={this.handleDismiss} aria-hidden="true"></i>
        <span>
          {this.props.text}
        </span>
      </div>
    )
  }
}

export default Notifications;
