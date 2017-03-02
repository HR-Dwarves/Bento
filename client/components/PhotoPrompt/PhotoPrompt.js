import React from 'react';
import config from './../../config/config';
import firebaseApp from '../../base';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';
import moment from 'moment';

import PhotoEditor from '../PhotoEditor/PhotoEditor';
import PhotoDisplayer from '../PhotoDisplayer/PhotoDisplayer';


const storageBucket = firebaseApp.storage();
const database = firebaseApp.database();

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoName: null,
      photoSrc: null,
      inputButton: null,
      todaysPhotoIsTaken: false
    };
  }

  componentDidMount() {
    let context = this;
    let user = this.props.user.uid;

    // get saved photos from db
    this.props.getPhotosForPhotoPrompt(this.props.db_key, user);

    // compare dates to see if today's shot has been taken
    this.checkTodaysPhotoIsTaken();

    // console.log(moment().format('MMMM Do YYYY') === moment(1488408616320).format('MMMM Do YYYY'))
    // console.log(moment(1488408616320).format('MMMM Do YYYY'));

    // database.ref(`users/${user}/modules/${this.props.db_key}`).on('value', () => {
    //   this.props.getPhotosForPhotoPrompt(this.props.db_key, user);
    // });
  }

  checkTodaysPhotoIsTaken() {
    let photos
    let lastPhotoDate

    photos = this.props.dashboard.modules[this.props.db_key].photos;
    if (photos) {
      lastPhotoDate = photos[Object.keys(photos)[0]].date;
    }

    if (lastPhotoDate && (moment().format('MMMM Do YYYY') === moment(lastPhotoDate).format('MMMM Do YYYY'))) {
      this.setState({
        todaysPhotoIsTaken: true
      })
    }
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
    const user = this.props.user.uid;
    var context = this;
    this.props.addPhotoForPhotoPrompt(this.inputButton.files[0], this.props.db_key, user, () => {
      context.setState({
        photoSrc: null,
        todaysPhotoIsTaken: true
      });
    });
  }

  render() {
    let photos = this.props.dashboard.modules[this.props.db_key].photos;

    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    let photoButtonContainer = `${styles.photoButtonContainer} icon`;
    let photoButton = `${styles.photoButton} fa fa-bullseye`;

    // console.log('this.state.photoSrc', this.state.photoSrc);


    return (
      <div className='card'>

        <header className="card-header">
          <p className="card-header-title">One Photo Every Day Challenge</p>
          <div className="card-header-icon">
            <span className="icon">
              <i
                onClick={this.props.handleCollapseFunction}
                className='fa fa-camera'
                aria-hidden='true'>
              </i>
            </span>
          </div>
        </header>

        <div className={collapsedStyle}>
          <div className="card-content">
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
                <a className='button' onClick={this.submitPhoto.bind(this)}>
                  Make it today's photo
                </a>
              }

              {this.state.photoSrc !== null &&
                <PhotoEditor src={this.state.photoSrc}/>
              }

              {photos &&
                Object.keys(photos).map((key, index) => {
                // console.log('photo', photo)
                return <PhotoDisplayer
                        key={index}
                        src={photos[key].downloadUrl}
                        title={photos[key].name}
                        date={photos[key].date} />
              })}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoPrompt;