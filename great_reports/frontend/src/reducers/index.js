import { combineReducers } from 'redux';
import plans from './plans';
import reports from './reports';
import auth from './auth';


const reportApp = combineReducers({
	plans, reports, auth,
});

export default reportApp;
