import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllClients() {
  try {
    const response = yield axios.get('/api/client/all')
    yield put({
      type: 'SET_ALL_CLIENTS',
      payload: response.data
    })
  } catch (error) {
    console.error('getAllClients GET request failed', error);
  }
};

function* getClientOverview(action) {
  try {
    const clientId = action.payload;
    console.log("this is the action payload:", clientId)

    const response = yield  axios({
      method:  'GET',
      url: '/api/client/overview',
      params: clientId
    })
    
    // yield put({
    //   type: 'SET_CLIENT_OVERVIEW',
    //   payload: response.data
    // })
  } catch (error) {
    console.error('getAllClients GET request failed', error);
  }
};

export default function* clientSaga() {
  yield takeLatest('SAGA/GET_ALL_CLIENTS', getAllClients);
  yield takeLatest('SAGA/GET_CLIENT_OVERVIEW', getClientOverview);

};