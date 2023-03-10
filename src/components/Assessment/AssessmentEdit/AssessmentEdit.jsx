import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AssessmentEdit() {
    const params = useParams();
    const dispatch = useDispatch();
    const assessmentAnswersById = useSelector((store) => store.assessmentAnswersById);
    const history = useHistory();
    const user = useSelector(store => store.user)

    useEffect(() => {
        console.log('params.id', params.id)
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: 1
        })
    }, []);

    const addNewHeadline = event => {
        event.preventDefault();
        console.log('assessment_id', assessmentAnswersById.assessment_id, 'headline', event.target.value);
        dispatch({
            type: 'SAGA/POST_HEADLINE_BY_ID',
            payload: {
                assessment_id: 1,
                headline_text: event.target.value
            }
        })
    }

    const handleSubmit = () => {
        addNewHeadline();
    }
    const goToOverviewPage = () => {
        history.push(`/client-overview/${assessmentAnswersById.assessment_id}`)
    }

    const goToDashboard = () => {
        history.push(`/dashboard`)
    }

    return (
        <>
        
        <h1>{assessmentAnswersById.company_name} Assessment Answers</h1>
        <h2>{assessmentAnswersById.bucket_name || ''} - Review & Submit</h2>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Headline:</label>
            <input className="form-control form-control-lg" type="text"  aria-label=".form-control-lg example" onChange={addNewHeadline}></input>
        </div>
        <div className="accordion" id="accordionExample">
        <div className="accordion-item">
            <h3 className="accordion-header" id="headingOne">
            {/* <button classNameName="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"> */}
            <div className="modal-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2"><strong>Bucket</strong></div>
                        <div className="col-lg-2"><strong>Function</strong></div>
                        <div className="col-lg-3"><strong>Subfunction</strong></div>
                        <div className="col-md-2"><strong>Level</strong></div>
                        <div className="col-md-2"><strong>Phase</strong></div>
                        <div className="col-md-1"><strong>Tags</strong></div>
                    </div>
                </div>
            </div>
            </h3>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
            </div>
            </div>
        </div>
        <div className="accordion-item">
            <h3 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            {/* <div className="modal-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2"><strong>Bucket</strong></div>
                        <div className="col-lg-2"><strong>Function</strong></div>
                        <div className="col-lg-2"><strong>Subfunction</strong></div>
                        <div className="col-lg-2"><strong>Level</strong></div>
                        <div className="col-lg-2"><strong>Phase</strong></div>
                        <div className="col-lg-2"><strong>Tags</strong></div>
                    </div>
                </div>
            </div> */}
                {assessmentAnswersById.bucket_name || ''} {assessmentAnswersById.function_name || ''} {assessmentAnswersById.subfunction_name || ''} {assessmentAnswersById.level_rating || ''} {assessmentAnswersById.tag_name || ''}
            </button>
            </h3>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>Findings:</strong> {assessmentAnswersById.findings || ''} 
                        <strong>Impact:</strong> {assessmentAnswersById.impact || ''} 
                        <strong>Recommendations:</strong>{assessmentAnswersById.recommendations || ''}
                    </div>
                </div>
            <button onClick={goToOverviewPage}>See Overview</button>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
        </div>
        </div>
        <button onClick={goToDashboard}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default AssessmentEdit;