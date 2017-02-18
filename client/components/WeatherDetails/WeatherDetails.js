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
    this.weatherAPIkey = config.openWeatherMapAPIKey;
  }

  componentDidMount() {
    var context = this;
    var unit = this.state.units.fahrenheit;
    $.ajax({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?id=5391997&type=accurate&units=' + unit + '&APPID=' + context.weatherAPIkey,
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

  render() {
    let cssCard = `${styles.card} card`;
    let cssCardContent = `${styles.cardImage} card-content`
    return (
      <div className='column'>
        <Draggable bounds='body'>
          <div className={cssCard}>
            <header className='card-header'>
              <p className='card-header-title'>Weather</p>
            </header>
            <div className={cssCardContent}>
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
        </Draggable>
      </div>
    )
  }
}

export default WeatherDetails;