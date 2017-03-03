import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import * as layoutActionCreators from '../actions/layoutActions';
import * as listActionCreators from '../actions/listActions';
import * as stickyNoteActionCreators from '../actions/stickyNoteActions'
import * as clocksActionCreators from '../actions/clocksActions';
import * as hackerNewsActionCreators from '../actions/hackerNewsActions';
import * as authenticationActionCreators from '../actions/authenticationActions';
import * as photoPromptActionCreators from '../actions/photoPromptActions';
import Main from './Main/Main';
import bulma from '../../node_modules/bulma/css/bulma.css';
import firebaseApp from '../base';
const database = firebaseApp.database();

var bundledActionCreators = Object.assign({},
                                          actionCreators,
                                          layoutActionCreators,
                                          listActionCreators,
                                          clocksActionCreators,
                                          stickyNoteActionCreators,
                                          hackerNewsActionCreators,
                                          authenticationActionCreators,
                                          photoPromptActionCreators);

// Map each reducers state to props
function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    user: state.authentication,
    layouts: state.layouts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(bundledActionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;