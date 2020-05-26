import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { LogInUser } from '../../actions/authActions';
import history from '../../history';

export interface ownProps {}

export interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      history.push('/');
    }
  }

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.setState({
      email: '',
      password: '',
    });
    this.props.LogInUser(email, password);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  showError = () => {
    // if (this.props.error.id === "LOGIN_FAIL") {
    //     return (
    //         <div class="ui error message">
    //             <div class="header" style={{ textTransform: "capitalize" }}>
    //                 {this.props.error.msg}
    //             </div>
    //         </div>
    //     );
    // }

    return null;
  };

  render() {
    return (
      <div className="LoginForm">
        {this.showError()}
        <div>
          <form className="ui big form" onSubmit={this.onSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </div>
            <div
              className="ui large teal right labeled icon button"
              id="LoginButton"
              onClick={this.onSubmit}
            >
              Login
              <i className="checkmark icon"></i>
            </div>
          </form>
        </div>

        <p className="SignupLink">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    );
  }
}

const mapStatetoProps = (state: any, ownProps: ownProps) => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

const mapDispatchtoProps = {
  LogInUser: LogInUser,
};

const connector = connect(mapStatetoProps, mapDispatchtoProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LoginProps = PropsFromRedux & ownProps;

export default connector(Login);
