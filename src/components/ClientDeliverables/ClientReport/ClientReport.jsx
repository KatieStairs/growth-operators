import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssessmentFindings from './AssessmentFindings'
import AssessmentPhases from './AssessmentPhases'

function ClientReport () {
  document.title = 'Client Report'
  const params = useParams();
  const dispatch = useDispatch();
  const assessmentItems = useSelector((store) => store.assessmentItems);
  const answers = assessmentItems.assessmentAnswersById;

  // The dispatches need to have payload: params.assessment_id, 
  // or something else that works not payload: 1
  useEffect(() => {
    dispatch({type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', payload: 1})
    dispatch({type: 'SAGA/FETCH_ALL_TAGS', payload: 1})
  }, [])

  useEffect(() => {
    if (answers) {
      console.log('Answers: ', answers)
    }
  }, [answers]);

  if(!answers) {
    return null;
  } else {

  return (
    <>
    {answers.map((answer) => {
      return <AssessmentFindings answer={answer} key={answer.id}/>
    })}
    {answers.map((answer) => {
      return <AssessmentPhases answer={answer} key={answer.id}/>
    })}
    </>
  )
}
}

export default ClientReport;