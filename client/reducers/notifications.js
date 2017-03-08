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
    'One Photo Per Day': false,
    'Default': false
  }
};

function notifications(state = initialState, action = '') {
  switch(action.type) {
    case actionTypes.AddNotification: {
      let { newMessage } = action;
      let newState =  Object.assign({}, state);

      let { types, items } = newState;
      let newItems = items.slice();
      
      // Slice items array and mutate copy
      if (newMessage) {
        let moduleType = newMessage.moduleType;
        const timestamp = Date.now().toString();
        newMessage['timestamp'] = timestamp;
        newItems.push(newMessage);
        if (moduleType in types) {
          types[moduleType] = true;
        }
        newState.items = newItems;
      }
      return newState;
    }
    case actionTypes.RemoveNotification: {
      let { index } = action;
      var newState = Object.assign({}, state);
      var { items } = newState;
      var removedItem = items[index];
      var moduleType = removedItem.moduleType;

      let { types } = newState;
      types[moduleType] = false;

      newState.items = [
      ...newState.items.slice(0, index),
      ...newState.items.slice(index + 1)
      ];

      return newState;
    }
    default:
      return state;
  }
}

export default notifications;