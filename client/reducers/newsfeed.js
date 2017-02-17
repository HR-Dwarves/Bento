import actionTypes from '../actions/actionTypes';

function newsfeed(state = {}, action) {
  switch(action.type) {
  	case actionTypes.GetHnRequested: {
  	  return Object.assign({}, state, {
  	  	testState: ''
  	  });
  	}
  	case actionTypes.GetHnRejected: {
  	  return Object.assign({}, state, {
  	  	testState: 'didnt get'
  	  });
  	}
  	case actionTypes.GetHnFulfilled: {
  	  const { posts } = action;
  	  console.log(action);
  	  console.log('listInfo: ' + posts );
  	  const newState = Object.assign({}, state, {
  	  	testState: 'got state',
  	  	posts
  	  });
  	  return newState
  	}
  	default: 
  	  return state;
  }
}

export default newsfeed;