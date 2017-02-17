// Action creators are grouped in the App.js component
// Add new action creators to the 'bundledActionCreators' using
// Object.assign so new action creators will be bound and passed down 

import ActionTypes from './actionTypes';
import database from '../base';

export function getList(db_key) {
  return dispatch => {
    dispatch(getListRequestedAction());
    return database.ref(`/testUser/modules/${db_key}`).once('value', snap => {
      const list = snap.val();
      dispatch(getListFulfilledAction(list))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getListRejectedAction());
    });
  }
}

function getListRequestedAction() {
  return {
    type: ActionTypes.GetListRequested
  };
}

function getListRejectedAction() {
  return {
    type: ActionTypes.GetListRejected
  }
}

function getListFulfilledAction(list) {
  return {
    type: ActionTypes.GetListFulfilled,
    list
  };
}

export function addToList(newStuff, db_key) {
  return dispatch => {
    dispatch(addToListRequestedAction());
    const listRef = database.ref(`/testUser/modules/${db_key}/items`);

    listRef.push(newStuff)
    .then((snap) => {
      dispatch(addToListFulfilledAction())
    })
    .catch((error) => {
      console.log(error);
      dispatch(addToListRejectedAction());
    });
  }
}

function addToListRequestedAction() {
  return {
    type: ActionTypes.AddToListRequested
  };
}

function addToListRejectedAction() {
  return {
    type: ActionTypes.AddToListRejected
  }
}

function addToListFulfilledAction(newItem) {
  return {
    type: ActionTypes.AddToListFulfilled,
    newItem
  };
}

export function deleteFromList(itemKey, db_key) {
  return dispatch => {
    dispatch(deleteFromListRequestedAction());
    const itemRef = database.ref(`/testUser/modules/${db_key}/items/${itemKey}`);

    itemRef.remove()
    .then((snap) => {
      dispatch(deleteFromListFulfilledAction())
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteFromListRejectedAction());
    });
  }
}

function deleteFromListRequestedAction() {
  return {
    type: ActionTypes.DeleteFromListRequested
  };
}

function deleteFromListRejectedAction() {
  return {
    type: ActionTypes.DeleteFromListRejected
  }
}

function deleteFromListFulfilledAction(newItem) {
  return {
    type: ActionTypes.DeleteFromListFulfilled,
    newItem
  };
}

export function toggleListItemStatus(itemKey, db_key, newStatus) {
  return dispatch => {
    dispatch(toggleListStatusRequestedAction());
    const statusRef = database.ref(`/testUser/modules/${db_key}/items/${itemKey}`).child('completed');

    statusRef.set(newStatus)
    .then((snap) => {
      dispatch(toggleListStatusFulfilledAction())
    })
    .catch((error) => {
      console.log(error);
      dispatch(toggleListStatusRejectedAction());
    });
  }
}

function toggleListStatusRequestedAction() {
  return {
    type: ActionTypes.ToggleListStatusRequested
  };
}

function toggleListStatusRejectedAction() {
  return {
    type: ActionTypes.ToggleListStatusRejected
  }
}

function toggleListStatusFulfilledAction(newItem) {
  return {
    type: ActionTypes.ToggleListStatusFulfilled
  };
}