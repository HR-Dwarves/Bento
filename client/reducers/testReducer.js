// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function testReducer(state = [], action) {
  switch(action.type) {
    case 'INCREMENT_LIKES' :
      console.log("Incrementing Likes!!");
      return [
        // Do stuff
      ]
    default:
      return state;
  }
}

export default testReducer;
