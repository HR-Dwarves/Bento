// 
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
    return database.ref('/testUser').once('value', snap => {
      const databaseInfo = snap.val();
      dispatch(getDBFulfilledAction(databaseInfo))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getDBRejectedAction());
    });
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

export function getList() {
  return dispatch => {
    dispatch(getListRequestedAction());
    return database.ref('/testUser/list').once('value', snap => {
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

export function addToList(newStuff) {
  return dispatch => {
    dispatch(addToListRequestedAction());
    const listRef = database.ref('/testUser/list/items');

    listRef.push({newStuff})
    .then((snap) => {
      const newItem = snap.val();
      dispatch(addToListFulfilledAction(newItem))
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


