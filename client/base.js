// Add keys from firebase here:
// STANDARD FIREBASE PACKAGE
import firebase from 'firebase';
import config from './config/config';

firebase.initializeApp(config);
const database = firebase.database();

export default database;