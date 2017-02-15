import React from 'react';

const List = React.createClass({
  render() {
    const username = this.props.list.username;
    const items = this.props.list.items;
    return (
      <div>
        <p>Username: {username}</p>
        <p>List items:</p>
        {items ? items.map((item) => <div>{item}</div>) : []}
      </div>
    )
  }
});

export default List;