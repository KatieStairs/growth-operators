import { combineReducers } from 'redux';

const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_TAGS':
      return action.payload; 
      // returns name, id from "tags"
    default:
      return state;
  }
};

const bucketsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_BUCKETS':
      return action.payload; 
      // returns name, bucket_index, id from "buckets"
    default:
      return state;
  }
};

const functionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FUNCTIONS_BY_BUCKET':
      return action.payload;
      // returns name, function_index from "functions"; 
      // bucket_id, bucket_name from "buckets"
    default:
      return state;
  }
};

const subfunctionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SUBFUNCTIONS_BY_FUNCTION':
      return action.payload; 
      // returns id, name, subfunction_index, level_criteria_strong,
      // level_criteria_adequate, level_criteria_weak from 
      // "subfuctions"; function_name, function_index from 
      // "functions"; bucket_name, bucket_index from "buckets"
    default:
      return state;
  }
};

export default combineReducers({
  tagsReducer,
  bucketsReducer,
  functionsReducer,
  subfunctionsReducer,
});