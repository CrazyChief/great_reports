import React, { Component } from 'react';
import {
	Tabs,
	Tab,
	List,
	ListItem,
	FloatingActionButton,
	Dialog,
	RaisedButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';

import {plans, auth} from '../actions';
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
		plans: state.plans,
		user: state.auth.user,
	}
};


const mapDispatchToProps = dispatch => {
	return {
		fetchPlans: () => {
			dispatch(plans.fetchPlans());
		},
		addPlan: (date_for) => {
			return dispatch(plans.addPlan(date_for));
		},
		updatePlan: (id, date_for) => {
			return dispatch(plans.updatePlan(id, date_for));
		},
		deletePlan: (id) => {
			dispatch(plans.deletePlan(id));
		},
		logout: () => dispatch(auth.logout()),
	}
};



export default connect(mapStateToProps, mapDispatchToProps)(GreatReports);
