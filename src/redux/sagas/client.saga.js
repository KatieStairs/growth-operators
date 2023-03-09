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


function* clientSaga() {
    yield takeLatest('SAGA/GET_CLIENT_DASHBOARD', getClientDashboard)

  }
  
  export default clientSaga;