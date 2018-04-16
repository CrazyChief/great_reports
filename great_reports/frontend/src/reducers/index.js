import { combineReducers } from 'redux';
import reports from './reports';
import auth from './auth';


const reportApp = combineReducers({
	reports, auth,
})

export default reportApp;
