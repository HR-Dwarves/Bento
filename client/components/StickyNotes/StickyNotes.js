import React from 'react';
import firebaseApp from '../../base';
import Draggable from 'react-draggable';
import styles from './StickyNotes.css';
import classnames from 'classnames';


const database = firebaseApp.database();

class StickyNotes extends React.Component {
  constructor(props) {
    super(props);

    this.handleStickyHeaderEntry = this.handleStickyHeaderEntry.bind(this);
    this.handleStickyBodyEntry = this.handleStickyBodyEntry.bind(this);
  }

  handleStickyHeaderEntry(event) {
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'headerText';
    // const db_ref = database.ref(`/${user}/modules/${db_key}/${target}`);
    let newText = event.target.value;    
    this.props.updateText(target, newText, db_key, user);
  }

  handleStickyBodyEntry(event) {
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'bodyText';
    // const db_ref = database.ref(`/${user}/modules/${db_key}/${target}`);
    let newText = event.target.value;
    this.props.updateText(target, newText, db_key, user);
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    let note = dashboard.modules[db_key];

    // Styles
    let stickynoteStyles = `${styles.stickynote} card`;
    let headerStyles = `${styles.header} card-header`;

    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    return(
        <div className={stickynoteStyles}>
          <header className={headerStyles}>
            <input className='card-header-title sticky-header'
                    type="text"
                    maxLength='30' 
                    onBlur={this.handleStickyHeaderEntry}
                    placeholder="Enter whatever you like!"
                    defaultValue={note.headerText}
                    name="note.headerText"/>
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
                      defaultValue={note.bodyText}
                      >
            </textarea>
          </div>
        </div>
    )
  }
}
        // <Draggable bounds='body' cancel='.card-content'>
        // </Draggable>

export default StickyNotes;