import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getAssessmentAnswersById(action) {
    const idOfAssessment = action.payload;
    console.log('saga assessment to edit', idOfAssessment)
    const response = yield axios({
        method: 'GET',
        url: `/api/assessment-items/${idOfAssessment}`
    })
    yield put({
        type: 'SET_ASSESSMENT_ANSWERS_BY_ID',
        payload: response.data
    })
}

function* assessmentSaga() {
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', getAssessmentAnswersById);
}

export default assessmentSaga;