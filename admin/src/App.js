import React, { Component } from 'react';
import { HashRouter, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import './App.scss';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';
// import { renderRoutes } from 'react-router-config';

import {PrivateRoute} from './components';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
