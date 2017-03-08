import React from 'react';
import styles from './PhotoDisplayer.css';
import moment from 'moment';
import loadImage from 'blueimp-load-image';


class PhotoDisplayer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      canvasImg: false
    }
  }

  componentWillMount() {

    var context = this;

    loadImage(
      this.props.src,
      function (img, meta) {
        if(img.type === "error") {
            console.log("Error loading image " + imageUrl);
        } else {

          if (meta.exif) {
            if (meta.exif.get('Orientation') > 1) {
              context.setState({canvasImg: true});
              context.canvasAttachPt.appendChild(img);
            }
          }
        }
      },
      {
        meta: true,
        orientation: true
      }
    )
  }

  deleteThisPhoto() {
    if (this.state.canvasImg) {
      this.canvasAttachPt.removeChild(this.canvasAttachPt.firstChild);
    }
    this.props.deletePhoto(this.props.key)
  }

  dateIsToday() {
    if (moment().format('MMMM Do YYYY') === moment(this.props.date).format('MMMM Do YYYY')) {
      return true;
    } else {
      return false;
    }
  }


  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    let newdate = moment(this.props.date).format('ddd, MMMM Do YYYY');

    return (
      <div>
        <div>
          <div className='is-pulled-left'>{newdate}</div>
          <div className='is-pulled-right'>
            {this.dateIsToday() &&
              <a onClick={this.deleteThisPhoto.bind(this)}>Change</a>
            }
          </div>
        </div>

        <div
          className={styles.canvasAttachPt}
          ref={canvasAttachPt => this.canvasAttachPt = canvasAttachPt}>
        {this.state.canvasImg === false &&
          <img src={this.props.src} />
        }
        </div>

        <p className={styles.dontBreakOut}>{this.props.title}</p>
      </div>
    )
  }
}

export default PhotoDisplayer