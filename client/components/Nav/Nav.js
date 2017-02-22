import React from 'react';
import { Link } from 'react-router';
import styles from './Nav.css'
import Modal from './../Modal/Modal';
import ModuleList from './../../data/moduleList'

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {isModalOpen: false}
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    let mainNavPanelCSS = `${styles.mainNavPanel} is-clearfix`
    let pageTitleCSS = `${styles.pageTitle} has-text-centered`
    let modalButtonStyle = `${styles.modalButton}`
    let userInfoStyle = `${styles.currentUser}`
    let modulesArray = Object.keys(ModuleList);

    return(
      <div className={mainNavPanelCSS}>
        <div className={userInfoStyle}>
          <span>{this.props.user.displayName}</span>
        </div>
        <Link to="/">
          <div className={pageTitleCSS}>dashboard</div>
        </Link>
        <div className={modalButtonStyle}>
          <button onClick={this.handleSettingsButton} className="button is-primary modal-button">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          <Modal {...this.props} isOpen={this.state.isModalOpen} onClose={this.closeModal} modules={modulesArray}></Modal>
        </div>
      </div>
    )
  }
}


export default Nav;
