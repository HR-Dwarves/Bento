import actionTypes from '../actions/actionTypes';

function newsfeed(state = {}, action) {
  switch(action.type) {
  	case actionTypes.GetHnRequested: {
  	  return Object.assign({}, state, {
  	  	testState: false
  	  });
  	}
  	case actionTypes.GetHnRejected: {
  	  return Object.assign({}, state, {
  	  	testState: false
  	  });
  	}
  	case actionTypes.GetHnFulfilled: {
  	  const { posts } = action;
  	  const newState = Object.assign({}, state, {
  	  	testState: true,
        Top: false,
        Bottom: false,
  	  	posts
  	  });
  	  return newState
  	}
  	default: 
  	  return state;
  }
}

export default newsfeed;