import React from 'react';
import firebaseApp from '../../base';
import styles from './Signup.css';
import authProviders from '../../authProviders';

const database = firebaseApp.database();

import Loading from '../Loading/Loading';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      authInProcess: false
    }
    this.authenticate = this.authenticate.bind(this);
    this.logCurrentUser = this.logCurrentUser.bind(this);
    this.handleLoginModal = this.handleLoginModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  authenticate(provider){
    var context = this;
    var authProvider = authProviders[provider];
    this.setState({
      authInProcess: true
    })
    firebaseApp.auth().signInWithPopup(authProvider)
    .then(function(result) {
      // Save user information within auth container
      // console.log(result);
      context.setState({
        authInProcess: false
      })
      context.props.authenticateUser(result);
      let { displayName, uid, email, photoURL } = result.user;
      let userRef = database.ref(`users/${uid}`);
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
      context.setState({
        authInProcess: false
      })
    })
  }

  logCurrentUser() {
    console.log(firebaseApp.auth().currentUser);
  }

  alertLoginError() {

  }

  handleLoginModal(){
    this.setState({
      clicked: !this.state.clicked
    });
  }

  closeModal(){
    this.setState({
      clicked: false
    });
  }

  render() {
    let googleStyle = `${styles.google} button`
    let githubStyle = `${styles.github} button`
    let facebookStyle = `${styles.facebook} button`
    let twitterStyle = `${styles.twitter} button`
    let googleIconStyle = `${styles.loginIcon} fa fa-google`
    let githubIconStyle = `${styles.loginIcon} fa fa-github`
    let facebookIconStyle = `${styles.loginIcon} fa fa-facebook`
    let twitterIconStyle = `${styles.loginIcon} fa fa-twitter`
    let getStartedButton = `${styles.getStartedButton} button is-outlined`
    let loader = `${styles.loader}`
    let splash = `${styles.bentoMainSplash} column`
    let aboutBento = `${styles.aboutBento} column`
    let iconSection = `${styles.iconSection} column`
    let iconStyle = `${styles.iconStyle} column`


    if (!this.state.authInProcess) {
      return (
        <div>
        <div className='columns'>
          <section className={splash}>
            <div className={styles.bentoMainSplashContent}>
              <h1 className={styles.splashHeader}>Bento</h1>
              <p className={styles.splashSubHeader}>Your own customizable productivity dashboard. Login below.</p>
              <br/>
              <div className={styles.loginButtons}>
                <button className={googleStyle} onClick={() => this.authenticate('google')}>
                  <span className={styles.buttonText}>
                    Google
                  </span>
                  <span className="icon">
                    <i className={googleIconStyle} aria-hidden="true"></i>
                  </span>
                </button>
                <button className={githubStyle} onClick={() => this.authenticate('github')}>
                  <span className={styles.buttonText}>
                    Github
                  </span>
                  <span className="icon">
                    <i className="fa fa-github" aria-hidden="true"></i>
                  </span>
                </button>
                <button className={facebookStyle} onClick={() => this.authenticate('facebook')}>
                  <span className={styles.buttonText}>
                    Facebook
                  </span>
                  <span className="icon">
                    <i className="fa fa-facebook-official" aria-hidden="true"></i>
                  </span>
                </button>
                <button className={twitterStyle} onClick={() => this.authenticate('twitter')}>
                  <span className={styles.buttonText}>
                    Twitter
                  </span>
                  <span className="icon">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </span>
                </button>
                </div>
              </div>
            </section>
        </div>
        <div className='columns'>
          <div className={aboutBento}>
            <div className={styles.aboutText}>
              <h1 className={styles.aboutHeader}>What is Bento?</h1>
              <p className={styles.aboutSubHeader}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
        </div>
        <div className='columns'>
            <div className={iconStyle}>
              <img src='http://www.languagenut.com/assets/media/placeholders/250x250-circle.png'/>
              <h1>1</h1>
              <p>Login</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className={iconStyle}>
              <img src='http://www.languagenut.com/assets/media/placeholders/250x250-circle.png'/>
              <h1>2</h1>
              <p>Add modules</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className={iconStyle}>
              <img src='http://www.languagenut.com/assets/media/placeholders/250x250-circle.png'/>
              <h1>3</h1>
              <p>Customize it!</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <nav className={styles.signup}>
          <Loading />
        </nav>
      );
    }
  }
}

export default Signup;