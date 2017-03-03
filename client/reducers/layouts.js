import actionTypes from '../actions/actionTypes';

function layouts(state = {}, action = '') {
  switch(action.type) {
    case actionTypes.GetLayouts: {
      let { layouts } = action;
      // console.log('Get Layouts reducer!');
      // console.log(layouts);
      return Object.assign(
        {}, 
        state, 
        layouts
      );
    }
    case actionTypes.UpdateLayouts: {
      let { layouts } = action;
      return Object.assign({}, state, layouts)
    }
    default:
      return state;
  }
}

export default layouts;