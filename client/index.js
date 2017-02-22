import React from 'react';

import { render } from 'react-dom';

// Import css
// import css from './styles/style.styl';

// Import Components
import App from './components/App';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
// import react router deps
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}></IndexRoute>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'));
