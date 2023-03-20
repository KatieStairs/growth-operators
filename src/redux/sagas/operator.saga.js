import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getOperatorDashboard() {
    try{
        const operator_dashboard = yield axios({
            method: 'GET',
            url: '/api/client/dashboard'
        })
        yield put({
            type: 'SET_OPERATOR_DASHBOARD',
            payload: operator_dashboard.data
        }) 
    } catch (error) {
        console.log('Error in operator.saga -> getOperatorDashboard: ', error);
    }
}


function* operatorSaga() {
    yield takeLatest('SAGA/GET_OPERATOR_DASHBOARD', getOperatorDashboard)
  }

export default operatorSaga;