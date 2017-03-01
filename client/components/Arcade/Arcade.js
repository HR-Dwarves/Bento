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
        'GALAGA': 'http://www.classicgamesarcade.com/games/galaga.swf',
        'BUBBLE BOBBLE': 'http://www.classicgamesarcade.com/games/puzzle-bobble.swf',
        'TRON': 'http://www.classicgamesarcade.com/games/tron.swf',
        'TETRIS': 'http://www.classicgamesarcade.com/games/flash-tetris.swf',
      }
    }

    this.handleGameChange = this.handleGameChange.bind(this);
  }

  handleGameChange(e) {
    e.preventDefault();
    console.log('CHANGE GAME');
    const db_key = this.props.db_key;
    const gameSource = this.props.dashboard.modules[db_key]['game'];

    this.setState({
      'currentGame': e.target.value
    });
  }

  render() {
    let context = this;
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    let gameToRender = (this.state.currentGame).toUpperCase();

    let contentStyle = `${styles.cardBody} 'card-content`

    return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>
            <span className='select'>
              <select value={gameToRender} onChange={this.handleGameChange} className={styles.removeBorder}>
                <option value='PACMAN'>Pac-Man</option>
                <option value='SPACE INVADERS'>Space Invaders</option>
                <option value='GALAGA'>Galaga</option>
                <option value='BUBBLE BOBBLE'>Bubble Bobble</option>
                <option value='TRON'>Tron</option>
                <option value='TETRIS'>Tetris</option>
              </select>
            </span>
          </p>
          <div className='card-header-icon'>
            <span className='icon'>
              <i onClick={this.props.handleCollapseFunction} className='fa fa-gamepad' aria-hidden='true'></i>
            </span>
          </div>
        </header>
        <div className={collapsedStyle}>
          <div className={contentStyle}>
            <div className='arcade-game'>
              <embed className={styles.embeddedGame} key={gameToRender} src={this.state.games[gameToRender]}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Arcade;