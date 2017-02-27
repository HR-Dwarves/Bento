import React from 'react';
import config from './../../config/config';
import firebaseApp from '../../base';
import styles from './PhotoPrompt.css';
import classnames from 'classnames';


const database = firebaseApp.database();

class PhotoPrompt extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    // let cssClasses = `${styles.card} column`; // just for reference for form.
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    return (
      <div className='card'>
        <header className="card-header">
          <p className="card-header-title">One Photo Every Day Challenge</p>
          <div className="card-header-icon">
            <span className="icon"><i onClick={this.props.handleCollapseFunction} className='fa fa-camera' aria-hidden='true'></i></span>
          </div>
        </header>

        <div className={collapsedStyle}>
          <div className="card-content">
            <div className="media-content">
              Media Content.
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PhotoPrompt;