import React from 'react';
import firebaseApp from '../../base';
import styles from './Dashboard.css';
import Promise from 'bluebird';

import ReactGrid from '../ReactGrid/ReactGrid';
// All modules now passed into ModuleWrapper
import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';
import Nav from '../Nav/Nav';
import Loading from '../Loading/Loading';
import Notifications from '../Notifications/Notifications';

import defaultNotifications from '../../data/defaultNotifications';

const database = firebaseApp.database();


class Dashboard extends React.Component {
  constructor() {
    super();

    this.state = {
      isModalOpen: false,
      databaseResponded: false
    }
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {

    let context = this;
    let user;
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        let {displayName, uid, email, photoURL} = user;
        let userId = uid || 'testUser';
        context.props.authenticateUser(user);
        context.props.getDatabase(uid);
        // GET LAYOUTS HERE
        context.props.getLayouts(uid);
        database.ref(`users/${userId}`).on('value', (snapshot) => {
          let data = snapshot.val();
          context.setState({
            databaseResponded: true
          })
          this.props.setDatabase(data);
        });
      } else {
        console.error('NO USER');
        context.props.router.push('/signup');
      }
    })
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
    let dashContainer = `${styles.dashContainer}`;
    let mainDashboardPanelCSS = `${styles.mainDashboardPanel}`;

    if (this.state.databaseResponded) {


      return (
        <div className={dashContainer}>
          <Nav {...this.props}/>
          <div className={mainDashboardPanelCSS}>
            <Notifications {...this.props} />
            <ReactGrid {...this.props} />
          </div>
        </div>
      )
    } else {
      return (
        <div className={dashContainer}>
          <div className={mainDashboardPanelCSS}>
            <Loading />
          </div>
        </div>
      )
    }

  }
}

export default Dashboard;

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch(e) {
      console.error(e);
    }
  }
  return ls[key];
}

