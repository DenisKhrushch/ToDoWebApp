import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import SignUp from '../modules/containers/SignUp';
import SignIn from '../modules/containers/SignIn';
import ToDoListPage from '../modules/containers/ToDoListPage';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route path="/" component={ToDoListPage} />
      </Switch>
    </>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
