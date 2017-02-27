import React from 'react';
import NewsItem from './../NewsItem/NewsItem';
import Promise from 'bluebird';
import classnames from 'classnames';
import firebaseApp from '../../base'
import styles from './NewsFeed.css';

const database = firebaseApp.database();

class NewsFeed extends React.Component {
  constructor(){
    super();
    this.getPosts = this.getPosts.bind(this);
    this.getPostContent = this.getPostContent.bind(this);
    this.callHackerNewsApi = Promise.promisify(this.callHackerNewsApi, {context: this});
    this.updateNew = this.updateNew.bind(this);
    this.updateTop = this.updateTop.bind(this);
    this.updateButtons = this.updateButtons.bind(this);
    this.setLoadedToFalse = this.setLoadedToFalse.bind(this);
    this.removePosts = this.removePosts.bind(this);
    this.state = {
      posts: [],
      loaded: false
    };
  }

  getPosts(that, url, key){
    let feed = url;
    let itemIdArray = [];
    $.ajax({
      url: feed,
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        that.getPostContent(res, key);
      },
      error: function(err) {
        console.log('got an err');
        console.log(err);
      }
    });
  }

  getPostContent(ids, key) {
    const user = this.props.user.uid;

    var postsArray = [];
    for(var i = 0; i < 5; i++) {
      postsArray.push(this.callHackerNewsApi(ids[i]));
    }
    Promise.all(postsArray)
    .then((results) => {
      this.props.getHnPosts(postsArray);
      let dbRef = database.ref(`users/${user}/modules/${key}`);
      this.setState({
        posts: results
      });
      this.setState({
        loaded: true
      })
      dbRef.once('value', snap => {
        let exists = snap.exists();
        if (exists) {
          dbRef.update({
          loaded: true,
          posts: results
          });
        }
      });
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
    this.setLoadedToFalse();
    e.preventDefault();
    this.removePosts();
    this.updateButtons(e);
    this.getPosts(this, 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty', this.props.db_key);
    this.props.requestHnPosts();
  }

  updateTop(e){
    e.preventDefault();
    this.removePosts();
    this.updateButtons(e);
    this.getPosts(this, 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', this.props.db_key);
    this.setLoadedToFalse();
    this.props.requestHnPosts();
  }

  updateButtons(button) {
    const user = this.props.user.uid;
    const db_key = this.props.db_key

    let buttonName = button.target.getAttribute('value');
    if(buttonName === 'Top') {
      database.ref(`users/${user}/modules/${db_key}`).update({
        top: true,
        new: false
      });
    } else {
      database.ref(`users/${user}/modules/${db_key}`).update({
        top: false,
        new: true
      });
    }
  }

  setLoadedToFalse(){
    const user = this.props.user.uid;
    const db_key = this.props.db_key
    this.setState({
      loaded: false
    });
    database.ref(`users/${user}/modules/${db_key}`).update({
      loaded: false
    });
  }

  removePosts(){
    const user = this.props.user.uid;
    const db_key = this.props.db_key
    database.ref(`users/${user}/modules/${db_key}/posts`).remove();
    this.setState({
      posts: []
    });
  }

  componentWillMount(){
    const user = this.props.user.uid;
    const db_key = this.props.db_key
    this.removePosts();
    this.setLoadedToFalse();
    if(this.props.dashboard.modules[db_key].top){
      this.getPosts(this,  'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', db_key);
    } else {
      this.getPosts(this,  'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty', db_key);
    }

  }

  render() {
    //let list = this.props.dashboard.modules[this.props.db_key].posts;
    let list = this.state.posts;
    let cssClasses = `${styles.test}`;
    let spinner = `${styles.spinner}`;
    let newClasses = classnames('card-footer-item', `${styles.newsButtons}`, this.props.dashboard.modules[this.props.db_key].new ? cssClasses : '');
    let topClasses = classnames('card-footer-item', `${styles.newsButtons}`, this.props.dashboard.modules[this.props.db_key].new ? '' : cssClasses);
    let spinnerClasses = classnames('button is-loading', spinner);
    //let loaded = this.props.dashboard.modules[this.props.db_key].loaded;
    let loaded = this.state.loaded;
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    //if loaded
      //if list.length !== 0
        //map list
      //empty array
    //else 
      //loaded
    return (
      <div className="">
        <div className="card">
          <header className="card-header">
            <div className="card-header-title">
              Hacker News
            </div>
            <div className="card-header-icon">
              <span className="icon">
                <i onClick={this.props.handleCollapseFunction} className="fa fa-hacker-news" aria-hidden="true"></i>
              </span>
            </div>
          </header>
          <div className={collapsedStyle}>
            <div className="card-content">
              {loaded ? list.length !== 0 ? list.map((item, key) => <NewsItem {...this.props}
                                            newsItem={item}
                                            key={key}/>) : [] : <a className={spinnerClasses}>Loading</a>}
            </div>
            <footer className="card-footer">
              <a value="New" className={newClasses} onClick={this.updateNew}>New</a>
              <a value="Top" className={topClasses} onClick={this.updateTop}>Top</a>
            </footer>
          </div>
        </div>
      </div>
    )
  }
};

export default NewsFeed;
