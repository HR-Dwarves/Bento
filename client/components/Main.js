import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  render() {
    let feed = "https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&topic=tc&output=rss"
    $.ajax(feed, {
      accepts: {
        xml: "application/rss+xml"
      },
      dataType: "xml",
      success: function(data) {
        $(data).find("item").each(function(){
          var el = $(this);
          console.log(el.find("title").text());
        });
      }
    })
    return (
      <div>
        <h1>
          <Link to="/">Dashboard</Link>
        </h1>
        {React.cloneElement({...this.props}.children, {...this.props})}
      </div>
    )
  }
});

export default Main;