import React from 'react';

const NewsItem = React.createClass({
  render(){
  	const item = this.props.newsItem;
  	// console.log(item.url);
  	return(
  	  <div>
  	    <a href={item.url ? item.url : 'https://news.ycombinator.com/item?id=' + item.id} target="_blank">{item.title}</a>
  	  </div>
  	)
  }
});

export default NewsItem;