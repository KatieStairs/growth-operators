import { combineReducers } from 'redux';

const bucketsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ALL_BUCKETS':
      return action.payload; 
      // returns name, bucket_index, id from "buckets"
    default:
      return state;
  }
};

const functionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FUNCTIONS_BY_BUCKET':
      return action.payload;
      // returns name, function_index from "functions"; 
      // bucket_name from "buckets"
    default:
      return state;
  }
};

const subfunctionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SUBFUNCTIONS_BY_FUNCTION':
      return action.payload; 
      // returns name, subfunction_index, level_rating_criteria 
      // from "subfuctions"; function_name, function_index from 
      // "functions"; bucket_name, bucket_index from "buckets"
    default:
      return state;
  }
};

export default combineReducers({
  bucketsReducer,
  functionsReducer,
  subfunctionsReducer,
});