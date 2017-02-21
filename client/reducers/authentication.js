import actionTypes from '../actions/actionTypes';

function authentication(state = {}, action) {
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
    default:
      return state;
  }
}

export default authentication;