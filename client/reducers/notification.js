import actionTypes from '../actions/actionTypes';

function notifications(state = {}, action = '') {
  switch(action.type) {
    case actionTypes.AddNotification: {
      let { list, index } = action;
      return Object.assign({}, state, {

      });
    }
    case actionTypes.RemoveNotification: {
      let { list, index } = action;
      return Object.assign({}, state, {

      });
    }
    default:
      return state;
  }
}

export default notifications;