import React from 'react';
import moment from 'moment'

import styles from './Clock.css';

class Clock extends React.Component {
  constructor() {
    super();
  }

  render() {
    let converted = moment.tz(this.props.timeZone);

    let convertedDate = converted.format("ddd, MMM Do")
    let convertedTime = converted.format("h:mm a");

    return (
      <div className="box">
        <button className="delete is-small is-pulled-right" onClick={this.props.delete}></button>
        <h5 className="title is-5">{this.props.timeZone}</h5>

        {(convertedTime !== 'Invalid date' && convertedDate !== 'Invalid date') &&
          <h4 className="title is-4">{convertedDate}</h4>
        }

        {(convertedTime !== 'Invalid date' && convertedDate !== 'Invalid date') &&
          <h2 className="subtitle is-1">{convertedTime}</h2>
        }
      </div>
    )
  };
}

export default Clock;