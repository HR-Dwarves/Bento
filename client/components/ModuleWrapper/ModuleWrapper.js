import React from 'react';
import firebaseApp from '../../base';
import styles from './ModuleWrapper.css';
import moduleMapping from '../../data/moduleMapping';
import defaultNotifications from '../../data/defaultNotifications';
import _ from 'underscore';

const database = firebaseApp.database();

class ModuleWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      mouseOver: false
    }
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleDelete = _.debounce(this.handleDelete.bind(this), 300, true);
    this.handleMouseMovements = this.handleMouseMovements.bind(this);
    this.handleHelp = this.handleHelp.bind(this);
  }

  componentDidMount() {
    let type;
    if (this.props) {
      type = this.props.type;
      let notifications = this.props.notifications.items;
      let exists = this.props.notifications.types[type];

      if (!exists) {
        let newNotification = type ? defaultNotifications[type] : defaultNotifications['Default'];
        // this.props.addNotification(newNotification);
      }
    }
  }

  handleDelete() {
    let db_key = this.props.db_key;
    let user = this.props.user.uid;

    this.props.deleteModule(db_key, user);
  }

  handleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleHelp() {
    let type = this.props.type;
    let exists = this.props.notifications.types[type];
    let notification = defaultNotifications[type] ? defaultNotifications[type] : defaultNotifications['Default'];
    if (!exists) {
      let newNotification = Object.assign({}, notification);
      this.props.addNotification(newNotification);
    }
  }

  handleMouseMovements() {
    console.log('Mouse movement observed!');
    this.setState({
      mouseOver: !this.state.mouseOver
    })
  }

  render() {
    let type = this.props.type;
    let component = moduleMapping[type];
    let wrapperStyle = `${styles.wrapper} grid-item`;
    let moduleStyle = `${styles.module}`;
    let deleteButton = `${styles.delete} icon fa fa-times-circle`;
    let helpButton = `${styles.help} icon fa fa-question-circle-o`;

    return (
        <div className={wrapperStyle} onMouseEnter={() => this.handleMouseMovements} onMouseLeave={() => this.handleMouseMovements}>
          <i className={deleteButton} onClick={this.handleDelete} aria-hidden="true"></i>
          <i className={helpButton} onClick={this.handleHelp} aria-hidden="true"></i>
          <div className={moduleStyle}>
            {React.createElement(component, {...this.props})}
          </div>
        </div>
    )
  }
}

export default ModuleWrapper;