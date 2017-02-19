import React from 'react';
import Draggable from 'react-draggable';

import styles from './StickyNotes.css';

class StickyNotes extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleAddSticky = this.handleAddSticky.bind(this);
    this.handleDeleteSticky = this.handleDeleteSticky.bind(this);
  }

  handleAddSticky() {
    console.log('ADDING ANOTHER STICKY');
  }

  handleDeleteSticky() {
    console.log('DELETE THIS STICKY');
  }

  render() {
    return(
      <div className='column'>
          <div className='card'>
            <header className='card-header'>
              <textarea className='card-header-title' cols='30' maxLength='30'></textarea>
              <div className="card-header-icon">
                <span>
                  <i className='fa fa-plus' aria-hidden='true' onClick={this.handleAddSticky}></i>
                </span>
                <span>
                  <i className='fa fa-times' aria-hidden='true' onClick={this.handleDeleteSticky}></i>
                </span>
              </div>
            </header>
            <div className='card-content'>
              <textarea maxLength='300' rows='15' cols='30'></textarea>
            </div>
          </div>
      </div>
    )
  }
}
        // <Draggable bounds='body' cancel='.card-content'>
        // </Draggable>

export default StickyNotes;