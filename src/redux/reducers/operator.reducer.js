import { combineReducers } from 'redux';

const operatorDashboard = (state = [], action) => {
    if (action.type === 'SET_OPERATOR_DASHBOARD') {
        console.log('Operator Dashboard reducer', action.payload)
        return action.payload;
    } 
    return state;
};

export default combineReducers({
    operatorDashboard
  });