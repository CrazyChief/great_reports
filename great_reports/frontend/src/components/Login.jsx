import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link, Redirect} from 'react-router-dom';

import {
	AppBar,
	RaisedButton,
	TextField,
} from 'material-ui';

import {auth} from '../actions';

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
		this.props.login(this.state.username, this.state.password);
	};

	render() {
		if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
		return (
			<div>
				<AppBar title="Login" />
				<div className="formWrapper" style={formWrapper}>
					{this.props.errors.length > 0 && (
						<ul>
						  {this.props.errors.map(error => (
							<li key={error.field}>{error.message}</li>
						  ))}
						</ul>
					  )}
					<TextField
						hintText="Enter your Username"
						floatingLabelText="Username"
						onChange={e => this.setState({username: e.target.value})}
						style={fieldsStyle}
					/>
					<br/>
					<TextField
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
					<p>Does not have an account? Tap "Register" <Link to="/register">Register</Link></p>
				</div>
			</div>
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
		login: (username, password) => {
			return dispatch(auth.login(username, password));
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
