import React from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../../../Nav/Nav'
import AssessmentReviewPage from './AssessmentReviewPage';

function AssessmentReview() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const assessmentItems = useSelector((store) => store.assessmentItems);
  const answers = assessmentItems.assessmentAnswersById;

  const structure = useSelector((store => store.structure))
  const bucketsArray = structure.bucketsReducer;
  const functionsArray = structure.functionsReducer;

  useEffect(() => {
    dispatch({type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', payload: params.assessment_id})
    dispatch({type: 'SAGA/GET_BUCKET_HEADLINES_BY_ASSESSMENT_ID', payload: params.assessment_id})
    dispatch({type: 'SAGA/FETCH_ALL_TAGS'})
    dispatch({type: 'SAGA/FETCH_FUNCTIONS_BY_BUCKET', payload: params.bucket_id});
  }, []);

  useEffect(() => {
    if (answers) {
      console.log('Answers: ', answers)
    }
  },[answers, bucketsArray, functionsArray])

  const evalNextAssessmentPage = () => {
    if (params.bucket_id === bucketsArray.at(-1).id){
      history.push(`/dashboard`);
    } 
    else {
      const nextBucket = Number(params.bucket_id) + 1;
      const nextFunction = (functionsArray.at(-1).id) + 1;
      history.push(`/assessment-form/${params.assessment_id}/${nextBucket}/${nextFunction}`);
    }
  }

  const evalBucket = (element) => {
    return Number(params.bucket_id) === element.bucket_id 
  }

  if(!answers && !bucketsArray && !functionsArray) {
    return null;
  }

  return (
    <>
    {answers.some(evalBucket) &&
      <div key={answers[0].id} className="container g-3 mt-3">
        <h1>{answers[0].company_name} // Assessment Form</h1>
        <h2>Review Submission → {answers[0].bucket_name}</h2>
        <AssessmentReviewPage answers={answers}/>
      </div>
    }
    <div className="container">
      <div className="row">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
          <Link to="/dashboard">
            <button type="button" className="float-end g-3 btn btn-outline-primary">Cancel</button>
          </Link>
          <button type="button" className="float-end g-3 btn btn-primary" onClick={() => evalNextAssessmentPage()}>Continue</button>
        </div>
        <div className="d-grid g-2 d-md-flex justify-content-md-end">
          <Link to="/dashboard">
            <button className="btn btn-link" type="submit">Return to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default AssessmentReview;