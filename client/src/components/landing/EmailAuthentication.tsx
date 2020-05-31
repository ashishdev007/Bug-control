import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter,
  useParams,
} from 'react-router-dom';

export default function EmailAuth() {
  const [state, setState] = useState({ loading: true, authenticated: false });
  const { emailAuthToken } = useParams();

  useEffect(() => {
    const query = 'http://localhost:1500/users/user/authentication';
    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: emailAuthToken }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((data) => {
        setState({ ...state, loading: false, authenticated: true });
      })
      .catch(async (err) => {
        setState({ ...state, loading: false, authenticated: false });
      });
  }, []);

  if (state.loading) {
    return (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Authenticating your email address.</div>
      </div>
    );
  } else if (state.authenticated) {
    return (
      <div className="SignUp">
        <i className="check circle icon authIcon"></i>
        <p className="authPara">
          Your email has been successfully Authenticated. Welcome to Bug
          Control!
        </p>
      </div>
    );
  } else {
    return (
      <div className="SignUp">
        <i className="exclamation triangle icon authIcon"></i>
        <p className="authPara">
          Invalid token! Please enter a link for email authentication.
        </p>
      </div>
    );
  }
}

// export interface EmailAuthProps {}

// export interface EmailAuthState {}

// class EmailAuth extends React.Component {
//   state = { emailAuthToken: null };

//   componentDidMount() {
//     const emailAuthToken = this.props.match.params.emailAuthToken;

//     this.setState({ emailAuthToken });
//   }

//   render() {
//     return <h1>{this.state.emailAuthToken}</h1>;
//   }
// }

// export default EmailAuth;
