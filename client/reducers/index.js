import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import testReducer from './testReducer';
import list from './list';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({testReducer, list, routing: routerReducer });

export default rootReducer;
