import React from 'react'
import styles from './PhotoDisplayer.css';


class PhotoDisplayer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    let newdate = new Date(this.props.date).toDateString();

    return (
      <div>
        <img src={this.props.src} />
        <p className={styles.dontBreakOut}>{this.props.title}</p>
        <p>{newdate}</p>
      </div>
    )
  }
}

export default PhotoDisplayer