import React from 'react';
import NewsItem from './../NewsItem/NewsItem';
import Promise from 'bluebird';

import styles from './NewsFeed.css';

class NewsFeed extends React.Component {
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
    let cssClasses = `${styles.newsToggles}`;
    return (
      <div className="column">
        <div className="card">
          <div className="card-content">
            <i className="fa fa-hacker-news" aria-hidden="true"></i> Hacker News
            <ul>
              <li className={cssClasses}><p onClick={this.updateNew}>New</p></li>
              <li className={cssClasses}><p onClick={this.updateTop}>Top</p></li>
            </ul>
            {list ? list.map((item, key) => <NewsItem {...this.props} 
                                          newsItem={item._rejectionHandler0}
                                          key={key}/>) : []}
          </div>
        </div>
      </div>
    )
  }
};

export default NewsFeed;