const initialState = [];


export default function notes(state=initialState, action) {
	let noteList = state.slice();

	switch (action.type) {
		case 'FETCH_NOTES':
      return [...state, ...action.notes];

		case 'ADD_NOTE':
			return [...state, action.note];

		case 'UPDATE_NOTE':
			let noteToUpdate = noteList[action.index];
			noteToUpdate.planId = action.note.planId;
			noteToUpdate.title = action.note.title;
			noteToUpdate.description = action.note.description;
			noteToUpdate.spent_time = action.note.spent_time;
			noteList.splice(action.index, 1, noteToUpdate);
			return noteList;

		case 'DELETE_NOTE':
			noteList.splice(action.index, 1);
			return noteList;

		default:
			return state;
	}
}
