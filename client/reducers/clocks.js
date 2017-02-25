import actionTypes from '../actions/actionTypes';

// Every function should have three steps: requested, rejected and fulfilled
function clocks(state = {}, action = '') {
  switch(action.type) {
    case actionTypes.GetClocksRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.GetClocksRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting clocks.',
      });
    }
    case actionTypes.GetClocksFulfilled: {
      const { clocks } = action.clocks;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got clocks.',
        clocks
      });
      return newState;
    }
    case actionTypes.AddToClocksRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.AddToClocksRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting Clocks.',
      });
    }
    case actionTypes.AddToClocksFulfilled: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'New Clock added.',
      });
      return newState;
    }
    default:
      return state;
  }
}

export default clocks;