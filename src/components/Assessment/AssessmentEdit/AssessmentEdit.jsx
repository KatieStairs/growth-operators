import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AssessmentEdit.css'
import AssessmentEditRow from './AssessmentEditRow';
import AssessmentEditExpandModal from './AssessmentEditExpandModal';
import AssessmentEditModal from './AssessmentEditModal';
import AssessmentEditStatusModal from './AssessmentEditStatusModal'

function AssessmentEdit() {
  document.title = 'All Answers - Assessment Form';
  const params = useParams();
  const dispatch = useDispatch();
  const assessmentItems = useSelector((store) => store.assessmentItems);
  const answers = assessmentItems.assessmentAnswersById;
  const firstAnswer = answers[0];
  // const [headlineInput, setHeadlineInput] = useState(answers.headline_text)

  useEffect(() => {
    dispatch({type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID', payload: params.assessment_id})
    dispatch({type: 'SAGA/FETCH_ALL_TAGS', payload: params.assessemnt_id})

  }, [])

  useEffect(() => {
    if (answers) {
      console.log('Answers: ', answers)
    }
  }, [answers]);

  // const addNewHeadline = (event) => {
  //   const newHeadline = {
  //     assessment_id: Number(params.assessment_id),
  //     bucket_id: Number(params.bucket_id),
  //     headline_text: headlineInput
  //   }
  //   dispatch({type: 'SAGA/POST_HEADLINE_BY_ID', payload: newHeadline})
  // }

  if(!answers) {
    return null;
  } else {

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="container-fluid">
          <div className="container g-3 my-3">
            <h1> {answers[0]?.company_name} // Assessment Form</h1>
            <h2>Review All Answers </h2>
            <hr></hr>
          </div>
          <div className="container g-3 mb-3">
              <strong>Current Status: </strong>
              {answers[0]?.status} →
              <AssessmentEditStatusModal firstAnswer={firstAnswer}/>
            <hr></hr>
          </div>
          <div className="col py-3 px-4">
            <div className="mb-3 g-3">
              <div className="container shadow min-vh-auto py-2">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Bucket</th>
                        <th scope="col">Function</th>
                        <th scope="col">Subfunction</th>
                        <th scope="col">Level</th>
                        <th scope="col">Tag</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {answers.map((answer) => {
                        return <AssessmentEditRow answer={answer} key={answer.id}/>
                      })}
                    </tbody>
                  </table>
                  {answers.map((answer) => {
                    return <AssessmentEditExpandModal answer={answer} key={answer.id} />
                  })}

                  {answers.map((answer) => {
                    return <AssessmentEditModal answer={answer} key={answer.id} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to='/dashboard'>
                <button type="submit" className="float-end btn btn-primary">Return to Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )}
}

export default AssessmentEdit;