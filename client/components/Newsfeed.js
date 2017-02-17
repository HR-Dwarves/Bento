import React from 'react';
import NewsItem from './NewsItem';
import Promise from 'bluebird';

class Newsfeed extends React.Component{
  constructor(){
    super();
    this.getPosts = this.getPosts.bind(this);
    this.getPostContent = this.getPostContent.bind(this);
    this.callHackerNewsApi = Promise.promisify(this.callHackerNewsApi, {context: this});
    this.updateNew = this.updateNew.bind(this);
    this.updateTop = this.updateTop.bind(this);
  }

  getPosts(that, url){
    let feed = url;
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

  updateNew(){
    this.getPosts(this, 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
  }

  updateTop(){
    this.getPosts(this,  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  }

  componentWillMount(){
    this.getPosts(this,  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  }

  render() {
    let list = this.props.newsfeed.posts;
    return (
      <div>
        <p onClick={this.updateNew}>New</p>
        <p onClick={this.updateTop}>Top</p>
        {list ? list.map((item, key) => <NewsItem {...this.props} 
                                      newsItem={item._rejectionHandler0}
                                      key={key}/>) : []}
      </div>
    )
  }
};

export default Newsfeed;