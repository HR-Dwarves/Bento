import React from 'react';
import { Link } from 'react-router';

import styles from './Main.css'
import Nav from '../Nav/Nav'

const Main = React.createClass({
  render() {
    return (
      <div>
        <Nav {...this.props}/>
        {React.cloneElement({...this.props}.children, {...this.props})}
      </div>
    )
  }
});

export default Main;