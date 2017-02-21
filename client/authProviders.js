import firebase from 'firebase';

var authProviders = {
  'google': new firebase.auth.GoogleAuthProvider(),
  'twitter': new firebase.auth.TwitterAuthProvider(),
  'facebook': new firebase.auth.FacebookAuthProvider(),
  'github': new firebase.auth.GithubAuthProvider()
}

export default authProviders;