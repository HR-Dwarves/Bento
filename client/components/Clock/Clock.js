import React from 'react';
import moment from 'moment'

import styles from './Clock.css';


class Clock extends React.Component {
  constructor() {
    super();
    // this.state = {

    // };

  }

  render() {
    // let cssClasses = `${styles.card} column`;
    return (
      <p className="title is-2">{this.props.time}</p>

    )

  };

}

export default Clock;