import React, { Component } from 'react';
import {connect} from 'react-redux';

import {reports, auth} from '../actions';


class GreatReports extends Component {
	state = {
		text: "",
		description: "",
		spent_time: "",
		updateReportId: null
	}

	componentDidMount() {
		this.props.fetchReports();
	}

	resetForm = () => {
		this.setState({
			text: "", description: "", spent_time: "", updateReportId: null});
	}

	selectForEdit = (id) => {
		let report = this.props.reports[id];
		this.setState({
			text: report.text,
			description: report.description,
			spent_time: report.spent_time,
			updateReportId: id});
	}

	submitReport = (e) => {
		e.preventDefault();
		if (this.state.updateReportId === null) {
			this.props.addReport(
				this.state.text,
				this.state.description,
				this.state.spent_time).then(this.resetForm);
		} else {
			this.props.updateReport(
				this.state.updateReportId,
				this.state.text,
				this.state.description,
				this.state.spent_time).then(this.resetForm);
		}
		this.resetForm();
	}

	render() {
		return (
			<div>
				<h2>Welcome to Great Reports!</h2>
				<hr/>
				<div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
        </div>

				<h3>Add new report</h3>
				<form onSubmit={this.submitReport}>
					<input
						value={this.state.text}
						placeholder="Enter report title here..."
						onChange={(e) => this.setState({text: e.target.value})}
						required/>
					<textarea
						value={this.state.description}
						placeholder="Enter report description here..."
						onChange={(e) => this.setState({description: e.target.value})}></textarea>
					<input
						value={this.state.spent_time}
						onChange={(e) => this.setState({spent_time: e.target.value})}
						type="time"
					/>
					<button onClick={this.resetForm}>Reset</button>
					<input type="submit" value="Save Report" />
				</form>

				<h3>Reports</h3>
				<table>
					<tbody>
            {this.props.reports.map((report, id) => (
              <tr key={`report_${report.id}`}>
                <td>{report.text}</td>
	              <td>{report.description}</td>
	              <td>{report.spent_time}</td>
                <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                <td><button onClick={() => this.props.deleteReport(id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
				</table>
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
