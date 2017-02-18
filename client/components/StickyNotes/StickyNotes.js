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
        <Draggable bounds='body' cancel='.card-content'>
          <div className='card'>
            <header className='card-header'>
              <textarea className='card-header-title' maxLength='30'></textarea>
            </header>
            <div className='card-content'>
              <textarea maxLength='300' rows='15' cols='30'></textarea>
            </div>
          </div>
        </Draggable>
      </div>
    )
  }
}

export default StickyNotes;