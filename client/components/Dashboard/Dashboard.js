import React from 'react';
import firebaseApp from '../../base';
import styles from './Dashboard.css';
import Promise from 'bluebird';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactGrid from '../ReactGrid/ReactGrid';


// All modules now passed into ModuleWrapper
import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';
import Loading from '../Loading/Loading';

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
        // console.log('USER', user);
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
        // Remove user information from state

      }
    })
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
    let dashContainer = `${styles.dashContainer}`;
    let mainDashboardPanelCSS = `${styles.mainDashboardPanel}`;
    let layouts = getFromLS('layouts');

    if (this.state.databaseResponded) {
      return (
        <div className={dashContainer}>
          <div className={mainDashboardPanelCSS}>
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

// {wrappers ? wrappers.map((wrapper, ind) => (
//   <div className={componentStyle} key={ind}>
//       {wrapper}
//   </div>
//   )) : defaultModule }

// <ReactCSSTransitionGroup
//     transitionName="module"
//     transitionName={{enter: "bounceInUp", 
//     leave: "bounceOutDown",
//     appear: "fadeInUp"}}
//     transitionEnterTimeout={1000}
//     transitionLeaveTimeout={1000}>
//     </ReactCSSTransitionGroup>
