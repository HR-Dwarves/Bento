import actionTypes from '../actions/actionTypes';

// Every function should have three steps: requested, rejected and fulfilled
function list(state = {}, action) {
  switch(action.type) {
    case actionTypes.GetListRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.GetListRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting list.',
      });
    }
    case actionTypes.GetListFulfilled: {
      const { username, items } = action.list;
      console.log("list: ", list);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got invite.',
        username,
        items
      });
      return newState;
    }
    case actionTypes.AddToListRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.AddToListRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting list.',
      });
    }
    case actionTypes.AddToListFulfilled: {
      const { newItem } = action;
      console.log("newItem: ", newItem);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got invite.',
      });
      return newState;
    }
    default:
      return state;
  }
}

export default list;