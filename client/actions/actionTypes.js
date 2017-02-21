const actionTypes = {

  GetDBRequested: 'GET_DB_REQUESTED',
  GetDBRejected: 'GET_DB_REJECTED',
  GetDBFulfilled: 'GET_DB_FULFILLED',

  GetListRequested: 'GET_LIST_REQUESTED',
  GetListRejected: 'GET_LIST_REJECTED',
  GetListFulfilled: 'GET_LIST_FULFILLED',

  AddToListRequested: 'ADD_TO_LIST_REQUESTED',
  AddToListRejected: 'ADD_TO_LIST_REJECTED',
  AddToListFulfilled: 'ADD_TO_LIST_FULFILLED',

  DeleteFromListRequested: 'DELETE_FROM_LIST_REQUESTED',
  DeleteFromListRejected: 'DELETE_FROM_LIST_REJECTED',
  DeleteFromListFulfilled: 'DELETE_FROM_LIST_FULFILLED',

  ToggleListStatusRequested: 'TOGGLE_LIST_STATUS_REQUESTED',
  ToggleListStatusRejected: 'TOGGLE_LIST_STATUS_REJECTED',
  ToggleListStatusFulfilled: 'TOGGLE_LIST_STATUS_FULFILLED',

  GetHnRequested: 'GET_HN_REQUESTED',
  GetHnRejected: 'GET_HN_REJECTED',
  GetHnFulfilled: 'GET_HN_FULFILLED',

  GetClocksRequested: 'GET_CLOCKS_REQUESTED',
  GetClocksRejected: 'GET_CLOCKS_REJECTED',
  GetClocksFulfilled: 'GET_CLOCKS_FULFILLED',

  AddToClocksRequested: 'ADD_TO_CLOCKS_REQUESTED',
  AddToClocksRejected: 'ADD_TO_CLOCKS_REJECTED',
  AddToClocksFulfilled: 'ADD_TO_CLOCKS_FULFILLED'
};

export default actionTypes;