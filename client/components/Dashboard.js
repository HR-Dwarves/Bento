import React from 'react';

// Import dashboard components as you add them!
import List from './List';

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getList();
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