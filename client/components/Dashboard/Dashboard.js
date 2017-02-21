import React from 'react';
import database from '../../base';
import styles from './Dashboard.css';
import Promise from 'bluebird';

// Import dashboard components as you add them!
import DefaultModule from '../DefaultModule/DefaultModule';
import List from '../List/List';
import NewsFeed from '../NewsFeed/NewsFeed';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import StickyNotes from '../StickyNotes/StickyNotes';
import Modal from '../Modal/Modal';
import LatLong from '../LatLong/LatLong';
import ModuleWrapper from '../ModuleWrapper/ModuleWrapper';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.components = {
      'List': List,
      'NewsFeed': NewsFeed,
      'WeatherDetails': WeatherDetails,
      'StickyNotes': StickyNotes,
      'LatLong': LatLong,
      'DefaultModule': DefaultModule
    }
    this.state = { isModalOpen: false}
    this.handleSettingsButton = this.handleSettingsButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.getDatabase();
    database.ref('/testUser').on('value', (snapshot) => {
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
    let modules, elements, wrappers;
    let modulesArray = [];
    let test = [];

    //push each object key into the modules array
    modulesArray = Object.keys(this.components);
    if (dashboard) {
      modules = dashboard.modules
      if (modules) {
        // elements = Object.keys(modules).map((moduleKey) => {
        //   var additionalProps = {
        //     key: moduleKey,
        //     db_key: moduleKey
        //   };
        //   var newProps = Object.assign({}, this.props, additionalProps)
        //   return React.createElement(this.components[modules[moduleKey].type], newProps)
        // });
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

// {elements ? elements.map((element) => (<div className={componentStyle}>
//                                         {element}
//                                         </div>)) : defaultModule }
