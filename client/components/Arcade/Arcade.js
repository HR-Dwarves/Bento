import React from 'react';
import firebaseApp from '../../base';
import classnames from 'classnames';

const database = firebaseApp.database();

import styles from './Arcade.css';
import games from './listOfGames.js';

class Arcade extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'currentGame': 'PACMAN',
      'games': {
        'BUBBLE BOBBLE': games.BUBBLE_BOBBLE,
        'GALAGA': games.GALAGA,
        'PACMAN': games.PACMAN,
        'RAIDENX': games.RAIDENX,
        'SPACE INVADERS': games.SPACE_INVADERS,
        'TRON': games.TRON,
        'TETRIS': games.TETRIS,
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

    let gameToRender = game.name || this.state.currentGame;

    let contentStyle = `${styles.cardBody} 'card-content`
    let headerStyles = `${styles.header} card-header`;
    let selectStyles = `${styles.select} select`;

    let cardStyle = `${styles.arcade} card`;

    return (

      <div className='card'>
        <header className={headerStyles}>
          <p className='card-header-title'>
            <span className={selectStyles}>
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