import firebase from 'firebase';
import config from './config/config';

var firebaseApp = firebase.initializeApp(config);
// const database = firebaseApp.database();

export default firebaseApp;

// export default database;