import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';


function* getAssessmentList(action) {
    try{
      const response = yield axios.get({
        url: `/presentation/assessments/${action.payload}`,
      })
      yield put({
          type: 'SET_ASSESSMENT_LIST',
          payload: response.data
      })
    } catch (error) {
        console.error('AssessmentList GET failed', error);
    }
}

function* getPresentationData(action) {
  try{
    const {
      strengthTags,
      opportunityTags,
      summaryRatings,
      bucket1Data,
      bucket2Data,
      bucket3Data,
      bucket4Data,
      bucket5Data,
      bucket1Tags,
      bucket2Tags,
      bucket3Tags,
      bucket4Tags,
      bucket5Tags,
      bucket6Tags
    } = yield all({
      strengthTags: call(axios.get, `/presentation/strengths/${action.payload}`),
      opportunityTags: call(axios.get, `/presentation/opportunities/${action.payload}`),
      summaryRatings: call(axios.get, `/presentation/summary-ratings/${action.payload}`),
      bucket1Data: call(axios.get, `/presentation/bucket-1/data/${action.payload}`),
      bucket2Data: call(axios.get, `/presentation/bucket-2/data/${action.payload}`),
      bucket3Data: call(axios.get, `/presentation/bucket-3/data/${action.payload}`),
      bucket4Data: call(axios.get, `/presentation/bucket-4/data/${action.payload}`),
      bucket5Data: call(axios.get, `/presentation/bucket-5/data/${action.payload}`),
      bucket6Data: call(axios.get, `/presentation/bucket-6/data/${action.payload}`),
      bucket1Tags: call(axios.get, `/presentation/bucket-1/tags/${action.payload}`),
      bucket2Tags: call(axios.get, `/presentation/bucket-2/tags/${action.payload}`),
      bucket3Tags: call(axios.get, `/presentation/bucket-3/tags/${action.payload}`),
      bucket4Tags: call(axios.get, `/presentation/bucket-4/tags/${action.payload}`),
      bucket5Tags: call(axios.get, `/presentation/bucket-5/tags/${action.payload}`),
      bucket6Tags: call(axios.get, `/presentation/bucket-6/tags/${action.payload}`),
    });
    yield put({
      type: 'SET_PRESENTATION_STRENGTH_DATA',
      payload: strengthTags
    });
    yield put({
    type: 'SET_PRESENTATION_OPPORTUNITY_DATA',
    payload: opportunityTags
    });
    yield put({
      type: 'SET_PRESENTATION_SUMMARY_RATINGS',
      payload: summaryRatings
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_1_DATA',
      payload: bucket1Data
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_2_DATA',
      payload: bucket2Data
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_3_DATA',
      payload: bucket3Data
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_4_DATA',
      payload: bucket4Data
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_5_DATA',
      payload: bucket5Data
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_6_DATA',
      payload: bucket6Data
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_1_TAGS',
      payload: bucket1Tags
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_2_TAGS',
      payload: bucket2Tags
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_3_TAGS',
      payload: bucket3Tags
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_4_TAGS',
      payload: bucket4Tags
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_5_TAGS',
      payload: bucket5Tags
    });
    yield put({
      type: 'SET_PRESENTATION_BUCKET_6_TAGS',
      payload: bucket6Tags
    });
  } catch (error) {
      console.error('PresentationData GET failed', error);
  }
}



function* presentationSaga() {
    yield takeLatest('SAGA/GET_ASSESSMENT_LIST', getAssessmentList);
    yield takeLatest('SAGA/GET_PRESENTATION_DATA', getPresentationData)
  }

export default presentationSaga;