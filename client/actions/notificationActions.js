import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();

export function addNotification(newMessage, user = 'testUser') {
  return dispatch => {
    dispatch(addNotificationAction(newMessage));
  }
}


export function removeNotification(index, user = 'testUser') {
  return dispatch => {
    dispatch(removeNotificationAction(index));
  }
}

function addNotificationAction(newMessage) {
  return {
    type: ActionTypes.AddNotification,
    newMessage
  }
}

function removeNotificationAction(index) {
  return {
    type: ActionTypes.RemoveNotification,
    index
  }
}