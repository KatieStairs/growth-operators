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

function* getBucketHeadlinesByAssessmentID (action) {
    try{
        const response = yield axios({
            method: 'GET',
            url: `/assessment/${action.payload}/headlines`
        })
        yield put({
            type: 'SET_BUCKET_HEADLINES_BY_ASSESSMENT_ID',
            payload: response.data
        })
        console.log(response.data);
    } catch (error) {
            console.log('Error in getBucketHeadlinesByAssessmentID: ', error)
    }
}

function* postAssessmentAnswersByID (action) {
    try {
        yield axios({
            method: 'POST',
            url: `/assessment/${action.payload.assessment_id}`,
            data: action.payload
        })
    } catch (error) {
        console.log('Error in postAssessmentAnswers: ', error)
    }
}

function* postAssessmentSlideInputsByID (action) {
    console.log('Action.payload in postAssessmentSlideInputsByID: ', action.payload)
    try {
        yield axios({
            method: 'POST',
            url: `/assessment/slide/${action.payload.assessment_id}`,
            data: action.payload
        })
    } catch (error) {
        console.log('Error in postAssessmentSlideInputsByID: ', error)
    }
}

function* postHeadlineById (action) {
    console.log('SAGA/POST_HEADLINE', action.payload);
    const newHeadline = action.payload;
    // console.log('SAGA/POST_HEADLINE assessment id', newHeadline.headline_text)
    // console.log('SAGA/POST_HEADLINE bucket id', newHeadline.bucket_id)
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
    console.log('Action.payload: ', action.payload)
    // console.log('SAGA/ UPDATE ASSESSMENT', editedAssessment)
    try {
    const response = yield axios({
        method: 'PUT',
        url: `/assessment/${action.payload.assessment_id}`,
        data: editedAssessment
        })
    // yield put({
    //     type: 'SET_ASSESSMENT_ANSWERS_BY_ID',
    //     payload: response.data
    // })
    } catch (error) {
        console.log('UPDATE ASSESSMENT SAGA ERROR', error)
    }
}

function* updateAssessmentStatus(action) {
    try {
        const response = yield axios({
            method: 'PUT',
            url:`/assessment/${action.payload.id}/status`,
            data: action.payload
        })
    }
    catch (error) {
        console.log('Error in updateAssessmentStatus: ', error)
    }
}



function* assessmentSaga() {
    yield takeEvery('SAGA/GET_BUCKET_HEADLINES_BY_ASSESSMENT_ID', getBucketHeadlinesByAssessmentID)
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', getAssessmentAnswersById);
    yield takeEvery('SAGA/POST_ASSESSMENT_ANSWERS', postAssessmentAnswersByID);
    yield takeEvery('SAGA/POST_ASSESSMENT_SLIDE_INPUTS', postAssessmentSlideInputsByID)
    // yield takeEvery('SAGA/POST_ASSESSMENT_TAG_ANSWERS', postAssessmentTagAnswers);
    yield takeEvery('SAGA/POST_HEADLINE_BY_ID', postHeadlineById);
    yield takeEvery('SAGA/UPDATE_ASSESSMENT_BY_ID', updateAssessment);
    yield takeEvery('SAGA/UPDATE_ASSESSMENT_STATUS_BY_ID', updateAssessmentStatus)
}

export default assessmentSaga;