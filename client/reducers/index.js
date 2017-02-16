import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import testReducer from './testReducer';
import dashboard from './dashboard';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({testReducer, dashboard, routing: routerReducer });

export default rootReducer;
