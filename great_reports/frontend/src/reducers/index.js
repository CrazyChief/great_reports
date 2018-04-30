import { combineReducers } from 'redux';
import plans from './plans';
import notes from './notes';
import reports from './reports';
import auth from './auth';


const reportApp = combineReducers({
	plans, notes, reports, auth,
});

export default reportApp;
