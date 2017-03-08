import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();

export function addNotification(message, user = 'testUser') {
  return dispatch => {
    dispatch(addNotificationAction(message));
  }
}


export function removeNotification(index, user = 'testUser') {
  return dispatch => {
    dispatch(removeNotificationAction(index));
  }
}

function addNotificationAction(message) {
  return {
    type: ActionTypes.AddNotification,
    message
  }
}

function removeNotificationAction(index) {
  return {
    type: ActionTypes.RemoveNotification,
    index
  }
}