import actionTypes from '../actions/actionTypes';

const initialState = {
  items: [
    {text: 'Welcome to Bento!', dismiss: true, type: 'Other', timeout: 5000},
  ],
  types: {
    'List': false,
    'Clock': false,
    'Weather': false,
    'Hacker News': false,
    'News': false,
    'Sticky Note': false,
    'One Photo Per Day': false
  }
};

function notifications(state = initialState, action = '') {
  switch(action.type) {
    case actionTypes.AddNotification: {
      let { message } = action;
      let newState =  Object.assign({}, state);
      // console.log(message)
      let {types} = newState;

      if (message) {
        let type = message.type;
        newState.items.push(message);
        types[type] = true;
      }

      return newState;
    }
    case actionTypes.RemoveNotification: {
      let { index } = action;
      var newState = Object.assign({}, state);
      var { items } = newState;
      var removedItem = items[index];
      var type = removedItem.type;

      let { types } = newState;
      types[type] = false;


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