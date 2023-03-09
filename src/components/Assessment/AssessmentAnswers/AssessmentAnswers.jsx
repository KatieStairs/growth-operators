import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentAnswersItem from './AssessmentAnswersItem'

function AssessmentAnswers() {
    const dispatch = useDispatch();
    const assessmentAnswersList = useSelector(store => store.assessmentAnswersList);

    useEffect(() => {
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS'
        })
    }, []);

    console.log('***********', assessmentAnswersList)

  return (
    <>
    <h1>Test Corp Assessment Answers</h1>
    <h4>Bucket Function Subfunction Level Phase Tags</h4>
    <div>
        {assessmentAnswersList.map((answers) => {
                return <AssessmentAnswersItem key={answers.assessment_id} answers={answers}/>
            })}
    </div>
    </>
)
};

export default AssessmentAnswers;