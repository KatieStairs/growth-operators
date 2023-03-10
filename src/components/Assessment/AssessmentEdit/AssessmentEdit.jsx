import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AssessmentEdit() {
    const params = useParams();
    const dispatch = useDispatch();
    const assessmentAnswersById = useSelector((store) => store.assessmentAnswersById);
    // const history = useHistory();
    // const user = useSelector(store => store.user)

    useEffect(() => {
        console.log('params.id', params.id)
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: 1
        })
    }, []);

    // const goToEditPage = () => {
    //     history.push(`/assessment-edit/${assessmentAnswersById.assessment_id}`)
    // }

    const goToOverviewPage = () => {
        history.push(`/client-overview/${assessmentAnswersById.assessment_id}`)
    }

    return (
        <>
        
        <h1>{assessmentAnswersById.company_name} Assessment Answers</h1>
        <h2>{assessmentAnswersById.bucket_name || ''} - Review & Submit</h2>
        <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">Headline:</label>
            <input className="form-control form-control-lg" type="text"  aria-label=".form-control-lg example"></input>
        </div>
        <div classNameName="accordion" id="accordionExample">
        <div classNameName="accordion-item">
            <h3 classNameName="accordion-header" id="headingOne">
            {/* <button classNameName="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"> */}
            <div className="modal-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2" ms-auto><strong>Bucket</strong></div>
                        <div className="col-lg-2" me-auto><strong>Function</strong></div>
                        <div className="col-lg-3" me-auto><strong>Subfunction</strong></div>
                        <div className="col-md-2" me-auto><strong>Level</strong></div>
                        <div className="col-md-2" me-auto><strong>Phase</strong></div>
                        <div className="col-md-1" me-auto><strong>Tags</strong></div>
                    </div>
                </div>
            </div>
            </h3>
            <div id="collapseOne" classNameName="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div classNameName="accordion-body">
            </div>
            </div>
        </div>
        <div classNameName="accordion-item">
            <h3 classNameName="accordion-header" id="headingTwo">
            <button classNameName="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
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
                <div id="collapseTwo" classNameName="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div classNameName="accordion-body">
                        <strong>Findings:</strong> {assessmentAnswersById.findings || ''} 
                        <strong>Impact:</strong> {assessmentAnswersById.impact || ''} 
                        <strong>Recommendations:</strong>{assessmentAnswersById.recommendations || ''}
                    </div>
                </div>
            <button onClick={goToOverviewPage}>See Overview</button>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
        </div>
        </div>
        <button>Cancel</button>
        <button>Submit</button>
        </>
    )
}

export default AssessmentEdit;