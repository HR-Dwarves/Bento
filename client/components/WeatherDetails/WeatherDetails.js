import React from 'react';
import Draggable from 'react-draggable';
import config from './../../config/config';

import styles from './WeatherDetails.css';

class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: null,
      location: null,
      condition: null,
      weatherIcon: null
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
    var context = this;

    // CHANGE AJAX URL TO THIS WHEN LAT/LON PULLING IS COMPLETE
    // url: `http://api.openweathermap.org/data/2.5/weather?lat=${LOCATION_LATITUDE}&long=${LOCATION_LOGITUDE}&type=accurate&units=${unit}&APPID=${context.weatherAPIkey}`,
    $.ajax({
      method: 'GET',
      url: `https://api.apixu.com/v1/current.json?key=${config.apixuWeatherApiKey}&q=94105`,
      dataType: 'json',
      success: function(data) {
        // console.log('DATA FROM WEATHER API: ', data);
        context.setState({
          temperature: Math.round(data.current.temp_f),
          location: data.location.name,
          condition: data.current.condition.text,
          weatherIcon: data.current.condition.icon
        });
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
    let cssCardContent = `${styles.cardContent} card-content`;
    
    return (
      <div className=''>
          <div className={cssCard}>
            <header className='card-header'>
              <p className='card-header-title'>Weather</p>
              <div className="card-header-icon">
                <span className="icon">
                  <i className='fa fa-cloud' aria-hidden='true'></i>
                </span>
              </div>
            </header>
            <div className={cssCardContent}>
              <img src={this.state.weatherIcon} className={styles.image}/>
              <p className={styles.temperature}> 
                {this.state.temperature}ºF
              </p>
            </div>
            <div className={styles.details}>
              <p className={styles.condition}>
                Condtions: <br/>
                {this.state.condition}
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