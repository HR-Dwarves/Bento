import React from 'react';
import database from '../base'
import ListItem from './ListItem'


const List = React.createClass({
  
  componentDidMount() {
    this.props.getList();
    database.ref('/testUser/list').on('value', () => {
      this.props.getList();
    })
  },

  render() {
    let dashboard = this.props.dashboard;
    if (dashboard) {
      var { username, email, firstName, lastName } = dashboard;
    }
    let list = this.props.list;
    let items;
    if (list) {
      if (list) {
        items = list.items;
      }
    }
    return (
      <div>
        <p>Username: {username}</p>
        <p>List items:</p>
        {items ? Object.keys(items).map((key, ind) => <ListItem {...this.props} 
                                                       key={key} 
                                                       listItem={items[key]}/>) : []}
      </div>
    )
  }
});

export default List;