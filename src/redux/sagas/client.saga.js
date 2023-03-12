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

// export default clientSaga;


function* updateClientInfo(action) {
  const client = action.payload;
  try {
    yield axios.put(`/api/client/${client.id}`, client)
    yield put({
      type: 'GET_ALL_CLIENTS'
    })
  } catch (error) {
    console.error('updateClientInfo PUT request failed', error);
  }
};

function* deleteClient(action) {
  try {
    yield axios.delete(`/api/client/${action.payload}`)
    yield put({
      type: 'GET_ALL_CLIENTS'
    })
  } catch (error) {
    console.error('deleteClient DELETE request failed', error);
  }
};

export default function* clientSaga() {
  yield takeLatest('SAGA/GET_ALL_CLIENTS', getAllClients);
  yield takeLatest('SAGA/PUT_CLIENT_INFO_BY_ID', updateClientInfo);
  yield takeLatest('SAGA/DELETE_CLIENT_BY_ID', deleteClient);
};

