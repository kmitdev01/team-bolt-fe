import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => {
  return(
  <Route
    {...rest}
    render={props => (
      isAuthenticated
      ? (
        <Component {...props} />
      )
      : (<Redirect to={'/'} />)
    )}
  />
  )};

export default function Routes() {
  const token = localStorage.getItem('token');
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          {/* <PrivateRoute exact path="/dashboard" isAuthenticated={token} component={Dashboard} /> */}
          
        </Switch>
    </Router>
  );
}
