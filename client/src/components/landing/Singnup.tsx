import React from 'react';
import { SignUpUser } from '../../actions/authActions';

import '../../public/Signup.css';
import history from '../../history';
import { connect, ConnectedProps } from 'react-redux';

export interface SignupState {}

class Signup extends React.Component<SignupProps, SignupState> {
  state = { email: '', password: '', fname: '', lname: '', submitted: false };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      history.push('/home');
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      history.push('/home');
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, fname, lname } = this.state;

    this.setState({
      email: '',
      password: '',
      fname: '',
      lname: '',
      submitted: true,
    });

    this.props.SignUpUser(email, password, fname, lname);
  };

  render() {
    if (this.state.submitted) {
      return (
        <div className="SignUp">
          <i className="envelope outline icon authIcon"></i>
          <p className="authPara">
            Please check your email for an authentication link.
          </p>
        </div>
      );
    } else {
      return (
        <div className="SignUp">
          <h1 className="ui header">Create A New Account</h1>
          <form className="ui big form" onSubmit={this.onSubmit}>
            <div className="field NameField" id="fname">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                name="fname"
                value={this.state.fname}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field NameField">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                name="lname"
                value={this.state.lname}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div
              className="ui large teal right labeled icon button"
              id="LoginButton"
              onClick={this.onSubmit}
            >
              Signup
              <i className="checkmark icon"></i>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStatetoProps = (state: any) => {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated,
  };
};

const mapDispatchtoProps = {
  SignUpUser: SignUpUser,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SignupProps = PropsFromRedux;

export default connector(Signup);
