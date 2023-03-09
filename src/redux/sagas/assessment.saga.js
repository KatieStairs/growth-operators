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

// LAUREN NOTE TO SELF - figure out tags addition
// function* saveAssessmentAnswers (action) {
//     console.log('Action.payload in saveAssessmentAnswers: ', action.payload)
//     try {
//         yield axios({
//             method: 'POST',
//             url: `/assessment/${action.payload}`,
//             data: action.payload
//         })
//         yield put({
//             type: 'SAGA/GET_ASSESSMENT_ANSWERS'
//         })
//     } catch (error) {
//         console.log('Error in saveAssessmentAnswers: ', error)
//     }
// }

function* assessmentSaga() {
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS', getAssessmentAnswers);
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', getAssessmentAnswersById);
    // yield takeEvery('SAGA/POST_ANSWERS', saveAssessmentAnswers);
}

export default assessmentSaga;