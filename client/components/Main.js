import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    let feed = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    let itemIdArray = [];
    $.ajax({
      url: feed,
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        res.forEach(function(value) {
          itemIdArray.push(value);
        });
        for(var i = 0; i < 5; i++) {
          $.ajax({
            url: 'https://hacker-news.firebaseio.com/v0/item/'+ itemIdArray[i] +'.json?print=pretty',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
              console.log(res.title);
            }
          });
        }   
      },
    });
    return (
      <div>
        <h1>
          <Link to="/">Dashboard</Link>
        </h1>
        {React.cloneElement({...this.props}.children, {...this.props})}
      </div>
    )
  }
});

export default Main;