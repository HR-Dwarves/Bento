import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Notifications.css';


import firebaseApp from '../../base';
const database = firebaseApp.database();

class Notifications extends React.Component {
  constructor() {
    super();
  }

  render() {
    let notifications = this.props.notifications.items;
    let notificationsStyle = `${styles.notifications}`;

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
            let key = JSON.stringify(item);
            return <NotificationItem key={key} index={index} {...item} removeNotification={this.props.removeNotification}/>
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
    if (this.props) {
      let dismiss = this.props.dismiss;
      let timeout = this.props.timeout || 3000;
      if (dismiss) {
        let index = this.props.index;
        this.timeout = setTimeout(function(index){
          console.log('SET TIMEOUT FIRED', index);
          this.props.removeNotification(index)
        }.bind(this, index), timeout);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  handleDismiss() {
    // Remove notification from list upon click
    let index = this.props.index;
    this.props.removeNotification(index);
  }

  render() {
    let notificationStyle = `${styles.notification} notification animated box`;
    let dismissStyle = `${styles.dismiss} icon fa fa-times-circle`;
    let textStyle = `${styles.text} content`;

    return (
      <div className={notificationStyle}>
        <i className={dismissStyle} onClick={this.handleDismiss} aria-hidden="true"></i>
        <div className={textStyle}>
          {this.props.text.split('\n').map((sent) => <p>{sent}</p>)}
        </div>
      </div>
    )
  }
}

export default Notifications;
