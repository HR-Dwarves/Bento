import ActionTypes from './actionTypes';
import database from '../base';

export function test(index) {
  return {
    type: 'TEST_REDUCER',
    index
  }
}

export function getDatabase() {
  return dispatch => {
    dispatch(getDBRequestedAction());
    return database.ref('/').once('value', snap => {
      const databaseInfo = snap.val();
      dispatch(getDBFulfilledAction(databaseInfo))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getDBRejectedAction());
    });
  }
}


export function getHnPosts(posts) {
  const temp = posts;
  if(temp && temp.length > 0) {
    return dispatch => {
      dispatch(getHnFulfilledAction(temp));
    }
  }
  return dispatch => {
    dispatch(getHnRequestedAction());
    return getHnFulfilledAction();
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

function getHnRequestedAction() {
  return {
    type: ActionTypes.GetHnRequested
  }
}

function getHnRejectedAction() {
  return {
    type: ActionTypes.GetHnRejected
  }
}

function getHnFulfilledAction(posts) {
  return {
    type: ActionTypes.GetHnFulfilled,
    posts
  }
}

