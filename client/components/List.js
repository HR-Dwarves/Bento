import React from 'react';
import database from '../base'
import ListItem from './ListItem'


class List extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getList();
    database.ref('/testUser/list').on('value', () => {
      this.props.getList();
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.formInput.value);
    
    this.listForm.reset();
  }

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
        <form action="submit" 
              className="control" 
              onSubmit={(e) => this.handleSubmit(e)}
              ref={(input) => this.listForm = input}
              >
          <input type="text" ref={(input) => this.formInput = input}/>
          <button type="sumbit">Add</button>
        </form>
        {items ? Object.keys(items).map((key, ind) => <ListItem {...this.props} 
                                                       key={key} 
                                                       listItem={items[key]}/>) : []}
      </div>
    )
  }
};

export default List;