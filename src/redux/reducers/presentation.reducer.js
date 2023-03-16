import { combineReducers } from 'redux';

const assessmentList = (state = [], action) => {
  switch (action.type) {
  case 'SET_ASSESSMENT_LIST':
    return action.payload;
  default:
    return state;
  };
};


const headlines = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_HEADLINE_DATA':
    return action.payload;
  default:
    return state;
  };
};

const strengthTags = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_STRENGTH_DATA':
    return action.payload;
  default:
    return state;
  };
};

const opportunityTags = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_OPPORTUNITY_DATA':
    return action.payload;
  default:
    return state;
  };
};

const quickWinTags = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_QUICK_WIN_DATA':
    return action.payload;
  default:
    return state;
  };
};

const fireDrillTags = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_FIRE_DRILL_DATA':
    return action.payload;
  default:
    return state;
  };
};

const summaryRatings = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_SUMMARY_RATINGS':
    return action.payload;
  default:
    return state;
  };
};

const bucketRatings = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_RATINGS':
    return action.payload;
  default:
    return state;
  };
};

const operatorInputs = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_OPERATOR_INPUTS':
    return action.payload;
  default:
    return state;
  };
};

export default combineReducers({
  assessmentList,
  headlines,
  strengthTags,
  opportunityTags,
  quickWinTags,
  fireDrillTags,
  summaryRatings,
  operatorInputs
});