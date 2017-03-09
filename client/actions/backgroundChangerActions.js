import ActionTypes from './actionTypes';
import firebaseApp from '../base';

const database = firebaseApp.database();
const storage = firebaseApp.storage();

export function ChangeBackground(inputUrl, db_key, user = 'test') {
  return dispatch => {
    dispatch(ChangeBackgroundRequestedAction());

    let url = database.ref(`users/${user}/background`);

    url.set(inputUrl)
    .then((snap) => {
      dispatch(ChangeBackgroundFulfilledAction(inputUrl));
    })
    .catch(error => {
      console.error(error);
      dispatch(ChangeBackgroundRejectedAction());
    });
 }   
}

export function RemoveBackground(user = 'test') {
  return dispatch => {
    dispatch(RemoveBackgroundRequestAction());

    let url = database.ref(`users/${user}/background`);

    url.set('')
    .then(() => {
      dispatch(ChangeBackgroundFulfilledAction(''));
    })
    .catch(error => {
      console.error(error);
      dispatch(ChangeBackgroundRejectedAction());
    });
  }
}

function ChangeBackgroundRequestedAction() {
  return {
    type: ActionTypes.ChangeBackgroundRequested
  };
}

function ChangeBackgroundRejectedAction() {
  return {
    type: ActionTypes.ChangeBackgroundRejected
  };
}

function ChangeBackgroundFulfilledAction(inputUrl) {
  return {
    type: ActionTypes.ChangeBackgroundFulfilled,
    inputUrl
  };
}
