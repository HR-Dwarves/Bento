import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA2Vq9okaPvwNahEVH0s-KgyJ2fBattPOw',
  authDomain: 'dashboardapp-3d3c7.firebaseapp.com',
  databaseURL: 'https://dashboardapp-3d3c7.firebaseio.com',
  storageBucket: "dashboardapp-3d3c7.appspot.com"
};

var firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
