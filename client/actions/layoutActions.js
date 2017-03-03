import ActionTypes from './actionTypes';
import firebaseApp from '../base';
const database = firebaseApp.database();


export function getLayouts(user, key = 'layouts') {
  return dispatch => {
    // Pull layouts from local storage
    // console.log('GET LAYOUTS FIRED');
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
      } catch(e) {
        console.error(e);
      }
    }
    // return ls[key];
    // Dispatch layouts pulled to state
    dispatch(getLayoutsAction(ls[key]));
  }
}

export function updateLayouts(user, layouts, key = 'layouts') {
  return dispatch => {
    // console.log('UPDATE LAYOUTS FIRED');
    // Save layouts to local storage
    if (global.localStorage) {
      global.localStorage.setItem('rgl-8', JSON.stringify({
        [key]: layouts
      }));
    }
    dispatch(updateLayoutsAction(layouts));
  }

}

function getLayoutsAction(layouts) {
  return {
    type: ActionTypes.GetLayouts,
    layouts
  };
}

function updateLayoutsAction(layouts) {
  return {
    type: ActionTypes.UpdateLayouts,
    layouts
  };
}



function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch(e) {
      console.error(e);
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem('rgl-8', JSON.stringify({
      [key]: value
    }));
  }
}
