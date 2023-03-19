import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import client from './client.reducer'
import assessmentItems from './assessment.item.reducer';
import structure from './assessment.structure.reducer';
import operatorDashboard from './operator.reducer';
import presentation from './presentation.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  assessmentItems, // contains assessments by assessment_id, bucket headlines by assessment_id
  structure, // contains buckets, functions by bucket, subfunctions by function (as objects)
  client, // contains all clients
  operatorDashboard, // contains operator dashboard 
  presentation
});

export default rootReducer;
