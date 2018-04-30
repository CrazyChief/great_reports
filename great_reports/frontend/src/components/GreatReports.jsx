import React, { Component } from 'react';
import {
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
				<h2>Welcome to Great Reports!</h2>
				<hr/>
				<div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
        </div>

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
