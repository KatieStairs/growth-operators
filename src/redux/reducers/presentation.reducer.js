import { combineReducers } from 'redux';

const assessmentList = (state = [], action) => {
  switch (action.type) {
  case 'SET_ASSESSMENT_LIST':
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

const bucket1Data = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_1_DATA':
    return action.payload;
  default:
    return state;
  };
};

const bucket2Data = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_2_DATA':
    return action.payload;
  default:
    return state;
  };
};

const bucket3Data = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_3_DATA':
    return action.payload;
  default:
    return state;
  };
};

const bucket4Data = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_4_DATA':
    return action.payload;
  default:
    return state;
  };
};

const bucket5Data = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_5_DATA':
    return action.payload;
  default:
    return state;
  };
};

const bucket6Data = (state = [], action) => {
  switch (action.type) {
  case 'SET_PRESENTATION_BUCKET_6_DATA':
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