import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import client from './client.reducer'
import assessmentAnswersById from './assessment.item.reducer';
import structure from './assessment.structure.reducer';
import operatorDashboard from './operator.reducer';
import clientOverview from './client.reducer'



// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  client,
  assessmentAnswersById, // contains assessment answer data by the id of the assessment
  structure, // contains buckets, functions by bucket, subfunctions by function (as objects)
  client, //
  operatorDashboard, // contains operator dashboard 
  clientOverview // contains client overview data
});

export default rootReducer;
