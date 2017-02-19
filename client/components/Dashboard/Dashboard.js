import React from 'react';
import database from '../../base';
import styles from './Dashboard.css';
import Promise from 'bluebird';

// Import dashboard components as you add them!
import List from '../List/List';
import NewsFeed from '../NewsFeed/NewsFeed';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import StickyNotes from '../StickyNotes/StickyNotes';
import Modal from '../Modal/Modal';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.components = {
      'List': List,
      'NewsFeed': NewsFeed,
      'WeatherDetails': WeatherDetails,
      'StickyNotes': StickyNotes
    }
    this.state = { isModalOpen: false}
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.getDatabase();
    database.ref('/testUser').on('value', () => {
      this.props.getDatabase();
    });
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
    let modules, elements;
    let modulesArray = [];

    //push each object key into the modules array
    modulesArray = Object.keys(this.components);

    if (dashboard) {
      modules = dashboard.modules
      if (modules) {
        elements = Object.keys(modules).map((moduleKey) => {
          var additionalProps = {
            key: moduleKey,
            db_key: moduleKey
          };
          var newProps = Object.assign({}, this.props, additionalProps)
          return React.createElement(this.components[modules[moduleKey].type], newProps)
        });
      }
    }

    let mainDashboardPanelCSS = `${styles.mainDashboardPanel}`;
    let componentStyle = `${styles.component}`;
    let dashContainer = `${styles.dashContainer}`

    return (
      <div className={dashContainer}>
        <div className={mainDashboardPanelCSS}>
            {elements ? elements.map((element) => <div className={componentStyle}>{element}</div>) : []}
        </div>
      </div>
    )
  }
}

// FIND PLACE FOR MODAL AND BUTTON
//   <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} modules={modulesArray}></Modal>
//     <button onClick={this.handleSettingsButton} className="button is-primary modal-button"><i className="fa fa-cog" aria-hidden="true"></i></button>

export default Dashboard;

