import { combineReducers } from 'redux';

const operatorDashboard = (state = [], action) => {
    if (action.type === 'SET_OPERATOR_DASHBOARD') {
        return action.payload;
        // returns assessment_id, company_name, status,
        // engagement_date, client_id
    } 
    return state;
};

export default combineReducers({
    operatorDashboard
  });