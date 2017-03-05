import React from 'react';
import jsonp from 'jsonp';
import styles from './Quote.css';

class Quote extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: {
        quoteText: '',
        quoteAuthor: ''
      }
      timestamp: null,
      quoteReceived: false
    }
  }
  
  componentDidMount() {
    var context = this;
    jsonp('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=callback', 
      {
        timeout: 30000
      }, 
      function(err, data) {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
          context.setState({
            quote: data
            timestamp: new Date(),
            quoteReceived: true
          })
        }
      }
    );
  }




  render() {
    let cssClasses = `${styles.quoteCard} card`;
    let headerStyle = `${styles.header} card-header`;
    let listContent = `${styles.quoteContent}`
    let footerStyle = `${styles.footer} card-footer`;


    return (
      <div className={cssClasses}>
        <header className={headerStyle}>
          <span>Quote</span>
        </header>
        <div className={listContent}>
          <span>{this.state.quote.quoteText}</span>
        </div>
        <footer className={footerStyle}>
          <span>{this.state.quote.}</span>
        </footer>
      </div>
    )
  }


}

export default Quote;