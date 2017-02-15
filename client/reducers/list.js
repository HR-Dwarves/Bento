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
      const { items, username } = action.list;
      console.log("action.list: ", action.list);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got invite.',
        items,
        username
      });
      return newState;
    }
    default:
      return state;
  }
}

export default list;