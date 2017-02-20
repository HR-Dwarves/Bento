import React from 'react';
import { Link } from 'react-router';
import styles from './Nav.css'
import Modal from './../Modal/Modal'

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

    return(
      <div className={mainNavPanelCSS}>
        <Link to="/">
          <div className={pageTitleCSS}>dashboard</div>
        </Link>
        <button onClick={this.handleSettingsButton} className="button is-primary modal-button"><i className="fa fa-cog" aria-hidden="true"></i></button>
        <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} modules={['List', 'NewsFeed']}></Modal>
      </div>
    )
  }
}

// const Nav = React.createClass({

//   render() {
//     let mainNavPanelCSS = `${styles.mainNavPanel} is-clearfix`
//     let pageTitleCSS = `${styles.pageTitle} has-text-centered`
    
//     return (
//       <div className={mainNavPanelCSS}>
//         <Link to="/">
//           <div className={pageTitleCSS}>dashboard</div>
//         </Link>
//         <button className="button is-primary modal-button"><i className="fa fa-cog" aria-hidden="true"></i></button>
//       </div>
//     )
//   }
// });

export default Nav;
