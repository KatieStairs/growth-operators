import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentAnswersItem from './AssessmentAnswersItem'

function AssessmentAnswers() {
    const dispatch = useDispatch();
    const assessmentAnswers = useSelector((store) => store.assessmentAnswers);

    useEffect(() => {
        console.log('assessmentAnswers=', assessmentAnswers)
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS'
        })
    }, []);

  return (
    <>
    <h1>Test Corp Assessment Answers</h1>
    <h3>Bucket Function Subfunction Level Phase Tags</h3>
    {assessmentAnswers.map((answers) => {
        return <AssessmentAnswersItem key={answers.client_id} answers={answers} />
    })}
    </>
)
};

export default AssessmentAnswers;