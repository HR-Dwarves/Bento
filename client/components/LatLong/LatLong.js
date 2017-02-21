import React from 'react';
import config from './../../config/config';
import database from '../../base'
import moment from 'moment-timezone'

import styles from './LatLong.css';
import Clock from '../Clock/Clock'


class LatLong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      long: null,
      time: null,
      city: null,
      // clocks: [],
      // clocks: this.props.dashboard.modules[this.props.db_key].clocks,
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

    // GEOLOCATION
    let apiKey = config.googleApiKey;

    if ("geolocation" in navigator) {
      /* geolocation is available */

      navigator.geolocation.getCurrentPosition(function(position) {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', long);

        context.setState({
          lat: lat,
          long: long
        });

        // LOCATION
        // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
        let queryBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        let query = `${queryBase}${lat},${long}&key=${config.googleApiKey}`

        $.get(query, function(data) {
          var city = data.results[0].address_components.reduce(function(acc, item) {
            if (item.types.includes('locality')) {
              return acc = item.long_name;
            } else {
              return acc;
            }
          })

          context.setState({
            city: city
          });
        });
      });
    } else {
      // no geo
    }

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
    this.props.getClocks(this.props.db_key);

    database.ref(`/testUser/modules/${this.props.db_key}`).on('value', () => {
      this.props.getClocks(this.props.db_key);
    });
  }

  addClock(e) {
    // todo, make this not be a guess
    let timeZone = e ? e.target.value : moment.tz.guess()

    // firebase doesn't have native arrays
    // but we can create that by pulling down the current as array
    // reading it as an array. Firebase will interpret as an array that way
    // or as an object with sequential numerical keys.
    let currentClocks = this.props.dashboard.modules[this.props.db_key].clocks || [];
    let newClocksArray = Array.from(currentClocks);

    newClocksArray.push(timeZone)
    this.props.addToClocks(newClocksArray, this.props.db_key);
  }

  removeClock(clock) {
    let currentClocks = this.props.dashboard.modules[this.props.db_key].clocks;
    let newClocksArray = currentClocks.filter(thisClock => thisClock !== clock);

    this.props.addToClocks(newClocksArray, this.props.db_key);
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    let clocks = this.props.dashboard.modules[this.props.db_key].clocks;

    return (
      <div className='card'>

        <header className="card-header">
          <p className="card-header-title">Location and Time</p>
          <div className="card-header-icon">
            <span><i className='fa fa-clock-o' aria-hidden='true'></i></span>
            <span><i className='fa fa-map-marker' aria-hidden='true'></i></span>
          </div>
        </header>

        <div className="card-content">
          <div className="media-content">
            <h4 className='title is-4'>Current: {this.state.city}</h4>

              {clocks &&
                clocks.map((clock, index) => {
                return <Clock
                        key={index}
                        time={this.state.time}
                        timeZone={clock}
                        delete={this.removeClock.bind(this, clock)} />
              })}

            <p className="title is-4">Add a clock in a timezone</p>
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