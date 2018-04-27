const initialState = [];


export default function plans(state=initialState, action) {
	let planList = state.slice();

	switch (action.type) {
		case 'FETCH_PLANS':
      return [...state, ...action.plans];

		case 'ADD_PLAN':
			return [...state, action.plan];

		case 'UPDATE_PLAN':
			let planToUpdate = planList[action.index];
			planToUpdate.date_for = action.plan.date_for;
			planList.splice(action.index, 1, planToUpdate);
			return planList;

		case 'DELETE_PLAN':
			planList.splice(action.index, 1);
			return planList;

		default:
			return state;
	}
}
