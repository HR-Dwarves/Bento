import React from 'react';
import styles from './Loading.css';

class Loading extends React.Component {
  render() {

    let loadingStyle = `${styles.loader}`
    return (
      <div className={loadingStyle}>Loading...</div>      
    )
  }
}

export default Loading;