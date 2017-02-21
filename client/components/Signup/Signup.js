import React from 'react';
import firebase from 'firebase';
import styles from './Signup.css';
import database from '../../base';
import authProviders from '../../authProviders';


class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }

    this.authHandler = this.authHandler.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  handleSignup() {

  }

  authenticate(provider){
    var context = this;
    var authProvider = authProviders[provider];
    firebase.auth().signInWithPopup(authProvider)
    .then(function(result) {
      context.setState({user: result});
    })
    .catch(function(err) {
      console.error(err);
    })
  }

  authWithGoogle() {

  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
    }
    console.log('AUTH DATA');
    console.log(authData);
  }

  render() {
    return (
      <nav className={styles.signup}>
        <div>
          <span>SIGNUP</span>
        </div>
        <div>
          <button className="google button" onClick={() => this.authenticate('google')}>Log In with Google</button>
          <button className="github button" onClick={() => this.authenticate('github')}>Log In with Github</button>
          <button className="facebook button" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
          <button className="twitter button" onClick={() => this.authenticate('twitter')} >Log In with Twitter</button>
        </div>
      </nav>
    );
  }
}

export default Signup;