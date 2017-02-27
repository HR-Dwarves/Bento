import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();

export function updateText(target, newStuff, db_key, user = 'testUser') {
  return dispatch => {
    // dispatch(updateTextRequestedAction());
    const stickyRef = database.ref(`users/${user}/modules/${db_key}/${target}`)
    
    stickyRef.set(newStuff)
    .then(snap => {
      // dispatch(updateTextFulfilledAction());
    })
    .catch(error => {
      console.error(error);
      // dispatch(updateTextRejectedAction())
    })
  }
}

function updateTextRequestedAction() {
  return {
    type: ActionTypes.UpdateStickyTextRequested
  };
}

function updateTextRejectedAction() {
  return {
    type: ActionTypes.UpdateStickyTextRejected
  };
}

function updateTextFulfilledAction() {
  return {
    type: ActionTypes.UpdateStickyTextFulfilled
  };
}
