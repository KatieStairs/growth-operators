import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getOperatorDashboard() {
    try{
        const operator_dashboard = yield axios({
            method: 'GET',
            url: '/api/client/dashboard'
        })
        // console.log('get client dashboard info,', client_dashboard)
        yield put({
            type: 'SET_OPERATOR_DASHBOARD',
            payload: operator_dashboard.data
        }) 
        console.log('client dashboard SAGA', operator_dashboard.data)
    } catch (error) {
        console.log('SAGA / GET operator dashboard fail', error);
    }
}



function* operatorSaga() {
    yield takeLatest('SAGA/GET_OPERATOR_DASHBOARD', getOperatorDashboard)
  }

export default operatorSaga;