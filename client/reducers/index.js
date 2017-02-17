import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import testReducer from './testReducer';
import dashboard from './dashboard';
import newsfeed from './newsfeed';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({testReducer, dashboard, newsfeed, routing: routerReducer });

export default rootReducer;
