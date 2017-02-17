import React from 'react';

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

    return (
      <div>
        {item.text}
        <span className="icon" onClick={() => this.handleCheckClick(itemKey)}>
          {checked}
        </span>
        <span className="icon">
          <i onClick={() => this.handleDelete(itemKey)} 
             className="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>
    )
  }
};

export default ListItem;