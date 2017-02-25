import actionTypes from '../actions/actionTypes';

// Every function should have three steps: requested, rejected and fulfilled
function list(state = {}, action = '') {
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
      const { items } = action.list;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got invite.',
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
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'List item added.',
      });
      return newState;
    }
    default:
      return state;
  }
}

export default list;