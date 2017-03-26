import React from 'react';
import styles from './AuthProvider.css';

class AuthProvider extends React.Component {
  constructor() {
    super();
  }

  render() {
    // Pull login provider from props
    let provider =  this.props.provider;
    
    // Set styles based on provider
    let buttonStyle = `${styles[provider]} button ${styles.loginButton}`;
    let iconSpan = `${styles.iconSpan} icon`;
    let iconStyle = `${styles.loginIcon} fa fa-${provider}`;

    return (
      <button className={buttonStyle} onClick={() => this.props.authenticate(provider)}>
        <span className={styles.buttonText}>
          {provider[0].toUpperCase() + provider.slice(1)}
        </span>
        <span className={iconSpan}>
          <i className={iconStyle} aria-hidden="true"></i>
        </span>
      </button>
    )
  }
}
 export default AuthProvider;