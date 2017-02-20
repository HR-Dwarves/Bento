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

    setInterval(setTime, 1000) // poll system time every second




    // get saved clocks from db
    this.props.getClocks(this.props.db_key);

    database.ref(`/testUser/modules/${this.props.db_key}`).on('value', () => {
      this.props.getClocks(this.props.db_key);
    });

    let dashboard = this.props.dashboard;

    let dbClocks = dashboard.modules[this.props.db_key].clocks;

    // this.addClock();
    this.setState({
      clocks: dbClocks
    });
    // add the initial clock at local time zone
  }



  addClock(e) {
    // todo, make this not be a guess
    let timeZone = e ? e.target.value : moment.tz.guess()


    // let currentClocks = dashboard.modules[this.state.db_key].clocks;
    // let currentClocks = this.state.clocks;
    let currentClocks = this.props.dashboard.modules[this.props.db_key].clocks;
    let newClocksArray = Array.from(currentClocks);
    newClocksArray.push(timeZone)

    this.props.addToClocks(newClocksArray, this.props.db_key);

    // http://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
    // let newClocks = Array.from(this.state.clocks)
    // newClocks.push(timeZone)

    // this.setState({
    //   clocks: newClocks
    // })
  }

  removeClock(clock) {
    let clocks = this.props.dashboard.modules[this.props.db_key].clocks
    let newClocks = clocks.filter(thisClock => thisClock !== clock);

    // this.setState({
    //   clocks: newClocks
    // })
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.

    let clocks = this.props.dashboard.modules[this.props.db_key].clocks

    return (
      <div className='card'>

        <header className="card-header">
          <p className="card-header-title">
            Location and Time
          </p>
        </header>

        <div className="card-content">
          <div className="media-content">
            <h4 className='title is-4'>Current: {this.state.city}</h4>

              {clocks.map((clock, index) => {
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