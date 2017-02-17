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
      console.log(formInput);
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
        <p>Username: {username}</p>

        <div className='card'>

          <p>List items:</p>
          <form action="submit"
                className="control"
                onSubmit={(e) => this.handleSubmit(e)}
                ref={(input) => this.listForm = input}
                >
            <input type="text" ref={(input) => this.formInput = input}/>
            <button type="sumbit">Add</button>
          </form>

          <div className='card-content'>
            <div className='media-content'>

              {items ? Object.keys(items).map((key, ind) => <ListItem {...this.props}
                                                             key={key}
                                                             listItem={items[key]}/>) : []}
            </div>
          </div>
        </div>

      </div>
    )
  }
};

export default List;