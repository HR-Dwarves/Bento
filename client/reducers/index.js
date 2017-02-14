import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import testReducer from './testReducer';
// import comments from './comments';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({testReducer, routing: routerReducer });

export default rootReducer;
