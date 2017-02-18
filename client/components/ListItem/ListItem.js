import React from 'react';
import styles from './ListItem.css'

class ListItem extends React.Component {
  constructor() {
    super();
  }

  handleDelete(itemKey) {
    const db_key = this.props.db_key
    console.log(itemKey);;
    this.props.deleteFromList(itemKey, db_key, );
  }

  handleCheckClick(itemKey) {
    const item = this.props.listItem;
    const newStatus = !item.completed;
    const db_key = this.props.db_key
    this.props.toggleListItemStatus(itemKey, db_key, newStatus);
  }

  render() {
    const item = this.props.listItem;
    const itemKey = this.props.itemKey;
    const completed = item.completed;
    let checked;
    if (completed) {
      checked = <i className="fa fa-square" aria-hidden="true"></i>
    } else {
      checked = <i className="fa fa-square-o" aria-hidden="true"></i>
    }

    let style;
    if (completed) {
      style = {"textDecoration": "line-through"}
    } else {
      style = {"textDecoration": ""}
    }
    let listItemCSS = `${styles.listItem} control level`
    let spanIconCSS = `${styles.icon} is-pulled-right level`;
    return (
      <div className={listItemCSS}>
        <span style={style}>
          {item.text}
        </span>
        <span className={spanIconCSS}>
          <span className="icon is-small" onClick={() => this.handleCheckClick(itemKey)}>
            {checked}
          </span>
          <span className="icon is-small">
            <i onClick={() => this.handleDelete(itemKey)} 
               className="fa fa-times level" aria-hidden="true"></i>
          </span>
        </span>
      </div>
    )
  }
};

export default ListItem;