import actionTypes from '../actions/actionTypes';

function background(state = {}, action = '') {
  switch(action.type) {
    case actionTypes.ChangeBackgroundRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.ChangeBackgroundRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in changing background.',
      });
    }
    case actionTypes.ChangeBackgroundFulfilled: {
      console.log('gets here');
      const { inputUrl } = action.inputUrl;
      console.log(inputUrl);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got url',
        inputUrl
      });

      console.log(newState);
      
      return newState;
    }
    default:
      return state;
  }
}

export default background;