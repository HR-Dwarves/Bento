import React from 'react';
import database from '../../base';
import Draggable from 'react-draggable';

import styles from './StickyNotes.css';

class StickyNotes extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddSticky = this.handleAddSticky.bind(this);
    this.handleDeleteSticky = this.handleDeleteSticky.bind(this);
    this.handleStickyHeaderEntry = this.handleStickyHeaderEntry.bind(this);
    this.handleStickyBodyEntry = this.handleStickyBodyEntry.bind(this);
  }

  handleAddSticky() {
    console.log('ADDING ANOTHER STICKY');
  }

  handleDeleteSticky() {
    console.log('DELETE THIS STICKY');
  }

  handleStickyHeaderEntry(event) {
    const db_key = this.props.db_key;
    const target = 'headerText';
    const db_ref = database.ref(`/testUser/modules/${db_key}/${target}`);
    let newText = event.target.value;    
    // db_ref.set(newText);
    this.props.updateText(target, newText, db_key);
  }

  handleStickyBodyEntry(event) {
    const db_key = this.props.db_key;
    const target = 'bodyText';
    const db_ref = database.ref(`/testUser/modules/${db_key}/${target}`);
    let newText = event.target.value;
    this.props.updateText(target, newText, db_key);
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    let note = dashboard.modules[db_key];

    return(
      <div className=''>
          <div className='card'>
            <header className='card-header'>
              <textarea className='card-header-title sticky-header' 
                        cols='30' 
                        maxLength='30' 
                        onChange={this.handleStickyHeaderEntry}
                        value={note.headerText}
                        >
              </textarea>
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
              <textarea className='sticky-content' 
                        maxLength='600' 
                        rows='10' 
                        cols='60'
                        onChange={this.handleStickyBodyEntry}
                        value={note.bodyText}
                        >
              </textarea>
            </div>
          </div>
      </div>
    )
  }
}
        // <Draggable bounds='body' cancel='.card-content'>
        // </Draggable>

export default StickyNotes;