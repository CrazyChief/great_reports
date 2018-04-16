const initialState = [];


export default function reports(state=initialState, action) {
	let reportList = state.slice();

	switch (action.type) {
		case 'FETCH_REPORTS':
      return [...state, ...action.reports];

		case 'ADD_REPORT':
			return [...state, action.report];

		case 'UPDATE_REPORT':
			let reportToUpdate = reportList[action.index];
			reportToUpdate.text = action.report.text;
			reportList.splice(action.index, 1, reportToUpdate);
			return reportList;

		case 'DELETE_REPORT':
			reportList.splice(action.index, 1);
			return reportList;

		default:
			return state;
	}
}
