import React from 'react';
import database from '../../base'
import ListItem from '../ListItem/ListItem'

import styles from './List.css'


class List extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let db_key = this.props.db_key;
    this.props.getList(db_key);
    database.ref(`/testUser/modules/${db_key}`).on('value', () => {
      this.props.getList(db_key);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let formInput = this.formInput.value;
    let db_key = this.props.db_key;
    if (formInput) {
      let listObj = {
        text: formInput,
        completed: false
      }
      this.props.addToList(listObj, db_key);
    }
    this.listForm.reset();
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    if (dashboard) {
      var { username, email, firstName, lastName } = dashboard;
    }
    let list = dashboard.modules[db_key];
    let items;
    if (list) {
        items = list.items;
    }

    let cssClasses = `${styles.card} column`;

    return (
      <div className={cssClasses}>
        <div className='card'>
          <header className="card-header">
            <p className="card-header-title">List items:</p>
            <a href="" className="card-header-icon">
              <span className="icon">
                <i className="fa fa-th-list" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div className="card-content">
            <form action="submit"
                  className="control"
                  onSubmit={(e) => this.handleSubmit(e)}
                  ref={(input) => this.listForm = input}
                  >
              <label htmlFor="" className="label">Add task:</label>
              <p className="control">
                <input className="input is-small" type="text" ref={(input) => this.formInput = input}/>
              </p>
              <button className="button is-small is-light" type="sumbit">Add</button>
            </form>
          </div>
          <div className='card-content'>
            <div className='media-content'>
              {items ? Object.keys(items).map((key, ind) => <ListItem {...this.props} 
                                                                     key={key}
                                                                     itemKey={key}
                                                                     listItem={items[key]}/>) : []}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default List;