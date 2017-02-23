import React from 'react';
import { Link } from 'react-router';
import styles from './Nav.css'
import Modal from './../Modal/Modal';
import ModuleList from './../../data/moduleList';
import firebaseApp from '../../base';

const database = firebaseApp.database();

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {isModalOpen: false}
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
    let logoutButtonStyle = `${styles.logoutButton} button is-outlined is-primary`;
    let usernameStyle = `${styles.username}`;
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

    return(
      <div className={mainNavPanelCSS}>
        <div className={userInfoStyle}>
          <button style={displayButton} onClick={this.handleLogout} className={logoutButtonStyle}>Logout</button>
          <figure className="image is-48x48">
            <img className={styles.userImg} src={this.props.user.photoURL} />
          </figure>
        </div>
        <Link to="/">
          <div className={pageTitleCSS}>dashboard</div>
        </Link>
        <div className={modalButtonStyle}>
          <button style={displayButton} onClick={this.handleSettingsButton} className="button is-primary modal-button">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          <Modal {...this.props} isOpen={this.state.isModalOpen} onClose={this.closeModal} modules={modulesArray}></Modal>
        </div>
      </div>
    )
  }
}

// <span className={usernameStyle}>{displayName}</span>

export default Nav;
