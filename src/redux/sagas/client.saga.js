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

function* clientSaga() {
    yield takeLatest('SAGA/GET_ALL_CLIENTS', getAllClients)

  }

export default clientSaga;

