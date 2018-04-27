import React, { Component } from 'react';
import {
	List,
	ListItem,
	FloatingActionButton,
	Dialog,
	RaisedButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';

import {plans, auth} from '../actions';


const style = {
  margin: 12,
};


class Plans extends Component {
	state = {
		date_for: null,
		open: false,
	};

	componentDidMount() {
		this.props.fetchPlans();
	}

	handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

	render() {
		const planActions = [
			<RaisedButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
		];

		return (
			<div>
				<Dialog
					title="Add new plan"
					actions={planActions}
					modal={true}
					open={this.state.open}
				>

				</Dialog>

				<div style={{display: "flex", justifyContent: "space-between",}}>
					<div>
						<h3>Plans</h3>
					</div>
					<div>
						<h3 style={{marginTop: "auto", marginBottom: "auto",}}>
							<span style={{verticalAlign: "36%",}}>Add new plan</span>
							<FloatingActionButton mini={true} style={style} onClick={this.handleOpen}>
					      <ContentAdd />
					    </FloatingActionButton>
						</h3>
					</div>
				</div>
				<List>
					{this.props.plans.map((plan, id) => (
						<ListItem
							key={`plan_${plan.id}`}
							primaryText={`Plan for ${plan.date_for}`}
							initiallyOpen={false}
              primaryTogglesNestedList={true}
						/>
					))}
				</List>
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



export default connect(mapStateToProps, mapDispatchToProps)(Plans);