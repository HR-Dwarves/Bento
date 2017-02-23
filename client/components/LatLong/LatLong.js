import React from 'react';
import config from './../../config/config';
import firebaseApp from '../../base';
import moment from 'moment-timezone'

import styles from './LatLong.css';
import Clock from '../Clock/Clock'


const database = firebaseApp.database();

class LatLong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      city: null,
      timeZones: moment.tz.names()
    };
    this.pollForTime;
  }

  componentWillMount() {
    if (!this.props.dashboard.modules[this.props.db_key].clocks) {
      this.addClock();
    }
  }

  componentWillUnmount() {
    clearInterval(this.pollForTime);
  }

  componentDidMount() {
    var context = this;
    const user = this.props.user.uid;
    // TIME
    // TODO: make ntp time api
    // $.get('/myApiEndpointForNTP', function(data) {};

    var setTime = function() {
      var now = new Date();
      var UTCstring = now.toUTCString();

      context.setState({
        time: UTCstring
      });
    }

    this.pollForTime = setInterval(setTime, 1000) // poll system time every second

    // get saved clocks from db
    this.props.getClocks(this.props.db_key, user);

    database.ref(`/${user}/modules/${this.props.db_key}`).on('value', () => {
      this.props.getClocks(this.props.db_key, user);
    });
  }

  addClock(e) {
    // todo, make this not be a guess
    let timeZone = e ? e.target.value : moment.tz.guess()
    const user = this.props.user.uid;

    // firebase doesn't have native arrays
    // but we can create that by pulling down the current as array
    // reading it as an array. Firebase will interpret as an array that way
    // or as an object with sequential numerical keys.
    let currentClocks = this.props.dashboard.modules[this.props.db_key].clocks || [];
    let newClocksArray = Array.from(currentClocks);

    newClocksArray.push(timeZone)
    this.props.addToClocks(newClocksArray, this.props.db_key, user);
  }

  removeClock(clock) {
    let currentClocks = this.props.dashboard.modules[this.props.db_key].clocks;
    let newClocksArray = currentClocks.filter(thisClock => thisClock !== clock);

    this.props.addToClocks(newClocksArray, this.props.db_key, user);
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    let clocks = this.props.dashboard.modules[this.props.db_key].clocks;

    return (
      <div className='card'>

        <header className="card-header">
          <p className="card-header-title">Time</p>
          <div className="card-header-icon">
            <span className="icon"><i className='fa fa-clock-o' aria-hidden='true'></i></span>
            {this.props.dashboard.currentCity &&
              <span className="icon"><i className='fa fa-map-marker' aria-hidden='true'></i></span>}
          </div>
        </header>

        <div className="card-content">
          <div className="media-content">
            {this.props.dashboard.currentCity &&
              <h4 className='title is-4'>Current: {this.props.dashboard.currentCity}</h4>}
              {clocks &&
                clocks.map((clock, index) => {
                return <Clock
                        key={index}
                        time={this.state.time}
                        timeZone={clock}
                        delete={this.removeClock.bind(this, clock)} />
              })}
            <form>
              <p className="control">
                <span className="select">
                  <select onChange={this.addClock.bind(this)}>
                    {this.state.timeZones.map((timeZone, index) => {
                      return <option key={index}>{timeZone}</option>;
                    })}
                  </select>
                </span>
              </p>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default LatLong;