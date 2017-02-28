import React from 'react';
import firebaseApp from '../../base';
import classnames from 'classnames';

const database = firebaseApp.database();

import styles from './Arcade.css';

class Arcade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'currentGame': 'PACMAN',
      'games': {
        'PACMAN': 'http://www.classicgamesarcade.com/games/pacman.swf',
        'SPACE INVADERS': 'http://www.pizn.com/swf/1-space-invaders.swf',

      }
    }
  }

  render() {
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    let gameToRender = (this.state.currentGame).toUpperCase();

    return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>Arcade</p>
          <div className='card-header-icon'>
            <span className='icon'>
              <i onClick={this.props.handleCollapseFunction} className='fa fa-gamepad' aria-hidden='true'></i>
            </span>
          </div>
        </header>
        <div className={collapsedStyle}>
          <div className='card-content'>
            <embed src={this.state.games[gameToRender]} />
          </div>
        </div>
      </div>
    );
  }
};

export default Arcade;