import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


  function* getClientDashboard() {
    try{
        const client_dashboard = yield axios({
            method: 'GET',
            url: '/client'
        })
        // console.log('get client dashboard info,' client_dashboard)
        yield put({
            type: 'SET_CLIENT_DASHBOARD',
            payload: client_dashboard.data
        }) 
        console.log('client dashboard', client_dashboard.data)
    } catch (error) {
        console.log('SAGA/ GET client dashboard fail', error);
    }
};

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
    yield takeLatest('SAGA/GET_CLIENT_DASHBOARD', getClientDashboard)
    yield takeLatest('SAGA/GET_ALL_CLIENTS', getAllClients)

  }

export default clientSaga;

