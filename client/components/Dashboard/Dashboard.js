import React from 'react';
import firebaseApp from '../../base';
import styles from './Dashboard.css';
import Promise from 'bluebird';

// All modules now passed into ModuleWrapper
import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';
const database = firebaseApp.database();


class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = { isModalOpen: false}
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // var user = firebaseApp.auth().currentUser;
    let context = this;
    let user;
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('USER', user);
        context.props.authenticateUser(user);
      } else {
        console.erorr('NO USER');
        // Remove user information from state

      }
    })
    // this.props.authenticateUser(user);
    // console.log('USER', user);
    this.props.getDatabase();
    database.ref('/testUser').on('value', (snapshot) => {
      this.props.getDatabase();
    });

    // ask user for geocoordinates
    if ("geolocation" in navigator) {
      this.props.getGeolocation();
    }
  }

  handleSettingsButton() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }

  render() {
    let dashboard = this.props.dashboard;
    let modules, wrappers;

    if (dashboard) {
      modules = dashboard.modules
      if (modules) {
        wrappers = Object.keys(modules).map((moduleKey) => {
          var additionalProps = {
            key: moduleKey,
            db_key: moduleKey,
            type: modules[moduleKey].type
          }
          var newProps = Object.assign({}, this.props, additionalProps)
          return React.createElement(ModuleWrapper, newProps);
        });
      }
    }

    let mainDashboardPanelCSS = `${styles.mainDashboardPanel}`;
    let componentStyle = `${styles.component}`;
    let dashContainer = `${styles.dashContainer}`;
    let defaultModule = <div className={componentStyle}><DefaultModule key={'abcd'}/></div>;

    return (
      <div className={dashContainer}>
        <div className={mainDashboardPanelCSS}>
            {wrappers ? wrappers.map((wrapper) => (<div className={componentStyle}>
                                         {wrapper}
                                         </div>)) : defaultModule }
        </div>
      </div>
    )
  }
}

export default Dashboard;
