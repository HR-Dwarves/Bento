import React from 'react';
import database from '../../base';
import Draggable from 'react-draggable';

import styles from './StickyNotes.css';

class StickyNotes extends React.Component {
  constructor(props) {
    super(props);

    this.handleStickyHeaderEntry = this.handleStickyHeaderEntry.bind(this);
    this.handleStickyBodyEntry = this.handleStickyBodyEntry.bind(this);
  }

  handleStickyHeaderEntry(event) {
    const db_key = this.props.db_key;
    const target = 'headerText';
    const db_ref = database.ref(`/testUser/modules/${db_key}/${target}`);
    let newText = event.target.value;    
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
                        cols='20' 
                        maxLength='30' 
                        onBlur={this.handleStickyHeaderEntry}
                        placeholder="Enter whatever you like!"
                        >
                        {note.headerText}
              </textarea>
              <div className="card-header-icon">
                <span className="icon">
                  <i className="fa fa-sticky-note-o" aria-hidden="true"></i>
                </span>
              </div>
            </header>
            <div className='card-content'>
              <textarea className='sticky-content' 
                        maxLength='600' 
                        rows='10' 
                        onBlur={this.handleStickyBodyEntry}
                        >
                        {note.bodyText}
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