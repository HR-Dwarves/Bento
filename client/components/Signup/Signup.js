import React from 'react';
import firebaseApp from '../../base';
import styles from './Signup.css';
import authProviders from '../../authProviders';
import AuthProvider from '../AuthProvider/AuthProvider';
import Loading from '../Loading/Loading';

const database = firebaseApp.database();


class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      authInProcess: false
    }
    this.authenticate = this.authenticate.bind(this);
  }

  // Authenticate function to be passed down to AuthProvider
    // Allows user to login using major providers via Firebase
  authenticate(provider){
    var context = this;
    var authProvider = authProviders[provider];

    // Set authInProcess to true and load the loading animation
    this.setState({
      authInProcess: true
    })

    firebaseApp.auth().signInWithPopup(authProvider)
    .then(function(result) {
      context.props.authenticateUser(result);
      let { displayName, uid, email, photoURL } = result.user;
      let userRef = database.ref(`users/${uid}`);
      userRef.once('value', snap => {
        let exists = snap.exists();
        // If login is successful and user does not exist, create account and redirect to home page
        if (!exists) {
          let initData = Object.assign({}, {displayName, uid, email, photoURL})
          userRef.set(initData, function() {
            console.log('user created!');
            context.props.router.push('/');
          });
        } else {
          // Redirect user to root page if account already exists
          context.props.router.push('/');
        }
      })
    })
    .catch(function(err) {
      alert('Login error, please try and login again!');
      console.error(err);
      context.setState({
        authInProcess: false
      })
    })
  }

  render() {

    // Pull styles in from CSS module
    let loader = `${styles.loader}`;
    let splash = `${styles.bentoMainSplash} column`;
    let aboutBento = `${styles.aboutBento} column`;
    let iconSection = `${styles.iconSection} column`;
    let iconStyle = `${styles.iconStyle} column`;


    if (!this.state.authInProcess) {
      return (
        <div>
          <div className='columns'>
            <section className={splash}>
              <div className={styles.bentoMainSplashContent}>
                <h1 className={styles.splashHeader}>Bento</h1>
                <p className={styles.splashSubHeader}>Revitalizing productivity</p>
                <br/>
                <div>Please login using your preferred provider below</div>
                <div className={styles.loginButtons}>
                  {Object.keys(authProviders).map(provider => {
                    return <AuthProvider 
                            authenticate={this.authenticate}
                            provider={provider} />
                  })}
                  </div>
                </div>
                <div>***Please disable popup blockers before logging in</div>
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
                <div className={styles.homepageImageHolders}>
                  <img className={styles.homePageImage}
                    src='https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/splashPage%2Fmodlist.png?alt=media&token=30139a0f-9cc0-4c25-8836-b1e4d9fae8cd'/>
                </div>
                <p className={styles.steps}>Choose your own custom set from 9 productivity modules</p>
              </div>
              <div className={iconStyle}>

                <div className={styles.homepageImageHolders}>
                  <img className={styles.homePageImage}
                    src='https://firebasestorage.googleapis.com/v0/b/dashboardapp-3d3c7.appspot.com/o/splashPage%2Fallmods.png?alt=media&token=c244421c-6bef-443c-9b65-4d66321fe85e'/>
                </div>
                <p className={styles.steps}>Arrange to become your most productive you</p>
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