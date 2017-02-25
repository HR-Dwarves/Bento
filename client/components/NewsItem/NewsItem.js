import React from 'react';
import styles from './NewsItem.css';

const NewsItem = React.createClass({
  render(){
  	const item = this.props.newsItem;
  	const newsItem = `${styles.newsItem}`
  	const newsLink = `${styles.newsLink}`
  	return(
  	  <div className={newsItem}>
  	    <a className={newsLink} href={item.url ? item.url : 'https://news.ycombinator.com/item?id=' + item.id} target="_blank">{item.title}</a>
  	  </div>
  	)
  }
});

export default NewsItem;