import actionTypes from '../actions/actionTypes';

// Every function should have three steps: requested, rejected and fulfilled
function dashboard(state = {}, action) {
  switch(action.type) {
    case actionTypes.GetDBRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.GetDBRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting DB.',
      });
    }
    case actionTypes.GetDBFulfilled: {
      const { databaseInfo } = action;
      console.log("databaseInfo: ", databaseInfo);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got invite.',
        databaseInfo
      });
      return newState;
    }
    default:
      return state;
  }
}

export default dashboard;