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
    let locationArray = this.props.timeZone.split('/');
    let continent = locationArray[0];
    let city = locationArray[1].replace('_', ' ');

    // Styles
    let boxStyle = `${styles.box} box`;

    return (
      <div className={boxStyle}>
        <div className={styles.deleteTime}>
          <span className="icon is-small">
            <i onClick={this.props.delete} 
               className="fa fa-times-circle level" 
               aria-hidden="true"></i>
          </span>
        </div>
        <div className={styles.timeInfo}>
          <div className={styles.city}>
            <h5 className="title is-5">{city}</h5>
          </div>
          <div className={styles.date}>
            {(convertedTime !== 'Invalid date' && convertedDate !== 'Invalid date') &&
              <h5 className="title is-5">{convertedDate}</h5>
            }
          </div>
        </div>

        {(convertedTime !== 'Invalid date' && convertedDate !== 'Invalid date') &&
          <h2 className="subtitle is-1">{convertedTime}</h2>
        }
      </div>
    )
  };
}

export default Clock;

