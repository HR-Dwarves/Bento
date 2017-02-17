import React from 'react';
import { Link } from 'react-router';

import styles from './Main.css'
import Nav from '../Nav/Nav'

const Main = React.createClass({
  render() {
    return (
      <div>
        <Nav />
        <h1>
          <Link to="/">Dashboard</Link>
        </h1>
        {React.cloneElement({...this.props}.children, {...this.props})}
      </div>
    )
  }
});

export default Main;