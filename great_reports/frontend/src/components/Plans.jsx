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
	MenuItem,
	TextField,
	TimePicker,
} from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {connect} from 'react-redux';
import { format } from 'date-fns';

import {plans, notes, auth} from '../actions';


const style = {
  margin: 12,
};


class Plans extends Component {
	state = {
		planId: null,
		title: "",
		description: "",
		estimate: null,
		spent_time: null,
		updateNoteId: null,
		updatePlanId: null,
		date_for: null,
		open: false,
		noteOpen: false,
	};

	componentDidMount() {
		this.props.fetchPlans();
		this.props.fetchNotes();
	}

	handleOpen = () => {
		this.setState({open: true});
	};

	handleNoteOpen = () => {
		this.setState({noteOpen: true});
	};

	handleClose = () => {
		this.resetPlanForm();
		this.setState({open: false});
	};

	handleNoteClose = () => {
		this.resetNoteForm();
		this.setState({noteOpen: false});
	};

	handleChange = (event, date) => {
    this.setState({
      date_for: date,
    });
  };

	getNotesForPlan = (planId) => {
		let notesListForPlan = [];
		const notesList = this.props.notes;
		notesList.forEach((note, id) => {
			if (note.plan === planId) {
				notesListForPlan.push(
				<ListItem
					key={`note_${note.id}`}
					primaryText={note.title}
					secondaryText={note.description}
					onClick={() => this.selectNoteForEdit(id)}
				/>
				)
			}
		});
		return notesListForPlan;
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

	resetNoteForm = () => {
		this.setState({
			planId: null, title: "", description: "", spent_time: null, updateNoteId: null,
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

	submitNote = (e) => {
		e.preventDefault();
		if ((this.state.updateNoteId === null) || (this.state.updateNoteId === undefined)) {
			this.props.addNote(
				this.state.planId,
				this.state.title,
				this.state.description,
				this.convertNoteDateToString(this.state.spent_time));
		} else {
			this.props.updateNote(
				this.state.updateNoteId,
				this.state.planId,
				this.state.title,
				this.state.description,
				this.convertNoteDateToString(this.state.spent_time));
		}
		this.handleNoteClose();
	};

	selectForEdit = (id) => {
		let plan = this.props.plans[id];
		this.setState({
			date_for: this.convertStringToDate(plan.date_for),
			updatePlanId: id,
		});
		this.handleOpen();
	};

	selectNoteForEdit = (id) => {
		let note = this.props.notes[id];
		this.setState({
			planId: note.plan,
			title: note.title,
			description: note.description || "",
			spent_time: this.convertNoteStringToDate(note.spent_time) || null,
			updateNoteId: id,
		});
		this.handleNoteOpen();
	};

	convertDateToString = (date) => {
		return format(date, "YYYY-MM-DD");
	};

	convertStringToDate = (string) => {
		let d = new Date(string);
		return d;
	};

	convertNoteDateToString = (date) => {
		return `${date.getHours()}:${date.getMinutes()}`
	};

	convertNoteStringToDate = (string) => {
		let d = new Date();
		let pieces = string.split(':');
		d.setHours(parseInt(pieces[0], 10));
		d.setMinutes(parseInt(pieces[1], 10));
		return d;
	};

	handleTimePicker = (event, date) => {
		this.setState({spent_time: date})
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
	      label="Save Plan"
	      onClick={this.submitPlan}
	      style={style} />,
		];

		const noteActions = [
			<RaisedButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
			<RaisedButton
				label="Reset"
				onClick={this.resetNoteForm}
				style={style}
			/>,
			<RaisedButton
	      label="Save Note"
	      onClick={this.submitNote}
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
					id="add_note_dialog"
					title="Add new note"
					actions={noteActions}
					open={this.state.noteOpen}
				>
					<form onSubmit={this.submitNote}>
						<TextField
							id="text-field"
							value={this.state.text}
							placeholder="Enter report title here..."
							onChange={(e) => this.setState({text: e.target.value})}
							required
							style={style}
						/>
						<TextField
							id="text-field-description"
							value={this.state.description}
							placeholder="Enter report description here..."
							onChange={(e) => this.setState({description: e.target.value})}
							style={style}
						/>
						<TimePicker
							id="time-field"
							format="24hr"
							placeholder="Spent time"
							value={this.state.spent_time}
							onChange={this.handleTimePicker}
							style={style}
						/>
					</form>
				</Dialog>
				<Dialog
					id="add_plan_dialog"
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
							onClick={(elem) => this.getNotesForPlan()}
							nestedItems={this.getNotesForPlan(plan.id)}
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
		notes: state.notes,
		user: state.auth.user,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPlans: () => {
			dispatch(plans.fetchPlans());
		},
		fetchNotes: () => {
			dispatch(notes.fetchNotes());
		},
		addPlan: (date_for) => {
			return dispatch(plans.addPlan(date_for));
		},
		addNote: (planId, title, description, spent_time) => {
			return dispatch(notes.addNote(planId, title, description, spent_time));
		},
		updatePlan: (id, date_for) => {
			return dispatch(plans.updatePlan(id, date_for));
		},
		updateNote: (id, planId, title, description, spent_time) => {
			return dispatch(notes.updateNote(
				id, planId, title, description, spent_time));
		},
		deletePlan: (id) => {
			dispatch(plans.deletePlan(id));
		},
		deleteNote: (id) => {
			dispatch(notes.deleteNote(id));
		},
		logout: () => dispatch(auth.logout()),
	}
};



export default connect(mapStateToProps, mapDispatchToProps)(Plans);