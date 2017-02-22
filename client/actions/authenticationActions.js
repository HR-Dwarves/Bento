import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();


export function authenticateUser(user) {
  return dispatch => {
    dispatch(authenticateUserAction(user));
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(logoutUserAction());
  }
}

function authenticateUserAction(user) {
  return {
    type: ActionTypes.AuthenticateUser,
    user
  }
}

function logoutUserAction() {
  return {
    type: ActionTypes.LogoutUser
  }
}