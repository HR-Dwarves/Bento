import React from 'react';
import config from './../../config/config';
import firebaseApp from '../../base';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';

import PhotoEditor from '../PhotoEditor/PhotoEditor';


const storageBucket = firebaseApp.storage();

const database = firebaseApp.database();

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoName: null,
      photoSrc: null,
      inputButton: null
    };
  }

  changeHandler(ev) {

    console.log('changeHandler')

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
    // console.log('this.inputButton', this.inputButton)
    this.inputButton.click();
  }

  submitPhoto(ev) {
    // console.log(this.state.photoName);
    const user = this.props.user.uid;
    this.props.addPhotoForPhotoPrompt(this.inputButton.files[0], this.props.db_key, user);
    // console.log(this.inputButton.files[0]);
  }

  render() {
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    let photoButtonContainer = `${styles.photoButtonContainer} icon`;
    let photoButton = `${styles.photoButton} fa fa-bullseye`;


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

              <PhotoEditor src={this.state.photoSrc}/>

              <a className='button' onClick={this.buttonClick.bind(this)}>
                <span className={photoButtonContainer}>
                  <i className={photoButton}></i>
                </span>
                {this.state.photoSrc === null &&
                  <span>Take Photo/Choose File</span>
                }
                {this.state.photoSrc !== null &&
                  <span>Take/Choose New</span>
                }
              </a>
              <input
                ref={src => this.inputButton = src}
                type="file"
                accept="image/*"
                onChange={this.changeHandler.bind(this)}
                className={styles.hideInput}
              />

              {this.state.photoSrc !== null &&

                <a className='button' onClick={this.submitPhoto.bind(this)}>
                  Make it today's photo
                </a>
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoPrompt;