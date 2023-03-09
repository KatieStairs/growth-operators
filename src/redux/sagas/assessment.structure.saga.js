import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBuckets () {
  try {
    const response = yield axios.get('/buckets')
    yield put({
      type: 'SET_ALL_BUCKETS',
      payload: response.data 
    })
  } catch (error) {
    console.error('Error in fetchBuckets ', error)
  }
}

function* fetchFunctionsByBucket (action) {
  try {
    const response = yield axios.get(`/buckets/${action.payload}/functions`)
    yield put({
      type: 'SET_FUNCTIONS_BY_BUCKET',
      payload: response.data 
    })
  } catch (error) {
    console.error('Error in fetchFunctionsByBucket ', error)
  }
}

function* fetchSubfunctionsByFunction (action) {
  try {
    const response = yield axios.get(`/buckets/functions/${action.payload}/subfunctions`)
    yield put({
      type: 'SET_SUBFUNCTIONS_BY_FUNCTION',
      payload: response.data 
    })
  } catch (error) {
    console.error('Error in fetchSubfunctionsByFunction ', error)
  }
}

export default function* structureSaga() {
  yield takeLatest('SAGA/FETCH_ALL_BUCKETS', fetchBuckets);
  yield takeLatest('SAGA/FETCH_FUNCTIONS_BY_BUCKET', fetchFunctionsByBucket);
  yield takeLatest('SAGA/FETCH_SUBFUNCTIONS_BY_FUNCTION', fetchSubfunctionsByFunction);
}