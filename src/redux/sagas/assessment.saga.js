import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// function to get all assessment answers by id
function* getAssessmentAnswersById(action) {
    const idOfAssessment = action.payload;
    // console.log('SAGA/ assessment by id', idOfAssessment)
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
function* saveAssessmentAnswers (action) {
    console.log('Action.payload in saveAssessmentAnswers: ', action.payload)
    try {
        yield axios({
            method: 'POST',
            url: `/assessment/${action.payload.assessmentID}`,
            data: action.payload
        })
        // yield put({
        //     type: 'SAGA/GET_ASSESSMENT_ANSWERS'
        // })
    } catch (error) {
        console.log('Error in saveAssessmentAnswers: ', error)
    }
}

function* postHeadlineById (action) {
    console.log('SAGA/POST_HEADLINE', action.payload);
    const newHeadline = action.payload;
    
    console.log('SAGA/POST_HEADLINE assessment id', newHeadline.headline_text)
    console.log('SAGA/POST_HEADLINE bucket id', newHeadline.bucket_id)
    try {
        const response = yield axios({
            method: 'POST',
            url: `/assessment`,
            data: {
                assessment_id: newHeadline.assessment_id,
                bucket_id: newHeadline.bucket_id,
                headline_text: newHeadline.headline_text
            }
        })
    } catch (error) {
        console.log('post new headline SAGA error', error)
    }
}

function* updateAssessment(action) {
    const editedAssessment = action.payload;
    console.log('SAGA/ UPDATE ASSESSMENT', editedAssessment)
    try {
    yield axios({
        method: 'PUT',
        url: `/assessment`,
        data: editedAssessment
        })
    } catch (error) {
        console.log('UPDATE ASSESSMENT SAGA ERROR', error)
    }
}



function* assessmentSaga() {
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', getAssessmentAnswersById);
    yield takeEvery('SAGA/POST_ANSWERS', saveAssessmentAnswers);
    yield takeEvery('SAGA/POST_HEADLINE_BY_ID', postHeadlineById);
    yield takeEvery('SAGA/UPDATE_ASSESSMENT_BY_ID', updateAssessment);
}

export default assessmentSaga;