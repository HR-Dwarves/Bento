import React from 'react';
import database from '../base'

// Import dashboard components as you add them!
import List from './List';

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getDatabase();
    database.ref('/testUser').on('value', () => {
      this.props.getDatabase();
    });
  }

  render() {
    return (
      <div>
        <List {...this.props} {...this.props.children}/>
      </div>
    ) 
  }
}

export default Dashboard;