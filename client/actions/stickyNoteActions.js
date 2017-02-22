import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();

export function updateText(target, newStuff, db_key) {
  return dispatch => {
    dispatch(updateTextRequestedAction());
    const stickyRef = database.ref(`/testUser/modules/${db_key}/${target}`)
    // console.log('INSIDE UPDATE HEADER IN STICKYNOTE ACTIONS')
    
    stickyRef.set(newStuff)
    .then(snap => {
      dispatch(updateTextFulfilledAction());
    })
    .catch(error => {
      console.log(error);
      dispatch(updateTextRejectedAction())
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