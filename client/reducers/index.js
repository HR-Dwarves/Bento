import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import dashboard from './dashboard';
import list from './list';
import newsfeed from './newsfeed';
import authentication from './authentication';
import layouts from './layouts';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({dashboard, list, newsfeed, authentication, layouts, routing: routerReducer });

export default rootReducer;