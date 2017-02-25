import React from 'react';
import styles from './DefaultModule.css';

class DefaultModule extends React.Component{
  render() {
    let defaultStyle = `${styles.defaultCard} card`;

  	return(
  	  <div className={defaultStyle}>
  	    <header className="card-header">
  	      <div className="card-header-title">
  	        Welcome!
  	      </div>
  	    </header>
  	    <div className="card-content">
  	      <p>To get started, click the settings button above to add modules to your dashboard!</p>
  	    </div>
  	  </div>
  	);
  }
}

export default DefaultModule