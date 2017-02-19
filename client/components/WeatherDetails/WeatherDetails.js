import React from 'react';
import Draggable from 'react-draggable';
import config from './../../config/config';

import styles from './WeatherDetails.css';

class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      temperature: null,
      min: null,
      max: null,
      condition: null,
      location: null,
      units: {
        fahrenheit: 'Imperial',
        celcius: 'Metric',
        kelvin: 'Unit Default'
      }
    }

    this.weatherCondition = {
      'Clear': 'https://68.media.tumblr.com/95f04db0cb5b8ceaf1c4fb1264f2c88d/tumblr_oljwb1sCii1qd4km8o1_400.png',
      'Rain': 'https://68.media.tumblr.com/1024b9f6ee2a91fb93214cbdf224beaf/tumblr_oljwry0gjD1qd4km8o1_400.png',
      'Clouds': 'http://demo.sc.chinaz.com/Files/pic/icons/6256/k19.png'
    }

    this.weatherAPIkey = config.openWeatherMapAPIKey;
    this.getWeatherData = this.getWeatherData.bind(this);
  }

  getWeatherData() {
    var unit = this.state.units.fahrenheit;
    var context = this;

    // CHANGE AJAX URL TO THIS WHEN LAT/LON PULLING IS COMPLETE
    // url: `http://api.openweathermap.org/data/2.5/weather?lat=${LOCATION_LATITUDE}&long=${LOCATION_LOGITUDE}&type=accurate&units=${unit}&APPID=${context.weatherAPIkey}`,
    $.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?id=5391997&type=
            accurate&units=${unit}&APPID=${context.weatherAPIkey}`,
      dataType: 'json',
      success: function(data) {
        // console.log('DATA FROM WEATHER API: ', data);
        if (data.cod === 200) {
          context.setState({
            weatherData: data,
            temperature: data.main.temp,
            min: data.main.temp_min,
            max: data.main.temp_max,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            location: data.name,
          });
        } else {
          console.log('API waiting on request timer');
        }
      },
      error: function(err) {
        console.log(err);
        throw err;
      }
    });
  }

  componentDidMount() {
    // var context = this;
    this.getWeatherData();

    setInterval(() => {
      console.log('grabbing weather');
      this.getWeatherData();
    }, 1800000); // time interval of 30 minutes
  }

  render() {
    let cssCard = `${styles.card} card`;
    let cssCardContent = `${styles.cardImage} card-content`;
    
    let weatherImage = this.weatherCondition[this.state.condition] || this.weatherCondition['Clear'];
    let weatherImageStyle = {
      'backgroundImage': 'url(' + weatherImage + ')',
    };

    return (
      <div className='column'>
          <div className={cssCard}>
            <header className='card-header'>
              <p className='card-header-title'>Weather</p>
              <div className="card-header-icon">
                <span>
                  <i className='fa fa-cloud' aria-hidden='true'></i>
                </span>
              </div>
            </header>
            <div className={cssCardContent} style={weatherImageStyle}>
              <p className={styles.temperature}> 
                <br/>
                {this.state.temperature}ºF
              </p>
            </div>
            <div className={styles.details}>
              <p className={styles.conditions}>
                Condtions: <br/>
                {this.state.description}
              </p>
              <p className={styles.location}>
                Location: <br/>
                {this.state.location}
              </p>
            </div>
          </div>
      </div>
    )
  }
}
        // <Draggable bounds='body'>
        // </Draggable>

export default WeatherDetails;