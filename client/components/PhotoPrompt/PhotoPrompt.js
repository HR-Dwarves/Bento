import React from 'react';
import config from './../../config/config';
import firebaseApp from '../../base';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';

import PhotoEditor from '../PhotoEditor/PhotoEditor';


const database = firebaseApp.database();

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoSrc: null
    };
  }

  changeHandler(ev) {

    var fReader = new FileReader();
    fReader.readAsDataURL(ev.target.files[0]);

    var context = this;
    fReader.onloadend = function(event){
      context.setState({
        photoSrc: event.target.result
      })
    }
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

              <input type="file" accept="image/*" id='inputFile' onChange={this.changeHandler.bind(this)}/>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoPrompt;