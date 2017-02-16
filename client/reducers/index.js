import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import dashboard from './dashboard';
import list from './list';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({dashboard, list, routing: routerReducer });

export default rootReducer;
