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
    console.error('Error in client.saga -> getAllClients: ', error);
  }
};

function* getClientOverview (action) {
  try {
    const response = yield axios({
      method:  'GET',
      url: '/api/client/overview',
      params: action.payload
    })
    // yield put({
    //   type: 'SET_CLIENT_OVERVIEW',
    //   payload: response.data
    // })
  } catch (error) {
    console.error('Error in client.saga -> getClientOverview: ', error);
  }
};

function* updateClientInfoByID (action) {
  const client = action.payload;
  try {
    yield axios.put(`/api/client/${client.id}`, client)
    yield put({
      type: 'GET_ALL_CLIENTS'
    })
  } catch (error) {
    console.error('Error in client.saga -> updateClientInfoByID: ', error);
  }
};

function* updateClientStatusByID (action) {
  try {
    yield axios.put(`/api/client/${action.payload}/archive`, action.payload)
    yield put({
      type: 'GET_ALL_CLIENTS'
    })
  } catch (error) {
    console.error('Error in client.saga -> updateClientStatusByID: ', error);
  }
};

function* deleteClientByID (action) {
  try {
    yield axios.delete(`/api/client/${action.payload}`)
    yield put({
      type: 'GET_ALL_CLIENTS'
    })
  } catch (error) {
    console.error('Error in client.saga -> deleteClientByID: ', error);
  }
};

function* postClient (action) {
  try {
    const newCompany = action.payload
    // console.log(action.payload);
    const clientResponse = yield axios({
      method: 'POST',
      url: '/api/client',
      data: newCompany
    })
    yield put({
      type: 'SAGA/GET_OPERATOR_DASHBOARD'
    })
    } catch (error) {
      console.error('Error in client.saga -> postClient: ', error);
    }
};

export default function* clientSaga() {
  yield takeLatest('SAGA/GET_ALL_CLIENTS', getAllClients);
  yield takeLatest('SAGA/POST_CLIENT', postClient);
  yield takeLatest('SAGA/GET_CLIENT_OVERVIEW', getClientOverview);
  yield takeLatest('SAGA/DELETE_CLIENT_BY_ID', deleteClientByID);
  yield takeLatest('SAGA/PUT_CLIENT_INFO_BY_ID', updateClientInfoByID);
  yield takeLatest('SAGA/PUT_CLIENT_STATUS_BY_ID', updateClientStatusByID);
};

