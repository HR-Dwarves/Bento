import React from 'react';
import firebaseApp from '../../base';
import styles from './Signup.css';
import authProviders from '../../authProviders';

const database = firebaseApp.database();

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }

    this.authHandler = this.authHandler.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.logCurrentUser = this.logCurrentUser.bind(this);
  }

  handleSignup() {

  }

  authenticate(provider){
    var context = this;
    var authProvider = authProviders[provider];
    firebaseApp.auth().signInWithPopup(authProvider)
    .then(function(result) {
      context.props.authenticateUser(result);
    })
    .catch(function(err) {
      
      console.error(err);
    })
  }

  authWithGoogle() {

  }

  logCurrentUser() {
    console.log(firebaseApp.auth().currentUser);
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
          <button className="google button" onClick={() => this.authenticate('google')}>
            <span>
              Log In with Google
            </span>
            <span className="icon">
              <i className="fa fa-google" aria-hidden="true"></i>
            </span>
          </button>
          <button className="github button" onClick={() => this.authenticate('github')}>
            <span>
              Log In with Github
            </span>
            <span className="icon">
              <i className="fa fa-github" aria-hidden="true"></i>
            </span>
          </button>
          <button className="facebook button" onClick={() => this.authenticate('facebook')}>
            <span>
              Log In with Facebook
            </span>
            <span className="icon">
              <i className="fa fa-facebook-official" aria-hidden="true"></i>
            </span>
          </button>
          <button className="twitter button" onClick={() => this.authenticate('twitter')}>
            <span>
              Log In with Twitter
            </span>
            <span className="icon">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div>
        <button className="button" onClick={this.logCurrentUser}>
          Check Current User
        </button>
        </div>
      </nav>
    );
  }
}

export default Signup;