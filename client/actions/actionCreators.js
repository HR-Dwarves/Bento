// 
import ActionTypes from './actionTypes';
import database from '../base';

export function test(index) {
  return {
    type: 'TEST_REDUCER',
    index
  }
}

export function getList() {
  return dispatch => {
    dispatch(getListRequestedAction());
    return database.ref('/').once('value', snap => {
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
