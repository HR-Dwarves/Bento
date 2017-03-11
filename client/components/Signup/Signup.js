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
    let googleStyle = `${styles.google} button ${styles.loginButton}`;
    let githubStyle = `${styles.github} button ${styles.loginButton}`;
    let facebookStyle = `${styles.facebook} button ${styles.loginButton}`;
    let twitterStyle = `${styles.twitter} button ${styles.loginButton}`;
    let googleIconStyle = `${styles.loginIcon} fa fa-google`;
    let githubIconStyle = `${styles.loginIcon} fa fa-github`;
    let facebookIconStyle = `${styles.loginIcon} fa fa-facebook`;
    let twitterIconStyle = `${styles.loginIcon} fa fa-twitter`;
    let getStartedButton = `${styles.getStartedButton} button is-outlined`;
    let loader = `${styles.loader}`;
    let splash = `${styles.bentoMainSplash} column`;
    let aboutBento = `${styles.aboutBento} column`;
    let iconSection = `${styles.iconSection} column`;
    let iconStyle = `${styles.iconStyle} column`;
    let loginButton = `${styles.loginButton}`;
    let iconSpan = `${styles.iconSpan} icon`;

    if (!this.state.authInProcess) {
      return (
        <div>
          <div className='columns'>
            <section className={splash}>
              <div className={styles.bentoMainSplashContent}>
                <h1 className={styles.splashHeader}>Bento</h1>
                <p className={styles.splashSubHeader}>Revitalizing productivity</p>
                <br/>
                <div className={styles.loginButtons}>
                  <button className={googleStyle} onClick={() => this.authenticate('google')}>
                    <span className={styles.buttonText}>
                      Google
                    </span>
                    <span className={iconSpan}>
                      <i className={googleIconStyle} aria-hidden="true"></i>
                    </span>
                  </button>
                  <button className={githubStyle} onClick={() => this.authenticate('github')}>
                    <span className={styles.buttonText}>
                      Github
                    </span>
                    <span className={iconSpan}>
                      <i className="fa fa-github" aria-hidden="true"></i>
                    </span>
                  </button>
                  <button className={facebookStyle} onClick={() => this.authenticate('facebook')}>
                    <span className={styles.buttonText}>
                      Facebook
                    </span>
                    <span className={iconSpan}>
                      <i className="fa fa-facebook-official" aria-hidden="true"></i>
                    </span>
                  </button>
                  <button className={twitterStyle} onClick={() => this.authenticate('twitter')}>
                    <span className={styles.buttonText}>
                      Twitter
                    </span>
                    <span className={iconSpan}>
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
                <p className={styles.aboutSubHeader}>Bento is a fully customizable productivity application providing you with a personalized dashboard</p>
              </div>
            </div>
          </div>
          <div className='columns'>
              <div className={iconStyle}>
                {/*<div>
                  <span className={`${styles.homepageIcons} icon`}>
                    <i className={`${styles.signin} fa fa-sign-in`} aria-hidden="true"></i>
                  </span>
                </div>*/}
                <div className={styles.homepageImageHolders}>
                  <img className={styles.homePageImage}
                    src='https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/splashPage%2Fmodlist.png?alt=media&token=30139a0f-9cc0-4c25-8836-b1e4d9fae8cd'/>
                </div>
                {/*<h1 className={styles.stepsHeader}>1: Login</h1>
                <p className={styles.steps}>Login using your favorite social media account</p>*/}
                <p className={styles.steps}>Choose your own custom set from 9 productivity modules</p>
              </div>
              <div className={iconStyle}>
                {/*<div>
                  <span className={`${styles.homepageIcons} icon`}>
                    <i className={`${styles.signin} fa fa-cogs`} aria-hidden="true"></i>
                  </span>
                </div>*/}
                <div className={styles.homepageImageHolders}>
                  <img className={styles.homePageImage}
                    src='https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/splashPage%2Fallmods.png?alt=media&token=c244421c-6bef-443c-9b65-4d66321fe85e'/>
                </div>
                {/*<h1 className={styles.stepsHeader}>2: Add modules</h1>
                <p className={styles.steps}>Add as many modules as you like</p>*/}
                <p className={styles.steps}>Arrange to become your most productive you</p>
              </div>
              {/*<div className={iconStyle}>
                <div>
                  <span className={`${styles.homepageIcons} icon`}>
                    <i className={`${styles.signin} fa fa-space-shuttle`} aria-hidden="true"></i>
                  </span>
                </div>
                <div className={styles.homepageImageHolders}>
                  <img className={styles.homePageImage}
                    src='https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/splashPage%2Fallmods.png?alt=media&token=6db55984-b2a3-4150-b410-1172ed42b628' />
                </div>
                <h1 className={styles.stepsHeader}>3: Customize it!</h1>
                <p className={styles.steps}>Drag and drop to customize your dashboard</p>
              </div>*/}
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