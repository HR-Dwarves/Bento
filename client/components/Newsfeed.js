import React from 'react';
import NewsItem from './NewsItem';
import Promise from 'bluebird';

class Newsfeed extends React.Component{
  constructor(){
    super();
    this.getPosts = this.getPosts.bind(this);
    this.getPostContent = this.getPostContent.bind(this);
    this.callHackerNewsApi = Promise.promisify(this.callHackerNewsApi, {context: this});
  }

  getPosts(that){
    let feed = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    let itemIdArray = [];
    $.ajax({
      url: feed,
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        that.getPostContent(res);  
      },
    });
  }

  getPostContent(ids) { 
    var postsArray = [];
    for(var i = 0; i < 5; i++) {
      postsArray.push(this.callHackerNewsApi(ids[i]));
    }
    Promise.all(postsArray)
    .then((results) => {
      console.log('inside promise.all ' + JSON.stringify(results[0]))
      this.props.getHnPosts(postsArray);
    })
  }

  callHackerNewsApi(id, callback) {
    $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty',
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        callback(null, res);
      }
    });
  }

  componentWillMount(){
    this.getPosts(this);
  }

  render() {
    let list = this.props.newsfeed.posts;
    console.log(list);
    return (
      <div>
        {list ? list.map((item) => <NewsItem {...this.props} 
                                      newsItem={item._rejectionHandler0}/>) : []}
      </div>
    )
  }
};

export default Newsfeed;