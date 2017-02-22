import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();


export function getHnPosts(posts) {
  const temp = posts;
  if(temp && temp.length > 0) {
    return dispatch => {
      // dispatch(getHnRequestedAction());
      dispatch(getHnFulfilledAction(temp));
    }
  }
  // return dispatch => {
  //   dispatch(getHnRequestedAction());
  //   return getHnFulfilledAction();
  // }
}

export function requestHnPosts() {
  return dispatch => {
    dispatch(getHnRequestedAction());
  }
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