import React, { useState } from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../../../Nav/Nav'
import AssessmentReviewRow from './AssessmentReviewRow';
import AssessmentEditExpandModal from '../../AssessmentEdit/AssessmentEditExpandModal';
import AssessmentEditModal from '../../AssessmentEdit/AssessmentEditModal';

function AssessmentReviewPage ({answers}) {
  const params = useParams();
  const dispatch = useDispatch();
  const structure = useSelector((store => store.structure))
  const bucketsArray = structure.bucketsReducer;
  const assessmentItems = useSelector((store) => store.assessmentItems);
  // const headlines = assessmentItems.headlinesReducer;

  const [headlineInput, setHeadlineInput] = useState(answers.headline_text)

  const addNewHeadline = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SAGA/POST_HEADLINE_BY_ID',
      payload: {
        assessment_id: params.assessment_id,
        bucket_id: params.bucket_id,
        headline_text: headlineInput
      }
    })
  }

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="container-fluid">
          {/* <Nav /> */}
            {/* <button data-bs-toggle="collapse" data-bs-target="#sidebar">Toggle Menu</button> */}
            <div className="col py-3 px-4">
              <div className="mb-5 mt-5 g-3 input-group">
                <span className="input-group-text" id="inputGroup-sizing-default">Headline</span>
                <input 
                  type="text" 
                  className="form-control" 
                  value={headlineInput}
                  // placeholder={answers.headline_text}
                  onChange={(event) => setHeadlineInput(event.target.value)}
                />
                <button type="submit" className="float-end btn btn-primary" onClick={(event) => addNewHeadline(event)}>Submit</button>
              </div>
              <div className="container shadow min-vh-auto py-2 mt-3">
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {answers.map((answer) => {
                        if (answer.bucket_id == params.bucket_id) {
                          return <AssessmentReviewRow answer={answer} key={answer.id}/>
                        }
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
    </>
  )
}

export default AssessmentReviewPage;