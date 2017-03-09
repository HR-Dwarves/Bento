import React from 'react';
import { Link } from 'react-router';
import styles from './Nav.css'
import Modal from './../Modal/Modal';
import ModuleList from './../../data/moduleList';
import firebaseApp from '../../base';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

const database = firebaseApp.database();

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isFocusOpen: false
    }
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  toggleFocus() {
    var temp = !this.state.isFocusOpen
    this.setState({
      isFocusOpen: temp
    }, () => {
      console.log('isFocusOpen: ', this.state.isFocusOpen);
    });
  }

  handleLogout() {
    var context = this;
    firebaseApp.auth().signOut().then(() => {
      console.log('User signed out');
      context.props.logoutUser();
      context.props.router.push('/signup');
    }, error => {
      console.error('Logout error!');
    })
  }

  render() {
    let mainNavPanelCSS = `${styles.mainNavPanel} is-clearfix`
    let pageTitleCSS = `${styles.pageTitle} has-text-centered`
    let modalButtonStyle = `${styles.modalButton}`
    let userInfoStyle = `${styles.currentUser}`
    let logoutButtonStyle = `${styles.logoutButton} button is-outlined is-dark`;
    let usernameStyle = `${styles.username}`;
    let userWrapperStyle = `${styles.userWrapper} image is-48x48`;
    let modulesArray = Object.keys(ModuleList);
    let user = this.props.user;
    let loggedIn = user.loggedIn;
    let displayButton;
    if (loggedIn) {
      displayButton = {"display": ""}
    } else {
      displayButton = {"display": "none"}
    }
    let displayName;
    if (user) {
      displayName = this.props.user.displayName
      if (displayName) {
        displayName = displayName.replace(" ", "\u00a0");
      }
    } else {
      displayname = '';
    }
    let toggle;
    if(this.state.isModalOpen) {
      toggle = 'fa fa-toggle-on'
    } else {
      toggle = 'fa fa-toggle-off'
    }


    return(
      <div className={mainNavPanelCSS}>
        <div className={userInfoStyle} >
          <button style={displayButton} onClick={this.handleLogout} className={logoutButtonStyle}>Logout</button>
          <div></div>
        </div>
        <Link to="/">
          <div className={pageTitleCSS}>bento</div>
        </Link>
        <div className={modalButtonStyle}>
          <button style={displayButton} onClick={this.handleSettingsButton} className="button is-dark modal-button">
            <i className={toggle} aria-hidden="true"></i>
          </button>
          <ReactCSSTransitionGroup 
            transitionName={ {
              enter: 'bounceInRight',
              leave: 'bounceOutRight',
              appear: 'fadeIn'
            }}>
            {this.state.isModalOpen ? [1].map((key, ind) => {
              return <Modal {...this.props} key={ind} isOpen={this.state.isModalOpen} onClose={this.closeModal} modules={modulesArray}></Modal>
            }) : []}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Nav;

// <button style={displayButton} onClick={this.toggleFocus.bind(this)} className={logoutButtonStyle}>Focus</button>
// <figure style={displayButton} className={userWrapperStyle}>
//   <img className={styles.userImg} src={this.props.user.photoURL} />
// </figure>
