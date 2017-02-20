import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import * as listActionCreators from '../actions/listActions';
import * as clocksActionCreators from '../actions/clocksActions';
import Main from './Main/Main';
import bulma from '../../node_modules/bulma/css/bulma.css';
import database from '../base.js';

var bundledActionCreators = Object.assign({}, actionCreators, listActionCreators, clocksActionCreators);
// Map each reducers state to props
function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    newsfeed: state.newsfeed
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(bundledActionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;