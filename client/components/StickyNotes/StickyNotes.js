import React from 'react';
import Draggable from 'react-draggable';

import styles from './StickyNotes.css';

class StickyNotes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='column'>
        <Draggable bounds='body'>
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>Sticky Note</p>
            </header>
            <div className='card-content'>
              <textarea className={styles.textarea} rows='10' cols='30'></textarea>
            </div>
          </div>
        </Draggable>
      </div>
    )
  }
}

export default StickyNotes;