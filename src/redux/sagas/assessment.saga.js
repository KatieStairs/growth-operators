import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getAssessmentAnswersByID (action) {
    try{
        const response = yield axios({
            method: 'GET',
            url: `/assessment/${action.payload}`
        })
        yield put({
            type: 'SET_ASSESSMENT_ANSWERS_BY_ID',
            payload: response.data
        })
    } catch (error) {
            console.log('Error in assessment.saga -> getAssessmentAnswersByID: ', error)
    }
}

function* getBucketHeadlinesByAssessmentID (action) {
    try{
        const response = yield axios({
            method: 'GET',
            url: `/assessment/headlines/${action.payload}`
        })
        yield put({
            type: 'SET_BUCKET_HEADLINES_BY_ASSESSMENT_ID',
            payload: response.data
        })
    } catch (error) {
            console.log('Error in assessment.saga -> getBucketHeadlinesByAssessmentID: ', error)
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
        console.log('Error in assessment.saga -> postAssessmentAnswersByID: ', error)
    }
}

function* postAssessmentSlideInputsByID (action) {
    try {
        yield axios({
            method: 'POST',
            url: `/assessment/slide/${action.payload.assessment_id}`,
            data: action.payload
        })
    } catch (error) {
        console.log('Error in assessment.saga -> postAssessmentSlideInputsByID: ', error)
    }
}

function* postBucketHeadlineByID (action) {
    const newHeadline = action.payload;
    try {
        const response = yield axios({
            method: 'POST',
            url: `/assessment/headlines`,
            data: {
                assessment_id: newHeadline.assessment_id,
                bucket_id: newHeadline.bucket_id,
                headline_text: newHeadline.headline_text
            }
        })
    } catch (error) {
        console.log('Error in assessment.saga -> postBucketHeadlineByID: ', error)
    }
}

function* updateAssessmentAnswersByID (action) {
    try {
        const response = yield axios({
            method: 'PUT',
            url: `/assessment/${action.payload.assessment_id}`,
            data: action.payload
        })
        yield put({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: response.data
        })
    } catch (error) {
        console.log('Error in assessment.saga -> updateAssessmentAnswersByID: ', error)
    }
}

function* updateAllClientAssessmentStatusByID (action) {
    console.log('SAGA Payload: ', action.payload);
    try {
        const response = yield axios({
            method: 'PUT',
            url:`/assessment/status/${action.payload.id}`,
            data: action.payload
        })
        yield put({
            type: 'SAGA/GET_ALL_CLIENTS'
          })
    }
    catch (error) {
        console.log('Error in assessment.saga -> updateAssessmentStatusByID: ', error)
    }
}

function* updateReviewAssessmentStatusByID (action) {
    console.log('SAGA Payload: ', action.payload);
    try {
        const response = yield axios({
            method: 'PUT',
            url:`/assessment/status/${action.payload.id}`,
            data: action.payload
        })
        yield put({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: response.data
        })
    }
    catch (error) {
        console.log('Error in assessment.saga -> updateAssessmentStatusByID: ', error)
    }
}

function* assessmentSaga() {
    yield takeEvery('SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', getAssessmentAnswersByID);
    yield takeEvery('SAGA/GET_BUCKET_HEADLINES_BY_ASSESSMENT_ID', getBucketHeadlinesByAssessmentID)
    yield takeEvery('SAGA/POST_ASSESSMENT_ANSWERS', postAssessmentAnswersByID);
    yield takeEvery('SAGA/POST_ASSESSMENT_SLIDE_INPUTS', postAssessmentSlideInputsByID)
    yield takeEvery('SAGA/POST_HEADLINE_BY_ID', postBucketHeadlineByID);
    yield takeEvery('SAGA/UPDATE_ASSESSMENT_BY_ID', updateAssessmentAnswersByID);
    yield takeEvery('SAGA/UPDATE_R_ASSESSMENT_STATUS_BY_ID', updateReviewAssessmentStatusByID);
    yield takeEvery('SAGA/UPDATE_AC_ASSESSMENT_STATUS_BY_ID', updateAllClientAssessmentStatusByID);
}

export default assessmentSaga;