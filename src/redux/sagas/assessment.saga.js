import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getAssessmentAnswers() {
    try{
        const response = yield axios({
            method: 'GET',
            url: '/assessment'
        })
        yield put({
            type: 'SET_ASSESSMENT_ANSWERS',
            payload: response.data
        }) 
        console.log('sdkfjhsd', response.data)
    } catch (error) {
        console.log('SAGA/ GET assessment answers fail', error);
    }
};

function* getAssessmentAnswersById(action) {
    const idOfAssessment = action.payload;
    console.log('SAGA/ assessment by id', idOfAssessment)
    try{
        const response = yield axios({
            method: 'GET',
            url: `/assessment/${idOfAssessment}`
        })
        yield put({
            type: 'SET_ASSESSMENT_ANSWERS_BY_ID',
            payload: response.data
        })
    } catch (error) {
        console.log('SAGA/ GET AA by id failed', error)
    }
}

function* assessmentSaga() {
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS', getAssessmentAnswers);
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', getAssessmentAnswersById);
}

export default assessmentSaga;