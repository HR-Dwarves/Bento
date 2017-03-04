import React from 'react';
import config from './../../config/config';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';
import moment from 'moment';
import quotes from './PhotoQuotes'

import PhotoEditor from '../PhotoEditor/PhotoEditor';
import PhotoDisplayer from '../PhotoDisplayer/PhotoDisplayer';

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoName: null,
      photoSrc: null,
      inputButton: null,
      todaysPhotoIsTaken: false,
      chooseButtonCss: 'button',
      inputIsTooBig: false,
      streak: 0
    };
  }

  componentDidMount() {
    let user = this.props.user.uid;
    // get saved photos from db
    this.props.getPhotosForPhotoPrompt(this.props.db_key, user);

    // check streak
    this.checkStreak();

    // compare dates to see if today's shot has been taken
    this.checkTodaysPhotoIsTaken();
    console.log('quotes', quotes)
  }

  checkTodaysPhotoIsTaken() {
    let photos
    let lastPhotoDate

    photos = this.props.dashboard.modules[this.props.db_key].photos;
    if (photos) {
      lastPhotoDate = photos[Object.keys(photos)[Object.keys(photos).length - 1]].date;
    }

    if (lastPhotoDate && (moment().format('MMMM Do YYYY') === moment(lastPhotoDate).format('MMMM Do YYYY'))) {
      this.setState({todaysPhotoIsTaken: true})
    }
  }

  deletePhoto(key, ev) {
    const user = this.props.user.uid;
    var context = this;
    this.props.deletePhotoFromPhotoPrompt(key, this.props.db_key, user, () => {
      context.setState({todaysPhotoIsTaken: false})
      this.checkStreak();
    });
  }

  changeHandler(ev) {
    // check file size
    if (ev.target.files[0].size > 3000000) {
      ev.target.value = "";
      this.setState({inputIsTooBig: true})
    } else {

      this.setState({inputIsTooBig: false})
      var fReader = new FileReader();
      fReader.readAsDataURL(ev.target.files[0]);

      var context = this;
      var photoName = ev.target.files[0].name;

      fReader.onloadend = function(event){

        context.setState({
          photoName: photoName,
          photoSrc: event.target.result
        })
      }
    }
  }

  buttonClick(ev) {
    this.inputButton.click();
  }

  submitPhoto(ev) {
    this.setState({chooseButtonCss: 'button is-loading'})

    const user = this.props.user.uid;
    var context = this;
    this.props.addPhotoForPhotoPrompt(this.inputButton.files[0], this.props.db_key, user, () => {
      context.setState({
        photoSrc: null,
        todaysPhotoIsTaken: true,
        chooseButtonCss: 'button'
      });
      this.checkStreak();
    });
  }

  checkStreak() {
    let photos = this.props.dashboard.modules[this.props.db_key].photos;
    let allPhotoDates = Object.keys(photos);
    let today = moment().format('MMMM Do YYYY');
    let yesterday = moment().subtract(1, 'days').format('MMMM Do YYYY');
    let mostRecent;

    let checkDatesForStreak = () => {
      for (var i = allPhotoDates.length - 1; i >= 0; i--) {
        if (i === 0) {
          return;
        } else {
          var thisPhotoDate = moment(allPhotoDates[i]);
          var previousPhotoDate = moment(allPhotoDates[i - 1]);

          if (previousPhotoDate.format('MMMM Do YYYY')
            === thisPhotoDate.subtract(1, 'days').format('MMMM Do YYYY')) {
            streakCounter++;
          } else {
            return;
          }
        }
      }
    }

    allPhotoDates = allPhotoDates.map((key, index, array) => {
      return photos[key].date;
    })

    mostRecent = moment(allPhotoDates[allPhotoDates.length - 1]).format('MMMM Do YYYY')

    // first check if the most recent is yesterday, otherwise aint no streak.
    if (mostRecent === yesterday || mostRecent === today) {
      var streakCounter = 1;
      checkDatesForStreak();
      this.setState({streak: streakCounter})
    }
  }

  render() {
    let photos = this.props.dashboard.modules[this.props.db_key].photos;
    let iconStyle = `${this.state.todaysPhotoIsTaken ? styles.iconGreen : styles.iconRed} icon`;

    return (
      <div className='card'>

        <header className={`${styles.header} card-header`}>
          <p className="card-header-title">One Photo Every Day Challenge</p>
          {/* STREAK */}
          {this.state.streak > 0 &&
            <p className={`${styles.streakBar} card-header-title`}>
              Streak:&nbsp;{this.state.streak}
            </p>
          }
          <div className="card-header-icon">
            <span className={iconStyle}>
              <i
                className='fa fa-camera'
                aria-hidden='true'>
              </i>
            </span>
          </div>
        </header>



        <div className={`${styles.content} card-content`}>

          <div className="media-content">

            {/* TAKE A PHOTO BUTTON */}
            {!this.state.todaysPhotoIsTaken &&
              <div className={styles.enterPhotoButton}>
                {/* VISUAL BUTTON */}
                <a className='button' onClick={this.buttonClick.bind(this)}>
                  <span className={`${styles.photoButtonContainer} icon`}>
                    <i className={`${styles.photoButton} fa fa-bullseye`}></i>
                  </span>
                  {this.state.photoSrc === null
                    ? <span>Take Photo/Choose File</span>
                    : <span>Take/Choose New</span>
                  }
                </a>
              {/* ACTUAL BUTTON */}
                <input
                  ref={src => this.inputButton = src}
                  type="file"
                  accept="image/*"
                  onChange={this.changeHandler.bind(this)}
                  className={styles.hideInput}
                />
              </div>
            }
            {this.state.inputIsTooBig === true &&
              <p className="is-small">less than 5mb please</p>
            }

            {/* ACCEPT PHOTO BUTTON */}
            {this.state.photoSrc !== null &&
              <a className={this.state.chooseButtonCss} onClick={this.submitPhoto.bind(this)}>
                Make it today's photo
              </a>
            }

            {/* CURRENT PHOTO VIEWER. COULD BE AN EDITOR... */}
            {this.state.photoSrc !== null &&
              <PhotoEditor src={this.state.photoSrc}/>
            }

            {/* ALL PHOTOS */}
            {photos &&
              Object.keys(photos).reverse().map((key, index) => {
              return <PhotoDisplayer
                      key={index}
                      src={photos[key].downloadUrl}
                      title={photos[key].name}
                      date={photos[key].date}
                      photoId={key}
                      deletePhoto={this.deletePhoto.bind(this, key)} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoPrompt;