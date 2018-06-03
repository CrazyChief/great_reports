import React, { Component } from 'react';
import {
	AppBar,
	FlatButton,
	Tabs,
	Tab,
} from 'material-ui';
import {connect} from 'react-redux';

import {auth} from '../actions';
import Plans from './Plans';
import Reports from './Reports';


class GreatReports extends Component {
	render() {
		return (
			<div>
				<AppBar
					title='Welcome to Great Reports!'
					iconElementRight={
						<FlatButton
							label='Logout' onClick={this.props.logout}
						/>
					}
				/>
				<Tabs>
					<Tab label="Plans">
						<Plans></Plans>
					</Tab>
					<Tab label="Reports">
						<Reports></Reports>
					</Tab>
				</Tabs>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
	}
};


const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(auth.logout()),
	}
};



export default connect(mapStateToProps, mapDispatchToProps)(GreatReports);
