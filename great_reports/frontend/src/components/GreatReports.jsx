import React, { Component } from 'react';
import {connect} from 'react-redux';

import {reports, auth} from '../actions';


class GreatReports extends Component {
	state = {
		text: "",
		updateReportId: null
	}

	componentDidMount() {
		this.props.fetchReports();
	}

	resetForm = () => {
		this.setState({text: "", updateReportId: null});
	}

	selectForEdit = (id) => {
		let report = this.props.reports[id];
		this.setState({text: report.text, updateReportId: id});
	}

	submitReport = (e) => {
		e.preventDefault();
		if (this.state.updateReportId === null) {
			this.props.addReport(this.state.text).then(this.resetForm);
		} else {
			this.state.updateReport(this.state.updateReportId, this.state.text).then(this.resetForm);
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
					placeholder="Enter report here..."
					onChange={(e) => this.setState({text: e.target.value})}
					required/>
					<button onClick={this.resetForm}>Reset</button>
					<input type="submit" value="Save Report" />
				</form>

				<h3>Reports</h3>
				<table>
					<tbody>
						{this.props.reports.map((report, id) => (
							<tr key={`report_${id}`}>
								<td>{report.text}</td>
								<td><button onClick={() => this.selectForEdit(id)}>Edit</button></td>
								<td><button onClick={() => this.props.deleteReport(id)}>Delete</button></td>
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
		addReport: (text) => {
			return dispatch(reports.addReport(text));
		},
		updateReport: (id, text) => {
			return dispatch(reports.updateReport(id, text));
		},
		deleteReport: (id) => {
			dispatch(reports.deleteReport(id));
		},
		logout: () => dispatch(auth.logout()),
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(GreatReports);
