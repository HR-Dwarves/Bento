// Add keys from firebase here:
// STANDARD FIREBASE PACKAGE
import firebase from 'firebase';
import config from './config/config';

// const config = {
//   apiKey: 'AIzaSyA2Vq9okaPvwNahEVH0s-KgyJ2fBattPOw',
//   authDomain: 'dashboardapp-3d3c7.firebaseapp.com',
//   databaseURL: 'https://dashboardapp-3d3c7.firebaseio.com'
// };

firebase.initializeApp(config);
const database = firebase.database();

export default database;

// REBASE NPM PACKAGE
// import Rebase from 're-base';

// const base = Rebase.createClass({
//   apiKey: 'AIzaSyA2Vq9okaPvwNahEVH0s-KgyJ2fBattPOw',
//   authDomain: 'dashboardapp-3d3c7.firebaseapp.com',
//   databaseURL: 'https://dashboardapp-3d3c7.firebaseio.com',
// });

// export default base;