import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Auth from '../Auth/Auth';
import Companies from '../Companies/Companies';

import './App.css';

function App(props) {
  const isAuth = props.token

  return (
    <>
      <Switch>
        <Route exact path='/' component={() => <Link to='/auth'>Sign In</Link>} />
        <Route exact path='/auth' component={Auth} />
        {
          isAuth
            ? <>
              <Route exact path='/companies/list' component={Companies} />
            </>
            : <Redirect to='/auth' />
        }
      </Switch>
    </>
  );
}

export default connect(
  state => ({
    token: state.auth.token
  })
)(App);
