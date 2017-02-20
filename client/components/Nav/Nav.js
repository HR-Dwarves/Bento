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
    let modulesArray = Object.keys(ModuleList);
    console.log(ModuleList);

    return(
      <div className={mainNavPanelCSS}>
        <Link to="/">
          <div className={pageTitleCSS}>dashboard</div>
        </Link>
        <button onClick={this.handleSettingsButton} className="button is-primary modal-button"><i className="fa fa-cog" aria-hidden="true"></i></button>
        <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} modules={modulesArray}></Modal>
      </div>
    )
  }
}


export default Nav;
