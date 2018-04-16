export const fetchReports = () => {
	return dispatch => {
		let headers = {"Content-Type": "application/json"};
		return fetch("/api/reports/", {headers, })
			.then(res => res.json())
			.then(reports => {
				return dispatch({
					type: 'FETCH_REPORTS',
					reports
				})
			})
	}
}


export const addReport = text => {
	return dispatch => {
		let headers = {"Content-Type": "application/json"};
		let body = JSON.stringify({text, });
		return fetch("/api/reports/", {headers, method: "POST", body})
			.then(res => res.json())
			.then(report => {
				return dispatch({
					type: 'ADD_REPORT',
					report
				})
			})
	}
}


export const updateReport = (index, text) => {
	return (dispatch, getState) => {
		let headers = {"Content-Type": "application/json"};
		let body = JSON.stringify({text, });
		let reportId = getState().reports[index].id;

		return fetch(`/api/reports/${reportId}/`, {headers, method: "PUT", body})
			.then(res => res.json())
			.then(report => {
				return dispatch({
					type: 'UPDATE_REPORT',
					report,
					index
				})
			})
	}
}


export const deleteReport = index => {
	return (dispatch, getState) => {
		let headers = {"Content-Type": "application/json"};
		let reportId = getState().reports[index].id;

		return fetch(`/api/reports/${reportId}/`, {headers, method: "DELETE"})
			.then(res => {
				if (res.ok) {
					return dispatch({
						type: 'DELETE_REPORT',
						index
					})
				}
			})
	}
}
