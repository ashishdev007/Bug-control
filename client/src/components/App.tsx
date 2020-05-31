import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';

import { connect, ConnectedProps } from 'react-redux';
import { FetchBugs } from '../actions/bugActions';
import { LoadUser } from '../actions/authActions';

import LandingPage from './landing/Landing';
import Alert from './Alert';

import Home from './Home';
import Signup from './landing/Singnup';
import EmailAuth from './landing/EmailAuthentication';

export class App extends Component<PropsType> {
  componentDidMount() {
    this.props.LoadUser();
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Route exact path="/" component={Home} />
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
  }
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type OtherPropsType = {
  stageType?: string;
  state?: string;
};

const mapStatetoProps = (state: any, ownProps: OtherPropsType) => {
  return {};
};

const mapDispatchtoProps = {
  FetchBugs: FetchBugs,
  LoadUser: LoadUser,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsType = PropsFromRedux & OtherPropsType;

export default connector(App);
