import React from 'react';
// import config from './../../config/config';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';
import moment from 'moment';
import loadImage from 'blueimp-load-image'
import quotes from './PhotoQuotes'

// import PhotoEditor from '../PhotoEditor/PhotoEditor';
import PhotoDisplayer from '../PhotoDisplayer/PhotoDisplayer';

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoName: null,
      // photoSrc: null,
      // photoRotation: null,
      inputButton: null,
      todaysPhotoIsTaken: false,
      chooseButtonCss: 'button',
      inputIsTooBig: false,
      streak: 0,
      quote: quotes[0],
      showQuote: true
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
    this.pickQuote();
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
    if (ev.target.files[0].size > 5000000) {
      ev.target.value = "";
      this.setState({inputIsTooBig: true})
    } else {
      this.setState({inputIsTooBig: false})

      var context = this;

      var photoName = ev.target.files[0].name


      loadImage(
        ev.target.files[0],
        function (img, meta) {
          if(img.type === "error") {
              console.log("Error loading image " + imageUrl);
          } else {

            if (context.inputViewer.hasChildNodes()) {
              context.inputViewer.replaceChild(img, context.inputViewer.firstChild);
            } else {
              context.inputViewer.appendChild(img);
            }

            context.setState({photoName: photoName})
          }
        },
        {
          meta: true,
          orientation: true
        }
      )
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
      // console.log('context.inputViewer.firstChild', context.inputViewer.firstChild);
      context.inputViewer.removeChild(context.inputViewer.firstChild);
      context.setState({
        // photoSrc: null,
        photoName: null,
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

  pickQuote() {
    length = quotes.length;
    // http://stackoverflow.com/questions/1527803/
    // generating-random-whole-numbers-in-javascript-in-a-specific-range
    // Math.floor(Math.random() * (max - min +1)) + min
    var thisQuote = Math.floor(Math.random() * (length - 0 + 1));
    this.setState({quote: quotes[thisQuote]})
  }

  hideQuote() {
    this.setState({showQuote: false});
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

            {/* QUOTE */}
            {this.state.showQuote &&
              <article className="message">
                <div className="message-body">
                  <a className="delete is-pulled-right"
                    onClick={this.hideQuote.bind(this)}></a>
                  <p>{this.state.quote.quote}</p>
                  <p><em>&mdash;{this.state.quote.author}</em></p>
                </div>
              </article>
            }

            {/* TAKE A PHOTO BUTTON */}
            {!this.state.todaysPhotoIsTaken &&
              <div className={styles.enterPhotoButton}>
                {/* VISUAL BUTTON */}
                <a className='button' onClick={this.buttonClick.bind(this)}>
                  <span className={`${styles.photoButtonContainer} icon`}>
                    <i className={`${styles.photoButton} fa fa-bullseye`}></i>
                  </span>
                  {this.state.photoName === null
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
            {this.state.photoName !== null &&
              <a className={this.state.chooseButtonCss} onClick={this.submitPhoto.bind(this)}>
                Make it today's photo
              </a>
            }

            {/* CURRENT PHOTO VIEWER*/}
            <div
              className={styles.inputViewer}
              ref={inputViewer => this.inputViewer = inputViewer}>
            </div>

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