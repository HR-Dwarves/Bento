import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';
import database from '../base.js';

// Map each reducers state to props
function mapStateToProps(state) {
  return {
    testInfo: state.testReducer,
    database: state.dashboard.databaseInfo,
    newsfeed: state.newsfeed
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;