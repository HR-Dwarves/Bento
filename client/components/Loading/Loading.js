import React from 'react';
import styles from './Loading.css';

class Loading extends React.Component {
  render() {

    let loadingStyle = `${styles.loading}`
    return (
      <div className={loadingStyle}>
        
      </div>      
    )
  }
}

export default Loading;