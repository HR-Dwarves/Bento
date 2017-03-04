import React from 'react';
import config from './../../config/config';
// import firebaseApp from '../../base';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';
import moment from 'moment';

import PhotoEditor from '../PhotoEditor/PhotoEditor';
import PhotoDisplayer from '../PhotoDisplayer/PhotoDisplayer';


// const storageBucket = firebaseApp.storage();
// const database = firebaseApp.database();

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoName: null,
      photoSrc: null,
      inputButton: null,
      todaysPhotoIsTaken: false,
      chooseButtonCss: 'button'
    };
  }

  componentDidMount() {
    // console.log(this.props)

    let user = this.props.user.uid;

    // get saved photos from db
    this.props.getPhotosForPhotoPrompt(this.props.db_key, user);

    // compare dates to see if today's shot has been taken
    this.checkTodaysPhotoIsTaken();
    console.log('this.state.todaysPhotoIsTaken', this.state.todaysPhotoIsTaken)
  }

  checkTodaysPhotoIsTaken() {
    let photos
    let lastPhotoDate

    photos = this.props.dashboard.modules[this.props.db_key].photos;
    if (photos) {
      lastPhotoDate = photos[Object.keys(photos)[Object.keys(photos).length - 1]].date;
    }

    if (lastPhotoDate && (moment().format('MMMM Do YYYY') === moment(lastPhotoDate).format('MMMM Do YYYY'))) {
      this.setState({
        todaysPhotoIsTaken: true
      })
    }
  }

  deletePhoto(key, ev) {
    const user = this.props.user.uid;
    var context = this;
    this.props.deletePhotoFromPhotoPrompt(key, this.props.db_key, user, () => {
      context.setState({
        todaysPhotoIsTaken: false
      })
    });
  }

  changeHandler(ev) {

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

  buttonClick(ev) {
    this.inputButton.click();
  }

  submitPhoto(ev) {
    this.setState({
      chooseButtonCss: 'button is-loading'
    })

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

    let headerStyle = `${styles.header} card-header`;
    let contentStyles = `${styles.content} card-content`;
    // let iconStyle = `${styles.iconRed} icon`;
    let iconStyle = `${this.state.todaysPhotoIsTaken ? styles.iconGreen : styles.iconRed} icon`;


    let photoButtonContainer = `${styles.photoButtonContainer} icon`;
    let photoButton = `${styles.photoButton} fa fa-bullseye`;

    return (
      <div className='card'>

        <header className={headerStyle}>
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

        <div className={contentStyles}>
          <div className="media-content">

            {!this.state.todaysPhotoIsTaken &&
              <div className={styles.enterPhotoButton}>
                <a className='button' onClick={this.buttonClick.bind(this)}>
                  <span className={photoButtonContainer}>
                    <i className={photoButton}></i>
                  </span>
                  {this.state.photoSrc === null
                    ? <span>Take Photo/Choose File</span>
                    : <span>Take/Choose New</span>
                  }
                </a>
                <input
                  ref={src => this.inputButton = src}
                  type="file"
                  accept="image/*"
                  onChange={this.changeHandler.bind(this)}
                  className={styles.hideInput}
                />
              </div>
            }

            {this.state.photoSrc !== null &&
              <a className={this.state.chooseButtonCss} onClick={this.submitPhoto.bind(this)}>
                Make it today's photo
              </a>
            }

            {this.state.photoSrc !== null &&
              <PhotoEditor src={this.state.photoSrc}/>
            }

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