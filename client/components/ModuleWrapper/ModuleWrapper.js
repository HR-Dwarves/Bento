import React from 'react';
import firebaseApp from '../../base';
import styles from './ModuleWrapper.css';
import moduleMapping from '../../data/moduleMapping';
import _ from 'underscore';
const database = firebaseApp.database();

class ModuleWrapper extends React.Component {
  constructor() {
    super();
    this.state = {collapsed: false}
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleDelete = _.debounce(this.handleDelete.bind(this), 300, true);
  }


  handleDelete() {
    let db_key = this.props.db_key;
    let user = this.props.user.uid;

    this.props.deleteModule(db_key, user);
  }

  handleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    let type = this.props.type;
    let collapsed = this.state;
    let handleCollapseFunction = this.handleCollapse.bind(this);
    let component = moduleMapping[type];
    // let deleteButton = `${styles.delete} delete`;
    let deleteButton = `${styles.delete} icon fa fa-times-circle`;
    let wrapperStyle = `${styles.wrapper}`;

    return (
      <div className={wrapperStyle}>
          <i className={deleteButton} onClick={this.handleDelete} aria-hidden="true"></i>
        {React.createElement(component, {...this.props, collapsed, handleCollapseFunction})}
      </div>
    )
  }
}

export default ModuleWrapper;