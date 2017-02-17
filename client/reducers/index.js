import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import dashboard from './dashboard';
import list from './list';
import newsfeed from './newsfeed';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({dashboard, list, routing: routerReducer });

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({testReducer, dashboard, newsfeed, routing: routerReducer });

export default rootReducer;