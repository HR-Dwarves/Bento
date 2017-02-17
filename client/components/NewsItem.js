import React from 'react';

const NewsItem = React.createClass({
  render(){
  	const item = this.props.newsItem;
  	return(
  	  <div>
  	    <a href={item.url} target="_blank">{item.title}</a>
  	  </div>
  	)
  }
});

export default NewsItem;