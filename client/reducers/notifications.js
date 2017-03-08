import actionTypes from '../actions/actionTypes';

const initialState = {
  items: [
    {text: 'Welcome to Bento!', dismiss: true, type: 'Other', timeout: 5000},
  ]
};

function notifications(state = initialState, action = '') {
  switch(action.type) {
    case actionTypes.AddNotification: {
      let { message } = action;

      let newState =  Object.assign({}, state);
      // console.log(message)
      if (message) {
        newState.items.push(message);
      }

      return newState;
    }
    case actionTypes.RemoveNotification: {
      let { index } = action;
      var newState = Object.assign({}, state);
      var { items } = newState;
      // console.log(index);
      // console.log(items);
      // var before = items.slice(0, index);
      // var after = items.slice(index + 1);
      // console.log(before, after);
      // var newItems = before.concat(after);

      newState.items = [
      ...newState.items.slice(0, index),
      ...newState.items.slice(index + 1)
      ];

      // newState.items = newItems;
      // console.log('REMOVING NOTIFICATION');
      // console.log(newState);
      // console.log(newState.items);

      return newState;
    }
    default:
      return state;
  }
}

export default notifications;