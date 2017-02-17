import React from 'react';
import database from '../../base'

import styles from './Dashboard.css'

// Import dashboard components as you add them!
import List from '../List/List';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.components = {
      'List': List
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
    return (
      <div className='section'>
        <div className='container is-fluid'>
          <div className='columns'>
            {elements ? elements : []}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;

