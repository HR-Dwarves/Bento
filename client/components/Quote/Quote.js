import React from 'react';
import axios from 'axios';
import styles from './Quote.css';
import * as LS from '../../util/localStorageUtil';
import Loading from '../Loading/Loading';


class Quote extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: {
        quoteText: '',
        quoteAuthor: ''
      },
      timestamp: null,
      quoteReceived: false
    }
  }
  
  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote() {
    
    var context = this;
    var quotes = LS.getFromLS('quotes')

    if (!quotes.value) {
      console.log('LS Quotes not available');
      axios.get('https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/Quotes.json?alt=media&token=ac034d18-b70a-4fa3-ad9b-55fae3c70487')
      .then(function(response) {
        console.log(response.data);
        LS.saveToLS('quotes', null, response.data);
        var index = Math.floor(Math.random() * Object.keys(response.data).length);
        var quoteArray = response.data[index];
        context.setState({
          quote: {
            quoteText: quoteArray[0],
            quoteAuthor: quoteArray[1]
          },
          timestamp: new Date(),
          quoteReceived: true
        })
      })
      .catch(function(err) {
        console.error(err);
      })
    } else {
      console.log('LS Quotes available!');
      var index = Math.floor(Math.random() * Object.keys(quotes.value).length);
      var quoteArray = quotes.value[index];
      this.setState({
        quote: {
          quoteText: quoteArray[0],
          quoteAuthor: quoteArray[1]
        },
        timestamp: Date.now(),
        quoteReceived: true
      })
    }

  }

  render() {
    let cssClasses = `${styles.quoteCard} card`;
    let headerStyle = `${styles.header} card-header`;
    let quoteContent = `${styles.quoteContent} card-content`
    let footerStyle = `${styles.footer} card-footer`;
    let quoteTextStyle = `${styles.quoteText}`;
    let loadingStyle = `${styles.loading}`;


    if (this.state.quoteReceived) {
      return (
        <div className={cssClasses}>
          <header className={headerStyle}>
            <div className="card-header-title">
              Quote of the Day
            </div>
            <span href="" className="card-header-icon">
              <span className="icon">
                <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
              </span>
            </span>
          </header>
          <div className={quoteContent}>
            <span className={quoteTextStyle}>"{this.state.quote.quoteText}"</span>
          </div>
          <footer className={footerStyle}>
            <span className='card-footer-item'>{this.state.quote.quoteAuthor}</span>
          </footer>
        </div>
      )
    } else {
      return (
        <div className={cssClasses}>
          <header className={headerStyle}>
            <div className="card-header-title">
              Quote of the Day
            </div>
            <span href="" className="card-header-icon">
              <span className="icon">
                <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
              </span>
            </span>
          </header>
          <div className={loadingStyle}>
            <Loading />
          </div>
        </div>
      )
    }
  }
}

export default Quote;