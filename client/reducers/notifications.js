import actionTypes from '../actions/actionTypes';

const initialState = {
  items: [
    // {text: 'Welcome to Bento!', dismiss: true, type: 'Other', timeout: 5000},
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
      let { newMessage } = action;
      let newState =  Object.assign({}, state);
      // console.log(message);
      // console.log('NEW MESSAGE');
      // console.log(JSON.stringify(newMessage));

      // console.log('New State BEFORE');
      // console.log(JSON.stringify(newState));
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

      // console.log('New State AFTER');
      // console.log(JSON.stringify(newState));
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