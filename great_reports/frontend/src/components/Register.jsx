import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {
  AppBar,
  TextField,
  RaisedButton,
} from 'material-ui';

import {auth} from "../actions";

const style = {
	margin: '15px auto',
	display: 'block',
	minWidth: '90px',
	maxWidth: '200px',
};
const fieldsStyle = {
	marginTop: 12,
	marginLeft: 'auto',
	marginRight: 'auto',
	display: 'block',
	width: 360,
};

const formWrapper = {
	width: '100%',
	margin: '30px auto',
	display: 'block',
	textAlign: 'center',
};

class Login extends Component {

  state = {
    username: "",
    password: "",
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.username, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    return (
        <div>
          <AppBar
              title="Register"
          />
          <div className="formWrapper" style={formWrapper}>
            <TextField
              id="username"
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={e => this.setState({username: e.target.value})}
              style={fieldsStyle}
            />
              <br/>
            <TextField
              id="password"
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={e => this.setState({password: e.target.value})}
              style={fieldsStyle}
            />
              <br/>
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={this.onSubmit}
            />
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      // <form onSubmit={this.onSubmit}>
      //   <fieldset>
      //     <legend>Register</legend>
      //     {this.props.errors.length > 0 && (
      //       <ul>
      //         {this.props.errors.map(error => (
      //           <li key={error.field}>{error.message}</li>
      //         ))}
      //       </ul>
      //     )}
      //     <p>
      //       <label htmlFor="username">Username</label>
      //       <input
      //         type="text" id="username"
      //         onChange={e => this.setState({username: e.target.value})} />
      //     </p>
      //     <p>
      //       <label htmlFor="password">Password</label>
      //       <input
      //         type="password" id="password"
      //         onChange={e => this.setState({password: e.target.value})} />
      //     </p>
      //     <p>
      //       <button type="submit">Register</button>
      //     </p>
      //
      //
      //   </fieldset>
      // </form>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password) => dispatch(auth.register(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
