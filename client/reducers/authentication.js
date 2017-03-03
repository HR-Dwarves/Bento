import actionTypes from '../actions/actionTypes';

function authentication(state = {}, action = '') {
  switch(action.type) {
    case actionTypes.AuthenticateUser: {
      let { user } = action;
      return Object.assign({}, state, {
        loggedIn: true,
        error: '',
        success: '',
      }, user);
    }
    case actionTypes.LogoutUser: {
      return {
        loggedIn: false
      };
    }
    default:
      return state;
  }
}

export default authentication;