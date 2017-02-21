import React from 'react';

class DefaultModule extends React.Component{
  render() {
  	return(
  	  <div className="card">
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