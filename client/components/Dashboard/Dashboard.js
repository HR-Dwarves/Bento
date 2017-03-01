import React from 'react';
import firebaseApp from '../../base';
import styles from './Dashboard.css';
import Promise from 'bluebird';
<<<<<<< HEAD
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
=======
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactGrid from '../ReactGrid/ReactGrid';
>>>>>>> mason


// All modules now passed into ModuleWrapper
import DefaultModule from '../DefaultModule/DefaultModule';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';
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
        database.ref(`users/${userId}`).on('value', (snapshot) => {
          // USE OTHER FUNCTION THAN GET DATABASE -- TOO SLOW
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

    // this.hide();
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
    // let dashboard = this.props.dashboard;
    // let modules, wrappers;

    // if (dashboard) {
    //   modules = dashboard.modules
    //   if (modules) {
    //     wrappers = Object.keys(modules).map((moduleKey) => {
    //       var additionalProps = {
    //         key: moduleKey,
    //         db_key: moduleKey,
    //         type: modules[moduleKey].type
    //       }
    //       var newProps = Object.assign({}, this.props, additionalProps)
    //       return React.createElement(ModuleWrapper, newProps);
    //     });
    //   }
    // }

    let dashContainer = `${styles.dashContainer}`;
    let mainDashboardPanelCSS = `${styles.mainDashboardPanel}`;
<<<<<<< HEAD
    let componentStyle = `${styles.component} animated`;
    let defaultModule = <div className={componentStyle}><DefaultModule key={'abcd'}/></div>;
=======
    // let componentStyle = `${styles.component} animated`;
    // let defaultModule = <div className={componentStyle}><DefaultModule key={'abcd'}/></div>;
>>>>>>> mason
    let loader = `${styles.loader}`;

    if (this.state.databaseResponded) {
      return (
        <div className={dashContainer}>
          <div className={mainDashboardPanelCSS}>
<<<<<<< HEAD
            <ReactCSSTransitionGroup
                // transitionName="module"
                transitionName={{enter: "bounceInUp", leave: "bounceOutDown"}}
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
              {wrappers ? wrappers.map((wrapper, ind) => (
                <div className={componentStyle} key={ind}>
                    {wrapper}
                </div>
                )) : defaultModule }
            </ReactCSSTransitionGroup>
=======
            <ReactGrid {...this.props}/>
>>>>>>> mason
          </div>
        </div>
      )
    } else {
      return (
        <div className={dashContainer}>
          <img className={loader} src="https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/rolling.gif?alt=media&token=85a30250-6288-4ec9-89a9-60e6a06071f7" alt=""/>
        </div>
      )
    }

  }
}

export default Dashboard;



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
