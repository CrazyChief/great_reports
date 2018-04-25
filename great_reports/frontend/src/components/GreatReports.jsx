import React, { Component } from 'react';
import {
	FloatingActionButton,
	FlatButton,
	Dialog,
	TextField,
	TimePicker,
	RaisedButton,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';

import {reports, auth} from '../actions';

const style = {
  margin: 12,
};


class GreatReports extends Component {
	state = {
		text: "",
		description: "",
		spent_time: null,
		updateReportId: null,
		open: false,
	}

	componentDidMount() {
		this.props.fetchReports();
	}

	handleOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.resetForm();
		this.setState({open: false});
	}

	resetForm = () => {
		this.setState({
			text: "", description: "", spent_time: null, updateReportId: null});
	}

	selectForEdit = (id) => {
		let report = this.props.reports[id];
		this.setState({
			text: report.text,
			description: report.description || "",
			spent_time: this.convertStringToDate(report.spent_time) || null,
			updateReportId: id});
		this.handleOpen();
	}

	convertDateToString = (date) => {
		return `${date.getHours()}:${date.getMinutes()}`
	}

	convertStringToDate = (string) => {
		let d = new Date();
		let pieces = string.split(':');
		d.setHours(parseInt(pieces[0]));
		d.setMinutes(parseInt(pieces[1]));
		return d;
	}

	submitReport = (e) => {
		e.preventDefault();
		if (this.state.updateReportId === null) {
			this.props.addReport(
				this.state.text,
				this.state.description,
				this.convertDateToString(this.state.spent_time)).then(this.resetForm);
		} else {
			this.props.updateReport(
				this.state.updateReportId,
				this.state.text,
				this.state.description,
				this.convertDateToString(this.state.spent_time)).then(this.resetForm);
		}
		this.handleClose();
	}

	handleTimePicker = (event, date) => {
		this.setState({spent_time: date})
	}

	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
			<RaisedButton
				label="Reset"
				onClick={this.resetForm}
				style={style}
			/>,
      <RaisedButton
	      label="Save Report"
	      onClick={this.submitReport}
	      style={style} />,
    ];

		return (
			<div>
				<h2>Welcome to Great Reports!</h2>
				<hr/>
				<div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
        </div>

				<h3>
					Add new report
					<FloatingActionButton mini={true} style={style} onClick={this.handleOpen}>
			      <ContentAdd />
			    </FloatingActionButton>
				</h3>
				<Dialog
					title="Add new report"
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<form onSubmit={this.submitReport}>
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

				<h3>Reports</h3>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>Title</TableHeaderColumn>
							<TableHeaderColumn>Description</TableHeaderColumn>
							<TableHeaderColumn>Estimate</TableHeaderColumn>
							<TableHeaderColumn>Spent time</TableHeaderColumn>
							<TableHeaderColumn>Actions</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{this.props.reports.map((report, id) => (
							<TableRow key={`report_${report.id}`}>
								<TableRowColumn>{report.text}</TableRowColumn>
								<TableRowColumn>{report.description}</TableRowColumn>
								<TableRowColumn>{report.extimate}</TableRowColumn>
								<TableRowColumn>{report.spent_time}</TableRowColumn>
								<TableRowColumn>
									<RaisedButton
										label="Edit"
										backgroundColor="#0000FF"
										onClick={() => this.selectForEdit(id)}
										style={style}
									/>
									<RaisedButton
										label="Delete"
										backgroundColor="#FF0000"
										onClick={() => this.props.deleteReport(id)}
										style={style}
									/>
								</TableRowColumn>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		reports: state.reports,
		user: state.auth.user,
	}
}


const mapDispatchToProps = dispatch => {
	return {
		fetchReports: () => {
			dispatch(reports.fetchReports());
		},
		addReport: (text, description, spent_time) => {
			return dispatch(reports.addReport(text, description, spent_time));
		},
		updateReport: (id, text, description, spent_time) => {
			return dispatch(reports.updateReport(id, text, description, spent_time));
		},
		deleteReport: (id) => {
			dispatch(reports.deleteReport(id));
		},
		logout: () => dispatch(auth.logout()),
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(GreatReports);
