import actionTypes from '../actions/actionTypes';

function authentication(state = {}, action) {
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
    // case actionTypes.GetListFulfilled: {
    //   const { items } = action.list;
    //   const newState = Object.assign({}, state, {
    //     inProgress: false,
    //     success: 'Got invite.',
    //     items
    //   });
    //   return newState;
    // }
    default:
      return state;
  }
}

export default authentication;