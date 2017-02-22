// Action creators are grouped in the App.js component
// Add new action creators to the 'bundledActionCreators' using
// Object.assign so new action creators will be bound and passed down


import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();

export function getClocks(db_key, user = 'testUser') {
  return dispatch => {

    dispatch(getClocksRequestedAction());

    return database.ref(`/${user}/modules/${db_key}`).once('value', snap => {
      const clocks = snap.val();
      dispatch(getClocksFulfilledAction(clocks))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getClocksRejectedAction());
    });
  }
}

function getClocksRequestedAction() {
  return {
    type: ActionTypes.GetClocksRequested
  };
}

function getClocksRejectedAction() {
  return {
    type: ActionTypes.GetClocksRejected
  }
}

function getClocksFulfilledAction(clocks) {
  return {
    type: ActionTypes.GetClocksFulfilled,
    clocks
  };
}


export function addToClocks(newClocks, db_key, user = 'testUser') {
  return dispatch => {
    dispatch(addToClocksRequestedAction());

    const clocksRef = database.ref(`/${user}/modules/${db_key}/clocks`);

    clocksRef.set(newClocks)
    .then((snap) => {
      dispatch(addToClocksFulfilledAction())
    })
    .catch((error) => {
      console.log(error);
      dispatch(addToClocksRejectedAction());
    });
  }
}

function addToClocksRequestedAction() {
  return {
    type: ActionTypes.AddToClocksRequested
  };
}

function addToClocksRejectedAction() {
  return {
    type: ActionTypes.AddToClocksRejected
  }
}

function addToClocksFulfilledAction(newClocks) {
  return {
    type: ActionTypes.AddToClocksFulfilled,
    newClocks
  };
}