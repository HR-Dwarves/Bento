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
    this.authenticate = this.authenticate.bind(this);
    this.logCurrentUser = this.logCurrentUser.bind(this);
  }

  authenticate(provider){
    var context = this;
    var authProvider = authProviders[provider];
    firebaseApp.auth().signInWithPopup(authProvider)
    .then(function(result) {
      // Save user information within auth container
      console.log(result);
      context.props.authenticateUser(result);
      let { displayName, uid, email, photoURL } = result.user;
      let userRef = database.ref(`/${uid}`);
      userRef.once('value', snap => {
        let exists = snap.exists();
        if (!exists) {
          let initData = Object.assign({}, {displayName, uid, email, photoURL})
          userRef.set(initData, function() {
            console.log('user created!');
            context.props.router.push('/');
          });
        } else {
          // Redirect user to root page
          context.props.router.push('/');
        }
      })
    })
    .catch(function(err) {
      alert('Login error, please try and login again');
      console.error(err);
    })
  }

  logCurrentUser() {
    console.log(firebaseApp.auth().currentUser);
  }

  alertLoginError() {

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