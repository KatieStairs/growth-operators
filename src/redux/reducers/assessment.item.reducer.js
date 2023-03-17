import { combineReducers } from 'redux';

// assessment answers by id reducer
const assessmentAnswersById = (state = [], action) => {
    if (action.type === 'SET_ASSESSMENT_ANSWERS_BY_ID') {
        return action.payload;
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

