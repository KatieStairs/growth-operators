import { combineReducers } from 'redux';

const clientDashboard = (state = [], action) => {
    if (action.type === 'SET_CLIENT_DASHBOARD') {
        // console.log('Client Dashboard reducer', action.payload)
        return action.payload;
    } 
    return state;
}

const allClients = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ALL_CLIENTS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  allClients,
  clientDashboard
});

