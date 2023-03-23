import { combineReducers } from 'redux';

const strengthTags = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_STRENGTH_DATA':
    console.log('Action.payload: ', action.payload)
    return action.payload;
  default:
    return state;
  };
}; // Stores the assessment items with strength tags

const opportunityTags = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_OPPORTUNITY_DATA':
    return action.payload;
  default:
    return state;
  };
}; // Stores the assessment items with opportunity tags

const summaryRatings = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_SUMMARY_RATINGS':
    return action.payload;
  default:
    return state;
  };
}; // Stores the average level ratings by bucket for the Executive Summary slide

const bucketData = (state = {
  bucket1: [],
  bucket2: [],
  bucket3: [],
  bucket4: [],
  bucket5: [],
  bucket6: []
}, action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_1_DATA':
    return {...state, bucket1: action.payload};
  case 'SET_PRESENTATION_BUCKET_2_DATA':
    return {...state, bucket2: action.payload};
  case 'SET_PRESENTATION_BUCKET_3_DATA':
    return {...state, bucket3: action.payload};
  case 'SET_PRESENTATION_BUCKET_4_DATA':
    return {...state, bucket4: action.payload};
  case 'SET_PRESENTATION_BUCKET_5_DATA':
    return {...state, bucket5: action.payload};
  case 'SET_PRESENTATION_BUCKET_6_DATA':
    return {...state, bucket6: action.payload};
  default:
    return state;
  };
}; // Stores the average level ratings by function, sorted by bucket 

const bucketTags = (state = {
  bucket1: [],
  bucket2: [],
  bucket3: [],
  bucket4: [],
  bucket5: [],
  bucket6: []
}, action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_1_TAGS':
    return {...state, bucket1: action.payload};
  case 'SET_PRESENTATION_BUCKET_2_TAGS':
    return {...state, bucket2: action.payload};
  case 'SET_PRESENTATION_BUCKET_3_TAGS':
    return {...state, bucket3: action.payload};
  case 'SET_PRESENTATION_BUCKET_4_TAGS':
    return {...state, bucket4: action.payload};
  case 'SET_PRESENTATION_BUCKET_5_TAGS':
    return {...state, bucket5: action.payload};
  case 'SET_PRESENTATION_BUCKET_6_TAGS':
    return {...state, bucket6: action.payload};
  default:
    return state;
  };
}; // Stores the assessment items with Quick Win/Fire Drill tags, sorted by bucket

const operatorInputs = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_OPERATOR_INPUTS':
    return action.payload;
  default:
    return state;
  };
}; // Stores the operator inputs for the Next Steps and Future Is Bright slides

export default combineReducers({
  strengthTags,
  opportunityTags,
  summaryRatings,
  bucketData,
  bucketTags,
  operatorInputs
});