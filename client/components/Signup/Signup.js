import React from 'react';
import styles from './Signup.css';
import database from '../../base';


class Signup extends React.Component {
  constructor() {
    super();

    this.authHandler = this.authHandler.bind(this);
  }

  handleSignup() {

  }

  authenticate(provider){
    database.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {

  }

  render() {
    return (<nav className="signup">
      <div>SIGNUP</div>
      <p>Sign in to manage your store's inventory</p>
      <button className="google" onClick={() => this.authenticate('google')}>Log In with Google</button>
      <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
      <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
      <button className="twitter" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
    </nav>
    );
  }
}

export default Signup;