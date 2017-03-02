import React from 'react'
import styles from './PhotoDisplayer.css';
import moment from 'moment';



class PhotoDisplayer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  dateIsToday() {
    if (moment().format('MMMM Do YYYY') === moment(this.props.date).format('MMMM Do YYYY')) {
      console.log('true')
      return true;
    } else {
      return false;
    }
  }


  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    // let newdate = new Date(this.props.date).toDateString();
    let newdate = moment(this.props.date).format('ddd, MMMM Do YYYY');

    return (
      <div>
        <div>
          <div className='is-pulled-left'>{newdate}</div>
          <div className='is-pulled-right'>
            {this.dateIsToday() &&
              <a onClick={this.props.deletePhoto}>Change</a>
            }
          </div>
        </div>
        <img src={this.props.src} />
        <p className={styles.dontBreakOut}>{this.props.title}</p>
      </div>
    )
  }
}

export default PhotoDisplayer