import React, { Component, useState, useEffect } from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';

import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from '../actions/authActions';

import LandingPage from './landing/Landing';
import Alert from './Alert';

import Home from './Home';
import Signup from './landing/Singnup';
import EmailAuth from './landing/EmailAuthentication';
import Loader from '../modals/Loader';

import { stateType as authStateType } from '../reducers/authReducer';

interface RootState {
  auth: authStateType;
}

const App = () => {
  const auth: authStateType = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUser());
    history.push('/home');
  }, []);

  if (!auth.loading) {
    return (
      <div className="App">
        <Router history={history}>
          <Route path="/home" component={Home} />
          <Route exact path="/login" component={LandingPage} />
          <Route exact path="/Signup" component={Signup} />
          <Route
            path="/Signup/authentication/:emailAuthToken"
            component={EmailAuth}
          />
        </Router>
        <Alert />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default App;
