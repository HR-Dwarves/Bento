import React from 'react';
import config from './../../config/config';
import moment from 'moment'

import styles from './LatLong.css';


class LatLong extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      long: null,
      time: null,
      city: null
    };

    // BENSON FOR THE good idea!!
    // this.setState = this.setState.bind(this);
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

        context.setState({
          lat: lat,
          long: long
        });



        // LOCATION
        // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
        let queryBase = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        let query = `${queryBase}${lat},${long}&key=${config.googleApiKey}`

        $.get(query, function(data) {
          // console.log('data from ajax get from google', data.results[0])
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
      console.log('no geo');
    }

    // TIME
    var getTime = function() {
      return moment().format("ddd, MMM Do, h:mm a");
    }

    var setTime = function() {
      context.setState({
        time: getTime()
      });
    }

    setInterval(setTime, 1000)





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
              <p className="title is-2">{this.state.time}</p>
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




