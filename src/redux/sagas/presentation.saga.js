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
      quickWinTags,
      fireDrillTags,
      summaryRatings,
      bucket1Data,
      bucket2Data,
      bucket3Data,
      bucket4Data,
      bucket5Data,
      bucket6Data,
    } = yield all({
      strengthTags: call(axios.get, `/presentation/strengths/${action.payload}`),
      opportunityTags: call(axios.get, `/presentation/opportunities/${action.payload}`),
      quickWinTags: call(axios.get, `/presentation/quick-wins/${action.payload}`),
      fireDrillTags: call(axios.get, `/presentation/fire-drills/${action.payload}`),
      summaryRatings: call(axios.get, `/presentation/summary-ratings/${action.payload}`),
      bucket1Data: call(axios.get, `/presentation/bucket-1/${action.payload}`),
      bucket2Data: call(axios.get, `/presentation/bucket-2/${action.payload}`),
      bucket3Data: call(axios.get, `/presentation/bucket-3/${action.payload}`),
      bucket4Data: call(axios.get, `/presentation/bucket-4/${action.payload}`),
      bucket5Data: call(axios.get, `/presentation/bucket-5/${action.payload}`),
      bucket6Data: call(axios.get, `/presentation/bucket-6/${action.payload}`),
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
      type: 'SET_PRESENTATION_QUICK_WIN_DATA',
      payload: quickWinTags
    });
    yield put({
      type: 'SET_PRESENTATION_FIRE_DRILL_DATA',
      payload: fireDrillTags
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
  } catch (error) {
      console.error('PresentationData GET failed', error);
  }
}



function* presentationSaga() {
    yield takeLatest('SAGA/GET_ASSESSMENT_LIST', getAssessmentList);
    yield takeLatest('SAGA/GET_PRESENTATION_DATA', getPresentationData)
  }

export default presentationSaga;