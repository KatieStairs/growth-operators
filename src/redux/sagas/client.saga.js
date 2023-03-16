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

function* updateClientStatus(action) {
  console.log('Action.payload in Saga: ', action.payload)
  try {
    yield axios.put(`/api/client/${action.payload}/archive`, action.payload)
    yield put({
      type: 'GET_ALL_CLIENTS'
    })
  } catch (error) {
    console.error('updateClientStatus PUT request failed', error);
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

function* postClient(action) {
  try {
    const newCompany = action.payload
    // console.log(action.payload);
    const clientResponse = yield axios({
      method: 'POST',
      url: '/api/client',
      data: newCompany
    })
      console.log('new client yeild', clientResponse);
    //   yield axios({
    //     method: 'POST',
    //     url: '/client-assessment',
    //     data: {...newCompany, client_id: clientResponse.id}
    // })
    yield put({
      type: 'SAGA/GET_OPERATOR_DASHBOARD'
    })
    } catch (error) {
      console.error('postClient POST request failed', error);
    }
};

export default function* clientSaga() {
  yield takeLatest('SAGA/GET_ALL_CLIENTS', getAllClients);
  yield takeLatest('SAGA/POST_CLIENT', postClient);
  yield takeLatest('SAGA/GET_CLIENT_OVERVIEW', getClientOverview);
  yield takeLatest('SAGA/DELETE_CLIENT_BY_ID', deleteClient);
  yield takeLatest('SAGA/PUT_CLIENT_INFO_BY_ID', updateClientInfo);
  yield takeLatest('SAGA/PUT_CLIENT_STATUS_BY_ID', updateClientStatus);
};

