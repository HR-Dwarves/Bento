import React from 'react';
import styles from './ListItem.css'

const ListItem = React.createClass({
  render() {
    const item = this.props.listItem;

    return (
      <p>
        {item.text}
      </p>
    )
  }
});

export default ListItem;