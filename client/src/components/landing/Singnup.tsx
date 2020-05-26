import React from 'react';
import BugImage from '../../public/bug.png';

export interface SignupProps {}

export interface SignupState {}

class Signup extends React.Component<SignupProps, SignupState> {
  state = { email: '', password: '', fname: '', lname: '' };

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
    const { email, password } = this.state;
    // this.props.login({ email, password });
  };

  render() {
    return (
      <div>
        {/* <i className="bug icon" style={{ color: 'teal' }}></i> */}
        <div>
          <img src={BugImage} alt="BugImage" />
        </div>
        {/* <form className="ui big form" onSubmit={this.onSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" onChange={this.handleInputChange} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
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
        </form> */}
      </div>
    );
  }
}

export default Signup;
