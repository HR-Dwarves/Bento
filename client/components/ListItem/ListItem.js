import React from 'react';
import styles from './ListItem.css'

class ListItem extends React.Component {
  constructor() {
    super();
  }

  handleDelete(itemKey) {
    const db_key = this.props.db_key
    console.log(itemKey);
    let user = this.props.user.uid;
    this.props.deleteFromList(itemKey, db_key, user);
  }

  handleCheckClick(itemKey) {
    const item = this.props.listItem;
    const newStatus = !item.completed;
    const db_key = this.props.db_key
    let user = this.props.user.uid;

    this.props.toggleListItemStatus(itemKey, db_key, newStatus, user);
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
      style = {"textDecoration": "line-through"};
    } else {
      style = {"textDecoration": ""};
    }
    let cardStyle;
    if (this.props.hideArchived && completed) {
      cardStyle = {"display": "none"};
    } else {
      cardStyle = {"display": ""};
    }
    let hiddenStyle = {"display": "none"};

    let listItemCSS = `${styles.listItem} control level animated`;
    let spanIconCSS = `${styles.icon} is-pulled-right level`;
    return (
      <div className={listItemCSS} style={cardStyle}>
        <span style={style}>
          {item.text}
        </span>
        <span className={spanIconCSS}>
          <span style={this.props.editing ? hiddenStyle : {}} className="icon is-small" onClick={() => this.handleCheckClick(itemKey)}>
            {checked}
          </span>
          <span style={this.props.editing ? {} : hiddenStyle} className="icon is-small">
            <i onClick={() => this.handleDelete(itemKey)} 
               className="fa fa-times level" aria-hidden="true"></i>
          </span>
        </span>
      </div>
    )
  }
};

export default ListItem;