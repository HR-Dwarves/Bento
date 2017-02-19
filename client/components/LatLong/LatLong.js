import React from 'react';
import config from './../../config/config';
import moment from 'moment'
import momentTimezone from 'moment-timezone'

import styles from './LatLong.css';
import Clock from '../Clock/Clock'


class LatLong extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      long: null,
      time: null,
      city: null,
      clocks: [],
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
          // console.log('data from ajax get from google', data)
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



    // get local system time
    var getTime = function() {
      return moment().format("ddd, MMM Do, h:mm a");
    }

    var setTime = function() {
      context.setState({
        time: getTime()
      });
    }

    setInterval(setTime, 1000) // poll system time every second

    // this.addClock();

    // this.setState({
    //   timeZones: this.getTimeZones()
    // });
  }

  // getTimeZones() {
  //   return moment.tz.names()
  // }

  addClock() {
  }


  render() {
    // let cssClasses = `${styles.card} column`;
    return (
      <div className='column'>
        <div className='card'>

          <header className="card-header">
            <p className="card-header-title">
              Location and Time
            </p>
          </header>

          <div className="card-content">
            <div className="media-content">

              <p className="title is-4">Add a clock in a timezone</p>
              <p className="control">
                <span className="select">
                  <select>
                    {this.state.timeZones.map((timeZone, index) => {
                      return <option key={index}>{timeZone}</option>;
                    })}
                  </select>
                </span>
              </p>

              <Clock time={this.state.time} />
              <p className="title is-4">{this.state.city}</p>
              <p className="title is-4">Latitude</p>
              <p className="subtitle is-6">{this.state.lat}</p>
              <p className="title is-4">Longitude</p>
              <p className="subtitle is-6">{this.state.long}</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default LatLong;