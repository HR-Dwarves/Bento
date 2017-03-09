import React from 'react';
import firebaseApp from '../../base';

import styles from './BackgroundChanger.css'

const database = firebaseApp.database();

class BackgroundChanger extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let db_key = this.props.db_key;
    let user = this.props.user.uid;
    let newUrl = this.backgroundUrl.value;

    this.props.ChangeBackground(newUrl, db_key, user);
    
    this.backgroundInput.reset();
  }

  handleRemove() {
    let user = this.props.user.uid;

    this.props.RemoveBackground(user);
  }

  render() {
    let cardStyle = `${styles.cardStyle} card`;

    return (
      <div className={cardStyle}>
        <header className='card-header'>
          <p className='card-header-title'>Background Customization</p>
          <div className='card-header-icon'>
            <span className='icon'>
              <i className="fa fa-picture-o" aria-hidden='true'></i>
            </span>
          </div>
        </header>
        <div className='card-content'>
          <p>Upload an image by url:</p>
          <form action='submit'
                className='formclasshere'
                onSubmit={(e) => this.handleSubmit(e)}
                ref={(input) => this.backgroundInput = input}
                >
            <input className='input' 
                    type='text' 
                    ref={(input) => this.backgroundUrl = input}
                    placeholder='Enter url to your image'/>
            <button className='button' type='submit'>Change</button>
            <button className='button' onClick={this.handleRemove}>Remove Background</button>
          </form>
        </div>
      </div>
    );
  }
}

export default BackgroundChanger