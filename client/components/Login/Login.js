import React from 'react';
import styles from './Login.css';
import database from '../../base';


class Login extends React.Component {
  constructor() {
    super();
  }

  handleLogin() {

  }

  authenticate(provider){
    database.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler() {

  }

  render() {
    return (
      <nav className={styles.login}>
        <div>LOGIN</div>
        <button className="google" onClick={() => this.authenticate('google')}>Log In with Google</button>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
      </nav>
    );
  }
}

export default Login;