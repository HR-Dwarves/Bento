// Action creators are grouped in the App.js component
// Add new action creators to the 'bundledActionCreators' using
// Object.assign so new action creators will be bound and passed down

import ActionTypes from './actionTypes';
import database from '../base';

export function getDatabase(user = 'testUser') {
  return dispatch => {
    dispatch(getDBRequestedAction());
    return database.ref(`/${user}`).once('value', snap => {
      const databaseInfo = snap.val();
      dispatch(getDBFulfilledAction(databaseInfo))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getDBRejectedAction());
    });
  }
}

function getDBRequestedAction() {
  return {
    type: ActionTypes.GetDBRequested
  };
}

function getDBRejectedAction() {
  return {
    type: ActionTypes.GetDBRejected
  }
}

function getDBFulfilledAction(databaseInfo) {
  return {
    type: ActionTypes.GetDBFulfilled,
    databaseInfo
  };
}

export function deleteModule(db_key, user = 'testUser') {
  return dispatch => {
    dispatch(deleteModuleRequestedAction());
    const moduleRef = database.ref(`/${user}/modules/${db_key}`)

    moduleRef.remove()
    .then((snap) => {
      dispatch(deleteModuleFulfilledAction());
    })
    .catch((error) => {
      console.error(error);
      dispatch(deleteModuleRejectedAction());
    })

  }
}

function deleteModuleRequestedAction() {
  return {
    type: ActionTypes.DeleteModuleRequested
  };
}

function deleteModuleRejectedAction() {
  return {
    type: ActionTypes.DeleteModuleRejected
  }
}

function deleteModuleFulfilledAction(databaseInfo) {
  return {
    type: ActionTypes.DeleteModuleFulfilled
  };
}

export function getGeolocation() {
  return dispatch => {

    dispatch(getGeolocationRequestedAction());

    return navigator.geolocation.getCurrentPosition(function(position) {

      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      let geocoordinates = {
        latitude: lat,
        longitude: long
      }

      sessionStorage.setItem('latitude', lat);
      sessionStorage.setItem('longitude', long);

      dispatch(getGeolocationFulfilledAction(geocoordinates))
    });
    // not clear how to follow this form here. Above function is
    // not returning a promise. Post MVP!

    // .catch((error) => {
    //   console.log(error);
    //   dispatch(getGeolocationRejectedAction());
    // });
  }
}

function getGeolocationRequestedAction() {
  return {
    type: ActionTypes.GetGeolocationRequested
  };
}

function getGeolocationRejectedAction() {
  return {
    type: ActionTypes.GetGeolocationRejected
  }
}

function getGeolocationFulfilledAction(geocoordinates) {
  return {
    type: ActionTypes.GetGeolocationFulfilled,
    geocoordinates
  };
}