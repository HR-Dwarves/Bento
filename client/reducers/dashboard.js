import actionTypes from '../actions/actionTypes';

// Every function should have three steps: requested, rejected and fulfilled
function dashboard(state = {}, action) {
  switch(action.type) {
    case actionTypes.GetDBRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.GetDBRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting DB.',
      });
    }
    case actionTypes.GetDBFulfilled: {
      const { modules } = action.databaseInfo;
      const database = Object.assign({}, action.databaseInfo)
      if (!modules) {
        // delete state.dashboard.modules;
        database.modules = null;
      }
      // console.log("databaseInfo: ", action.databaseInfo);
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Received dashboard info.',
      }, database);
      return newState;
    }
    case actionTypes.SetDB: {
      const { modules } = action.data;
      let { data } = action;
      if (!modules) {
        data.modules = null;
      }
      // console.log(data);
      const newState = Object.assign({}, state, data)
      return newState;
    }
    case actionTypes.DeleteModuleRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.DeleteModuleRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting deleting module.',
      });
    }
    case actionTypes.DeleteModuleFulfilled: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Module deleted.',
      });
      return newState;
    }
    case actionTypes.GetGeolocationRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case actionTypes.GetGeolocationRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'User not allowing geolocation.',
      });
    }
    case actionTypes.GetGeolocationFulfilled: {
      const geoStateAdditions = action.geoStateAdditions;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Latitude, Longitude, currentCity retrieved.',
      }, geoStateAdditions);
      return newState;
    }

    default:
      return state;
  }
}

export default dashboard;