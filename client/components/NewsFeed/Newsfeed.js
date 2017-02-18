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
    this.updateButtons = this.updateButtons.bind(this);
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
      error: function(err) {
        console.log('got an err');
        console.log(err);
      }
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
      //this.showSpinner();
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

  updateNew(e){
    e.preventDefault();
    this.updateButtons(e);
    this.getPosts(this, 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
  }

  updateTop(e){
    e.preventDefault();
    this.updateButtons(e);
    this.getPosts(this,  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  }

  updateButtons(button) {
    let buttonName = e.target.getAttribute('value');
  }

  componentWillMount(){
    this.getPosts(this,  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  }

  render() {
    let list = this.props.newsfeed.posts;
    return (
      <div className="column">
        <div className="card">
          <header className="card-header">
            <div className="card-header-title">
              Hacker News
            </div>
            <div className="card-header-icon">
              <span className="icon">
                <i className="fa fa-hacker-news" aria-hidden="true"></i>
              </span>
            </div>
          </header>
          <div className="card-content">
            {this.props.newsfeed.testState ? <div></div> : <a className="button is-loading">Loading</a>}
            {list ? list.map((item, key) => <NewsItem {...this.props} 
                                          newsItem={item._rejectionHandler0}
                                          key={key}/>) : []}
          </div>
          <footer className="card-footer">
            <a value="New" className="card-footer-item" onClick={this.updateNew}>New</a>
            <a value="Top" className="card-footer-item" onClick={this.updateTop}>Top</a>
          </footer>
        </div>
      </div>
    )
  }
};

export default NewsFeed;