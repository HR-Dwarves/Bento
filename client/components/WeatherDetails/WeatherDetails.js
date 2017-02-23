import React from 'react';
import Draggable from 'react-draggable';
import config from './../../config/config';
import firebaseApp from '../../base';

const database = firebaseApp.database();

import styles from './WeatherDetails.css';

class WeatherDetails extends React.Component {
  constructor(props) {
    super(props);

    this.dashboard = this.props.dashboard;
    this.db_key = this.props.db_key;
    this.weatherModule = this.dashboard.modules[this.db_key];
    var context = this;
    console.log('INSIDE CONSTRUCTOR: ', context.weatherModule.zip);

    this.state = {
      temperature: null,
      location: null,
      condition: null,
      weatherIcon: null,
      zipcode: context.weatherModule.zip || 94105
    }

    this.weatherCondition = {
      'Clear': 'https://68.media.tumblr.com/95f04db0cb5b8ceaf1c4fb1264f2c88d/tumblr_oljwb1sCii1qd4km8o1_400.png',
      'Rain': 'https://68.media.tumblr.com/1024b9f6ee2a91fb93214cbdf224beaf/tumblr_oljwry0gjD1qd4km8o1_400.png',
      'Clouds': 'http://demo.sc.chinaz.com/Files/pic/icons/6256/k19.png'
    }

    this.weatherAPIkey = config.openWeatherMapAPIKey;
    this.getWeatherData = this.getWeatherData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getWeatherData() {
    var context = this;

    $.ajax({
      method: 'GET',
      url: `https://api.apixu.com/v1/current.json?key=${config.apixuWeatherApiKey}&q=${context.state.zipcode}`,
      dataType: 'json',
      success: function(data) {
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

  handleSubmit(e) {
    e.preventDefault();
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const db_ref = database.ref(`users/${user}/modules/${db_key}/zip`);

    let zipcode = this.searchInput.value;

    db_ref.set(zipcode);

    this.setState({
      zipcode: zipcode
    }, () => {
      this.getWeatherData();

      setInterval(() => {
        console.log('grabbing weather');
        this.getWeatherData();
      }, 1800000);

      this.zipForm.reset();
    });
  }

  render() {
    let cssCard = `${styles.card} card`;
    let cssCardContent = `${styles.cardContent} card-content`;
    
    return (
      <div className=''>
          <div className={cssCard}>
            <header className='card-header'>
              <p className='card-header-title'>Weather</p>
              <div className={styles.searchIcon}><i className='fa fa-search' aria-hidden='true'></i></div>
              <form action='submit'
                    className={styles.weatherForm}
                    onSubmit={e => this.handleSubmit(e)}
                    ref={input => this.zipForm = input}
                    >
                <input className={styles.weatherInput} 
                        type='text' 
                        ref={input => this.searchInput = input}
                        placeholder='Search by zipcode'
                        />               
              </form>
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