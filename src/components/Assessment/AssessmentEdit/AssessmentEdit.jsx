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

    const goToEditPage = () => {
        history.push(`/assessment-edit/${assessmentAnswersById.assessment_id}`)
    }

    const goToOverviewPage = () => {
        history.push(`/client-overview/${assessmentAnswersById.assessment_id}`)
    }

    return (
        <>
        <h1>{assessmentAnswersById.company_name} Assessment Answers</h1>
        <h4>Bucket Function Subfunction Level Phase Tags</h4>
        <div>
            {/* {assessmentAnswersById.map((answers) => {
                return <AssessmentAnswersItem key={answers.assessment_id} answers={answers}/>
            })} */}
        </div>
        <div className="accordion" id="accordionExample">
    {/* <h4>Bucket Function Subfunction Level Phase Tags</h4> */}
    {/* <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Bucket Function Subfunction Level Phase Tags
            </button>
            </h2>
            <button>See Overview</button>
            <button>Edit</button>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
            </div>
            </div>
        </div> */}
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                {assessmentAnswersById.bucket_name || ''} {assessmentAnswersById.function_name || ''} {assessmentAnswersById.subfunction_name || ''} {assessmentAnswersById.level_rating || ''} {assessmentAnswersById.tag_name || ''}
            </button>
            </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <strong>Findings:</strong> {assessmentAnswersById.findings || ''} 
                <strong>Impact:</strong> {assessmentAnswersById.impact || ''} 
                <strong>Recommendations:</strong>{assessmentAnswersById.recommendations || ''}
            </div>
            </div>
            <button onClick={goToOverviewPage}>See Overview</button>
            <button onClick={goToEditPage}>Edit</button>
        </div>
        {/*
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Accordion Item #3
            </button>
            </h2>
        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
            </div> 
        </div> */}
        </div>
        </>
    )
}

export default AssessmentEdit;