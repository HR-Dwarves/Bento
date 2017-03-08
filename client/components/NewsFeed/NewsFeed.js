import React from 'react';
import NewsItem from './../NewsItem/NewsItem';
import Promise from 'bluebird';
import classnames from 'classnames';
import firebaseApp from '../../base'
import styles from './NewsFeed.css';
import newsSource from './../../data/newsSource.js';
import axios from 'axios';

const database = firebaseApp.database();
class NewsFeed extends React.Component {
  constructor(){
    super();
    this.getPosts = this.getPosts.bind(this);
    this.getPostContent = this.getPostContent.bind(this);
    this.updateNew = this.updateNew.bind(this);
    this.updateTop = this.updateTop.bind(this);
    this.updateButtons = this.updateButtons.bind(this);
    this.setLoadedToFalse = this.setLoadedToFalse.bind(this);
    this.removePosts = this.removePosts.bind(this);
    this.handleNewsChange = this.handleNewsChange.bind(this);
    this.handlePostCountChange = this.handlePostCountChange.bind(this);
    this.state = {
      posts: [],
      loaded: false,
      numberOfPosts: '5'
    };
  }

  getPosts(that, url, key){
    let feed = url;
    axios.get(feed)
    .then(function(response) {
      that.getPostContent(response.data, key);
    })
    .catch(function(error) {
      console.log('got an error:');
      console.log(error);
    });
  }

  getPostContent(ids, key) {
    const user = this.props.user.uid;
    var postsArray = [];
    this.setState({
      posts: ids,
      loaded: true
    });
  }

  updateNew(e){
    const db_key = this.props.db_key;
    const newsSource = this.props.dashboard.modules[db_key].newsSource;
    this.setLoadedToFalse();
    e.preventDefault();
    this.removePosts();
    this.updateButtons(e);
    this.getPosts(this, 'news/' + newsSource + '/latest', this.props.db_key);
    this.props.requestHnPosts();
  }

  updateTop(e){
    const db_key = this.props.db_key;
    const newsSource = this.props.dashboard.modules[db_key].newsSource;
    e.preventDefault();
    this.removePosts();
    this.updateButtons(e);
    this.getPosts(this, 'news/' + newsSource + '/top', this.props.db_key);
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
    this.setState({
      loaded: false
    });
  }

  removePosts(){
    this.setState({
      posts: []
    });
  }

  handleNewsChange(e){
    e.preventDefault();
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    let newsName = e.target.value;
    this.removePosts();
    this.setLoadedToFalse();
    database.ref(`users/${user}/modules/${db_key}`).update({
      newsSource: e.target.value
    });
    if(e.target.value !== 'none'){
      if(this.props.dashboard.modules[db_key].top) {
        this.getPosts(this, 'news/'+ newsName + '/top' );
      } else {
        this.getPosts(this, 'news/'+ newsName + '/latest');
      }
    }
  }

  handlePostCountChange(e) {
    e.preventDefault();
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const newsSource = this.props.dashboard.modules[db_key].newsSource;
    database.ref(`users/${user}/modules/${db_key}`).update({
      numberOfPosts: e.target.value
    });
    this.setState({
      numberOfPosts: e.target.value
    });
    this.setLoadedToFalse();
    if(this.props.dashboard.modules[db_key].top){
      this.getPosts(this, 'news/' + newsSource + '/top', db_key);
    } else {
      this.getPosts(this, 'news/' + newsSource + '/latest', db_key);
    }
  }

  componentWillMount(){
    
    const db_key = this.props.db_key;
    const user = this.props.user.uid;
    const newsSource = this.props.dashboard.modules[db_key]['newsSource'];
    const that = this;

    //check if numberOfPosts exists in DB
    database.ref(`users/${user}/modules/${db_key}/numberOfPosts`).once('value').then(function(snapshot) {
      let test = snapshot.val();
      if(!test){
        database.ref(`users/${user}/modules/${db_key}`).update({
          numberOfPosts: '5'
        });
      }
    });

    database.ref(`users/${user}/modules/${db_key}`).once('value').then(function(snapshot) {
      that.setState({
        numberOfPosts: snapshot.val().numberOfPosts
      });
    });
    this.removePosts();
    this.setLoadedToFalse();
    if(this.props.dashboard.modules[db_key].top){
      this.getPosts(this, 'news/' + newsSource + '/top', db_key);
    } else {
      this.getPosts(this, 'news/' + newsSource + '/latest', db_key);
    }
  }

  render() {
    let list = this.state.posts;
    let selectedNewsSource = this.props.dashboard.modules[this.props.db_key].newsSource;
    let newsfeedStyles = `${styles.newsfeed} card`;
    let headerStyles = `${styles.header} card-header`;
    let footerStyles = `${styles.footer} card-footer`;
    let contentStyles = `${styles.content} card-content`;
    let newClasses = classnames('card-footer-item', `${styles.newsButtons}`, this.props.dashboard.modules[this.props.db_key].new ? `${styles.selectedButton}` : '');
    let topClasses = classnames('card-footer-item', `${styles.newsButtons}`, this.props.dashboard.modules[this.props.db_key].new ? '' : `${styles.selectedButton}`);
    let spinnerClasses = classnames('button is-loading', `${styles.spinner}`);
    let loaded = this.state.loaded;
    let fiveButtonStyle = ''
    let moreButtonStyle = ''
    if(this.state.numberOfPosts === '5') {
      fiveButtonStyle = `${styles.postButton} button is-primary is-focused`;
      moreButtonStyle = `${styles.postButton} button is-focused`;
    } else {
      moreButtonStyle = `${styles.postButton} button is-primary is-focused`;
      fiveButtonStyle = `${styles.postButton} button is-focused`;
    }

    //render x amount of posts
    let posts = [];
    let postArray = this.state.posts;
    //user selected 'More!'
    if(this.state.numberOfPosts !== '5') {
      //checks if the current post count is less than 10
      if(this.state.posts.length < this.state.numberOfPosts) {
        for(var i = 0; i < this.state.posts.length; i++) {
          posts.push(this.state.posts[i]);
        }
      } else {
        //post count is equal to number of posts
        for(var i = 0; i < this.state.numberOfPosts; i++) {
          posts.push(this.state.posts[i]);
        }
      }
    } else {
        //user selected 5 posts
        if(this.state.posts.length >= this.state.numberOfPosts) {
          for(var i = 0; i < this.state.numberOfPosts; i++) {
            posts.push(this.state.posts[i]);
          }
        } else {
          for(var i = 0; i < this.state.posts.length; i++) {
            posts.push(this.state.posts[i]);
          }
      }
    }
    
    return (
        <div className={newsfeedStyles}>
          <header className={headerStyles}>
            <div className="card-header-title">
              <p className='control'>
                <span className="select">
                  <select value={selectedNewsSource} onChange={this.handleNewsChange} className={`${styles.removeBorder}`}>
                    {newsSource.map((item, key) => <option value={Object.keys(item)[0]}>{item[Object.keys(item)[0]]}</option>)}
                  </select>
                </span>
              </p>
            </div>
            <div className="card-header-icon">
              <button value='5' className={fiveButtonStyle} onClick={this.handlePostCountChange}>5</button>
              <button value='10'className={moreButtonStyle} onClick={this.handlePostCountChange}>More!</button>
              <span className="icon">
                <i className="fa fa-newspaper-o" aria-hidden="true"></i>
              </span>
            </div>
          </header>
          <div className={contentStyles}>
            {loaded ? list.length !== 0 ? posts.map((item, key) => <NewsItem {...this.props}
                                          newsItem={item}
                                          key={key}/>) : [] : <a className={spinnerClasses}>Loading</a>}
          </div>
          <footer className={footerStyles}>
            <a value="New" className={newClasses} onClick={this.updateNew}>New</a>
            <a value="Top" className={topClasses} onClick={this.updateTop}>Top</a>
          </footer>
        </div>
      )
  }
};

export default NewsFeed;
