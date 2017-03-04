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
        'BUBBLE BOBBLE': 'http://www.classicgamesarcade.com/games/puzzle-bobble.swf',
        'GALAGA': 'http://www.classicgamesarcade.com/games/galaga.swf',
        'PACMAN': 'http://www.classicgamesarcade.com/games/pacman.swf',
        'RAIDENX': 'http://www.classicgamesarcade.com/games/raidenx.swf',
        'SPACE INVADERS': 'http://www.pizn.com/swf/1-space-invaders.swf',
        'TRON': 'http://www.classicgamesarcade.com/games/tron.swf',
        'TETRIS': 'http://www.classicgamesarcade.com/games/flash-tetris.swf',
      }
    }

    this.handleGameChange = this.handleGameChange.bind(this);
  }

  handleGameChange(event) {
    event.preventDefault();
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const target = 'name';
    const db_ref = database.ref(`users/${user}/modules/${db_key}/${target}`);
    let newGame = event.target.value;

    db_ref.set(newGame);

    this.setState({
      'currentGame': newGame
    });
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    let game = dashboard.modules[db_key];

    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    let gameToRender = game.name || this.state.currentGame;

    let contentStyle = `${styles.cardBody} 'card-content`;

    return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>
            <span className='select'>
              <select value={gameToRender} onChange={this.handleGameChange} className={styles.removeBorder}>
                <option value='BUBBLE BOBBLE'>Bubble Bobble</option>
                <option value='GALAGA'>Galaga</option>
                <option value='PACMAN'>Pac-Man</option>
                <option value='RAIDENX'>Raiden X</option>
                <option value='SPACE INVADERS'>Space Invaders</option>
                <option value='TRON'>Tron</option>
                <option value='TETRIS'>Tetris</option>
              </select>
            </span>
          </p>
          <div className='card-header-icon'>
            <span className='icon'>
              <i className='fa fa-gamepad' aria-hidden='true'></i>
            </span>
          </div>
        </header>
        <div className={contentStyle}>
            <embed className={styles.embeddedGame} key={this.state.currentGame} src={this.state.games[gameToRender]} wmode='window'/>
        </div>
      </div>
    );
  }
};

export default Arcade;