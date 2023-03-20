import { combineReducers } from 'redux';

const allClients = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_CLIENTS':
      return action.payload;
      // returns id, company_name, contact_name, contact_email,
      // status, assessment_id, engagement_date, operators
    default:
      return state;
  }
};

const clientOverview = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLIENT_OVERVIEW':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  allClients,
  clientOverview
});

