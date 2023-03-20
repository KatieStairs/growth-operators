import { combineReducers } from 'redux';

// assessment answers by id reducer
const assessmentAnswersById = (state = [], action) => {
    if (action.type === 'SET_ASSESSMENT_ANSWERS_BY_ID') {
        return action.payload;
        // returns company_name, status, assessment_item_id (as 'id'), bucket_id,
        // bucket_index, bucket_name, function_id, function_index, function_name, 
        // subfunction_id, subfunction_index, subfunction_name, level_rating, 
        // findings, impact, recommendations, phase, tag_id
    }     
    return state;
}

const headlinesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BUCKET_HEADLINES_BY_ASSESSMENT_ID':
        return action.payload;
        // returns id, assessment_id, bucket_id, 
        // headline_text from "buckets_headlines"
      default:
        return state;
    }
  };

export default combineReducers({
    assessmentAnswersById,
    headlinesReducer
})

