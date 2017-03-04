import React from 'react';
import config from './../../config/config';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';
import moment from 'moment';

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
      inputIsTooBig: false
    };
  }

  componentDidMount() {
    let user = this.props.user.uid;
    // get saved photos from db
    this.props.getPhotosForPhotoPrompt(this.props.db_key, user);

    // compare dates to see if today's shot has been taken
    this.checkTodaysPhotoIsTaken();
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
    });
  }

  render() {
    let photos = this.props.dashboard.modules[this.props.db_key].photos;
    let iconStyle = `${this.state.todaysPhotoIsTaken ? styles.iconGreen : styles.iconRed} icon`;

    return (
      <div className='card'>

        <header className={`${styles.header} card-header`}>
          <p className="card-header-title">One Photo Every Day Challenge</p>
          <div className="card-header-icon">
            <span className={iconStyle}>
              <i
                onClick={this.props.handleCollapseFunction}
                className='fa fa-camera'
                aria-hidden='true'>
              </i>
            </span>
          </div>
        </header>

        {this.props.dashboard.modules[this.props.db_key].streak &&
          <div className={`${styles.streakBar} title is-4`}>Streak:
            {this.props.dashboard.modules[this.props.db_key].streak}
          </div>
        }

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
              // console.log('photo', photo)
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