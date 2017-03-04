import React from 'react';
import NewsItem from './../NewsItem/NewsItem';
import Promise from 'bluebird';
import classnames from 'classnames';
import firebaseApp from '../../base'
import styles from './NewsFeed.css';
import newsSourceMap from './NewsSourceMap';
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
    this.state = {
      posts: [],
      loaded: false
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

  componentWillMount(){
    const db_key = this.props.db_key;
    const newsSource = this.props.dashboard.modules[db_key]['newsSource'];
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
    list.length = 5;
    let selectedNewsSource = this.props.dashboard.modules[this.props.db_key].newsSource;
    let cssClasses = `${styles.test}`;
    let spinner = `${styles.spinner}`;
    let newsfeedStyles = `${styles.newsfeed} card`;
    let headerStyles = `${styles.header} card-header`;
    let footerStyles = `${styles.footer} card-footer`;
    let contentStyles = `${styles.content} card-content`;
    let newClasses = classnames('card-footer-item', `${styles.newsButtons}`, this.props.dashboard.modules[this.props.db_key].new ? cssClasses : '');
    let topClasses = classnames('card-footer-item', `${styles.newsButtons}`, this.props.dashboard.modules[this.props.db_key].new ? '' : cssClasses);
    let newsFeedTitle = classnames(`control ${styles.removeBorder}`)
    let spinnerClasses = classnames('button is-loading', spinner);
    let loaded = this.state.loaded;
    let collapsed = this.props.collapsed.collapsed;
    let collapsedStyle = classnames(`${styles.height}`, collapsed ? `${styles.collapsedStyle}` : '');
    return (
        <div className={newsfeedStyles}>
          <header className={headerStyles}>
            <div className="card-header-title">
              <p className='control'>
                <span className="select">
                  <select value={selectedNewsSource} onChange={this.handleNewsChange} className={`${styles.removeBorder}`}>
                    <option value="none">Change news source</option>
                    <option value="hacker-news">Hacker News</option>
                    <option value="associated-press">Associated Press</option>
                    <option value="business-insider">Business Insider</option>
                    <option value="buzzfeed">Buzzfeed</option>
                    <option value="time">Time</option>
                    <option value="the-economist">The Economist</option>
                    <option value="techradar">TechRadar</option>
                    <option value="techcrunch">TechCrunch</option>
                    <option value="newsweek">Newsweek</option>
                    <option value="fortune">Fortune</option>
                  </select>
                </span>
              </p>
            </div>
            <div className="card-header-icon">
              <span className="icon">
                <i className="fa fa-newspaper-o" aria-hidden="true"></i>
              </span>
            </div>
          </header>
          <div className={contentStyles}>
            {loaded ? list.length !== 0 ? list.map((item, key) => <NewsItem {...this.props}
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
