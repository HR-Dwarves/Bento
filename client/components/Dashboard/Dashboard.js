import React from 'react';
import database from '../../base'

import styles from './Dashboard.css'

// Import dashboard components as you add them!
import List from '../List/List';
import NewsFeed from '../NewsFeed/NewsFeed';
import WeatherDetails from '../WeatherDetails/WeatherDetails';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.components = {
      'List': List,
      'NewsFeed': NewsFeed,
      'WeatherDetails': WeatherDetails
    }
  }

  componentDidMount() {
    this.props.getDatabase();
    database.ref('/testUser').on('value', () => {
      this.props.getDatabase();
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

    let mainDashboardPanelCSS = `${styles.mainDashboardPanel} container is-fluid`

    return (
      <div className='section' height='100vh'>
        <div className={mainDashboardPanelCSS}>
          <select>
            {modulesArray.map((item, key) => <option>{item}</option>)}
          </select>
          <div className='columns'>
            {elements ? elements : []}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;

