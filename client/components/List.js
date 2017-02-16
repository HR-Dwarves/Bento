import React from 'react';
import ListItem from './ListItem'

const List = React.createClass({
  render() {
    let list, username, items;
    if (this.props.database) {
      list = this.props.database.list
      username = list.username;
      items = list.items;
    }
    return (
      <div>
        <p>Username: {username}</p>
        <p>List items:</p>
        {items ? items.map((item, ind) => <ListItem {...this.props} 
                                                    key={ind} 
                                                    listItem={item}/>) : []}
      </div>
    )
  }
});

export default List;