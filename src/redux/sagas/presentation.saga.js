import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getPresentationData(action) {
  try {
    const endpoints = [
      `/presentation/strengths/${action.payload}`,
      `/presentation/opportunities/${action.payload}`,
      `/presentation/summary-ratings/${action.payload}`,
      `/presentation/bucket-1/data/${action.payload}`,
      `/presentation/bucket-2/data/${action.payload}`,
      `/presentation/bucket-3/data/${action.payload}`,
      `/presentation/bucket-4/data/${action.payload}`,
      `/presentation/bucket-5/data/${action.payload}`,
      `/presentation/bucket-6/data/${action.payload}`,
      `/presentation/bucket-1/tags/${action.payload}`,
      `/presentation/bucket-2/tags/${action.payload}`,
      `/presentation/bucket-3/tags/${action.payload}`,
      `/presentation/bucket-4/tags/${action.payload}`,
      `/presentation/bucket-5/tags/${action.payload}`,
      `/presentation/bucket-6/tags/${action.payload}`,
      `/presentation/operator-inputs/${action.payload}`
    ];

    const response = yield axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
    console.log (response);
      yield put({
        type: 'SET_PRESENTATION_STRENGTH_DATA',
        payload: response[0].data
      });
      yield put({
      type: 'SET_PRESENTATION_OPPORTUNITY_DATA',
      payload: response[1].data
      });
      yield put({
        type: 'SET_PRESENTATION_SUMMARY_RATINGS',
        payload: response[2].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_1_DATA',
        payload: response[3].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_2_DATA',
        payload: response[4].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_3_DATA',
        payload: response[5].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_4_DATA',
        payload: response[6].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_5_DATA',
        payload: response[7].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_6_DATA',
        payload: response[8].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_1_TAGS',
        payload: response[9].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_2_TAGS',
        payload: response[10].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_3_TAGS',
        payload: response[11].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_4_TAGS',
        payload: response[12].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_5_TAGS',
        payload: response[13].data
      });
      yield put({
        type: 'SET_PRESENTATION_BUCKET_6_TAGS',
        payload: response[14].data
      });
      yield put({
        type: 'SET_PRESENTATION_OPERATOR_INPUTS',
        payload: response[15].data
      });
    
  } catch (error) {
      console.error('presentation.saga getPresentationData failed', error);
  }
}



function* presentationSaga() {
    yield takeLatest('SAGA/GET_PRESENTATION_DATA', getPresentationData)
  }

export default presentationSaga;