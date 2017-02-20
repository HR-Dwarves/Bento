import React from 'react';
import Draggable from 'react-draggable';

import styles from './StickyNotes.css';

class StickyNotes extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleAddSticky = this.handleAddSticky.bind(this);
    this.handleDeleteSticky = this.handleDeleteSticky.bind(this);
    this.handleStickyEntry = this.handleStickyEntry.bind(this);
  }

  handleAddSticky() {
    console.log('ADDING ANOTHER STICKY');
  }

  handleDeleteSticky() {
    console.log('DELETE THIS STICKY');
  }

  handleStickyHeaderEntry() {
    console.log($('.sticky-header').val());
  }

  handleStickyBodyEntry() {
    console.log($('.sticky-content').val());
  }

  render() {
    return(
      <div className=''>
          <div className='card'>
            <header className='card-header'>
              <textarea className='card-header-title sticky-header' cols='30' maxLength='30' onChange={this.handleStickyHeaderEntry}></textarea>
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
              <textarea className='sticky-content' maxLength='600' rows='10' cols='60' onChange={this.handleStickyBodyEntry}></textarea>
            </div>
          </div>
      </div>
    )
  }
}
        // <Draggable bounds='body' cancel='.card-content'>
        // </Draggable>

export default StickyNotes;