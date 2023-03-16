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
      headlines,
      strengthTags,
      opportunityTags,
      quickWinTags,
      fireDrillTags,
      summaryRatings,
      bucketRatings
    } = yield all({
      headlines: call(axios.get, `/presentation/headlines/${action.payload}`),
      strengthTags: call(axios.get, `/presentation/strengths/${action.payload}`),
      opportunityTags: call(axios.get, `/presentation/opportunities/${action.payload}`),
      quickWinTags: call(axios.get, `/presentation/quick-wins/${action.payload}`),
      fireDrillTags: call(axios.get, `/presentation/fire-drills/${action.payload}`),
      summaryRatings: call(axios.get, `/presentation/summary-ratings/${action.payload}`),
      bucketRatings: call(axios.get, `/presentation/bucket-ratings/${action.payload}`),
    });
    yield put({
        type: 'SET_PRESENTATION_HEADLINE_DATA',
        payload: headlines
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
      type: 'SET_PRESENTATION_BUCKET_RATINGS',
      payload: bucketRatings
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