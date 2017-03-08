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
        'BUBBLE BOBBLE': 'https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/arcade-games%2Fpuzzle-bobble.swf?alt=media&token=f1cbbec5-a12f-4e30-a300-d0b4d2a4353e',
        'GALAGA': 'https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/arcade-games%2Fgalaga.swf?alt=media&token=34785cdd-d849-4127-b96e-99ac120f8799',
        'PACMAN': 'https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/arcade-games%2Fpacman.swf?alt=media&token=f252033a-42ac-47d9-82b0-80d8fb29d361',
        'RAIDENX': 'https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/arcade-games%2Fraidenx.swf?alt=media&token=876f1bb8-fd14-4b16-9e6e-6e110ecedd7c',
        'SPACE INVADERS': 'https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/arcade-games%2F1-space-invaders.swf?alt=media&token=b439d968-d7cd-4bbb-8c82-11cc0cc1c647',
        'TRON': 'https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/arcade-games%2Ftron.swf?alt=media&token=92bd7332-7f39-4195-a349-f024833b3b8f',
        'TETRIS': 'https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/arcade-games%2Fflash-tetris.swf?alt=media&token=a11c7ce2-256e-4ce2-8090-741a65ea3c28',
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


    let contentStyle = `${styles.cardBody} 'card-content`
    let headerStyles = `${styles.header} card-header`;

    return (
      <div className='card'>
        <header className={headerStyles}>
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