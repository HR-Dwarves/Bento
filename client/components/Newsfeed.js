import React from 'react';

const Newsfeed = React.createClass({

  componentWillMount(){
    let feed = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    let itemIdArray = [];
    $.ajax({
      url: feed,
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
  	    for(var i = 0; i < 5; i++) {
  	      itemIdArray.push(res[i]);
   	    }
        for(var i = 0; i < itemIdArray.length; i++) {
          $.ajax({
            url: 'https://hacker-news.firebaseio.com/v0/item/'+ itemIdArray[i] +'.json?print=pretty',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
              for(var i = 0; i < itemIdArray.length; i++) {
                itemIdArray[i] = res;
                console.log(itemIdArray[i].title);	
              }
            },
          });
        }   
      },
    });
  },

  render() {
    return (
      <div>
        Inside Newsfeed
      </div>
    )
  }
});

export default Newsfeed;