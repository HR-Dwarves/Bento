import React from 'react';
import firebaseApp from '../../base';
import styles from './Focus.css';
import classnames from 'classnames';

const database = firebaseApp.database();

class Focus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    let note = dashboard.modules[db_key];

    return (
      <div>
        <p>
          FOCUS
        </p>
      </div>
    )
  }
}

export default Focus;