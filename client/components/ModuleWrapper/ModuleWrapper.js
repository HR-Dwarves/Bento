import React from 'react';
import firebaseApp from '../../base';
import styles from './ModuleWrapper.css';
import moduleList from '../../data/moduleList';
const database = firebaseApp.database();

class ModuleWrapper extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);

  }


  handleDelete() {
    let db_key = this.props.db_key;
    // let user = this.props.user.uid;

    this.props.deleteModule(db_key);
  }

  render() {
    let type = this.props.type;
    let component = moduleList[type];
    let deleteButton = `${styles.delete} delete`;
    let wrapperStyle = `${styles.wrapper}`;

    return (
      <div className={wrapperStyle}>
          <button className={deleteButton} onClick={this.handleDelete}></button>
        {React.createElement(component, {...this.props})}
      </div>
    )
  }
}

export default ModuleWrapper;