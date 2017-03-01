import React from 'react';
import firebaseApp from '../../base';
import ListItem from '../ListItem/ListItem'
import classnames from 'classnames';
import styles from './List.css'

const database = firebaseApp.database();

class List extends React.Component {
  constructor() {
    super();

  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    let formInput = this.formInput.value;
    let db_key = this.props.db_key;
    let user = this.props.user.uid;
    let time = Date.now();
    if (formInput) {
      let listObj = {
        text: formInput,
        completed: false,
        createdAt: time
      }
      this.props.addToList(listObj, db_key, user);
    }
    this.listForm.reset();
  }

  sortKeys(items) {
    return Object.keys(items).sort((a, b) => {
      if (items[a].completed !== items[b].completed) {
        if (items[a].completed) {
          return 1;
        } else if (items[b].completed) {
          return -1;
        }
      } else {
        if (items[a].createdAt > items[b].createdAt) {
          return -1;
        } else {
          return 1;
        }
      }
    })
  }

  handleDelete() {
    let db_key = this.props.db_key;
    let user = this.props.user.uid;
    // let user = this.props.user.uid;

    this.props.deleteModule(db_key, user);
  }

  render() {
    let dashboard = this.props.dashboard;
    let db_key = this.props.db_key;
    if (dashboard) {
      var { username, email, firstName, lastName } = dashboard;
    }
    let list = dashboard.modules[db_key];
    let items, keys;
    if (list) {
        items = list.items;
        if (items) {
          keys = this.sortKeys(items);
        }
    }


    let cssClasses = `${styles.listCard} card`;
    let headerStyle = `${styles.header} card-header`
    let deleteButton = `${styles.delete} delete`
    let formStyle = `${styles.listForm} control`
    let listButton = `${styles.listButton} button is-small is-light`
    let listItems = `${styles.listItems} card-content`

    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');

    return (
        <div className={cssClasses}>
          <header className={headerStyle}>
            <p className="card-header-title">List</p>
            <span href="" className="card-header-icon">
              <span className="icon">
                <i onClick={this.props.handleCollapseFunction} className="fa fa-th-list" aria-hidden="true"></i>
              </span>
            </span>
          </header>
          <div className={collapsedStyle}>
            <div className="card-content">
              <form action="submit"
                    className={formStyle}
                    onSubmit={(e) => this.handleSubmit(e)}
                    ref={(input) => this.listForm = input}
                    >
                <input className="input is-small" type="text" ref={(input) => this.formInput = input}/>
                <button className={listButton} type="sumbit">Add</button>
              </form>
            </div>
            <div className={listItems}>
              <div className='media-content'>
                {items ? keys.map((key, ind) => <ListItem {...this.props} 
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