import React from 'react';

const ListItem = React.createClass({
  render() {
    const item = this.props.listItem;
    return (
      <div>
        {item.text}
      </div>
    )
  }
});

export default ListItem;