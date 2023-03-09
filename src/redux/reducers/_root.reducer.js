import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import client from './client.reducer'
import assessmentAnswersList from './assessment.list.reducer';
import assessmentAnswersById from './assessment.item.reducer';
import structure from './assessment.structure.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  client, // will have all of the client information from the db
  assessmentAnswersList,
  assessmentAnswersById,
  structure, // contains buckets, functions by bucket, subfunctions by function (as objects)
});

export default rootReducer;
