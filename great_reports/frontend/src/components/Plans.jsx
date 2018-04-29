import React, { Component } from 'react';
import {
	List,
	ListItem,
	FloatingActionButton,
	Dialog,
	RaisedButton,
	DatePicker,
	IconButton,
	IconMenu,
	MenuItem
} from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {connect} from 'react-redux';
import { format } from 'date-fns';

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

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.resetPlanForm();
		this.setState({open: false});
	};

	handleChange = (event, date) => {
    this.setState({
      date_for: date,
    });
  };

	handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

	resetPlanForm = () => {
		this.setState({
			date_for: null, updatePlanId: null,
		})
	};

	submitPlan = (e) => {
		e.preventDefault();
		if ((this.state.updatePlanId === null) || (this.state.updatePlanId === undefined)) {
			this.props.addPlan(this.convertDateToString(this.state.date_for));
		} else {
			this.props.updatePlan(
				this.state.updatePlanId,
				this.convertDateToString(this.state.date_for));
		}
		this.handleClose();
	};

	selectForEdit = (id) => {
		let plan = this.props.plans[id];
		this.setState({
			date_for: this.convertStringToDate(plan.date_for),
			updatePlanId: id,
		});
		this.handleOpen();
	};

	convertDateToString = (date) => {
		return format(date, "YYYY-MM-DD");
	};

	convertStringToDate = (string) => {
		let d = new Date(string);
		return d;
	};

	render() {
		const planActions = [
			<RaisedButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
			<RaisedButton
				label="Reset"
				onClick={this.resetPlanForm}
				style={style}
			/>,
			<RaisedButton
	      label="Save Report"
	      onClick={this.submitPlan}
	      style={style} />,
		];

		const iconButtonElement = (
		  <IconButton
		    touch={true}
		    tooltip="more"
		    tooltipPosition="bottom-left"
		  >
		    <MoreVertIcon color={grey400} />
		  </IconButton>
		);

		return (
			<div>
				<Dialog
					title="Add new plan"
					actions={planActions}
					modal={true}
					open={this.state.open}
				>
					<form onSubmit={this.submitPlan}>
						<DatePicker
							hintText="Pick Date For"
							mode="landscape"
							value={this.state.date_for}
							onChange={this.handleChange}
						/>
					</form>
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
							rightIconButton={
								<IconMenu iconButtonElement={iconButtonElement}>
							    <MenuItem onClick={() => this.selectForEdit(id)}>Edit</MenuItem>
							    <MenuItem onClick={() => this.props.deletePlan(id)}>Delete</MenuItem>
							  </IconMenu>
							}
							nestedItems={[]}
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