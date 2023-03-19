import { combineReducers } from 'redux';


const allClients = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_CLIENTS':
      return action.payload;
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

