import React, { useState } from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AssessmentEdit.css'
import Nav from '../../Nav/Nav'
import AssessmentEditRow from './AssessmentEditRow';
import AssessmentEditExpandModal from './AssessmentEditExpandModal';
import AssessmentEditModal from './AssessmentEditModal';

function AssessmentEdit() {
  const params = useParams();
  const dispatch = useDispatch();
  const assessmentAnswersById = useSelector((store) => store.assessmentAnswersById);
  const structure = useSelector((store => store.structure));
  const tags = structure.tagsReducer;
  const functionsArray = structure.functionsReducer;
  const history = useHistory();

  const [headlineInput, setHeadlineInput] = useState(assessmentAnswersById.headline_text)

  useEffect(() => {
    console.log('params', params)

    dispatch({
      type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
      payload: params.assessment_id
    })
    dispatch({
      type: 'SAGA/FETCH_ALL_TAGS',
      payload: params.assessemnt_id
    })
    // dispatch({
    //   type: 'SAGA/FETCH_FUNCTIONS_BY_BUCKET', 
    //   payload: params.bucket_id
    // });
  }, []);

  const addNewHeadline = (event) => {
    // console.log('assessment_id', assessmentAnswersById.assessment_id, 'bucket id', assessmentAnswersById.bucket_id, 'headline', headlineInput);
    dispatch({
      type: 'SAGA/POST_HEADLINE_BY_ID',
      payload: {
        assessment_id: assessmentAnswersById.assessment_id,
        bucket_id: assessmentAnswersById.bucket_id,
        headline_text: headlineInput
      }
    })
  }

  const handleSubmit = (event) => {
    addNewHeadline();
  }

  // Katie/todo: Need to do this again with the way I thought I was going to do it originally
  const evalLocation = () => {
    let newRoute = '';
    if (assessmentAnswersById.function_id < functionsArray && functionsArray.at(-1).id){
      let nextBucket = Number(assessmentAnswersById.bucket_id) + 1;
      newRoute = `/assessment-form/${assessmentAnswersById.assessment_id}/${nextBucket}`;
    } 
    if (assessmentAnswersById.function_id === functionsArray && functionsArray.at(-1).id){
      newRoute = `/dashboard`;
    }
      return newRoute;
  }

  const goToDashboard = () => {
    history.push(`/dashboard`)
  }

  console.log('assessmentAnswersById', assessmentAnswersById)

  // I'm not super attached to the <hr>'s & <br>'s in the modal, may want to change.
  return (
    <>
      <div className="container-fluid">
        <div className="container-fluid">
          {/* <Nav /> */}

            {/* <button data-bs-toggle="collapse" data-bs-target="#sidebar">Toggle Menu</button> */}
            <div className="col py-3 px-4">
              <h1>{assessmentAnswersById.company_name} {assessmentAnswersById.bucket_name} - Review & Submit</h1>
              <div className="row g-3 align-items-center">
                <div className="">
                  <label className="col-form-label-lg py-4">Headline: </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={headlineInput}
                    // placeholder={assessmentAnswersById.headline_text}
                    onChange={(event) => setHeadlineInput(event.target.value)}
                  />
                </div>
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
                      {assessmentAnswersById.map((answer) => {
                        if (answer.bucket_id == params.bucket_id) {
                          return <AssessmentEditRow answer={answer} key={answer.id}/>
                        }
                      })}
                    </tbody>
                  </table>
                  {assessmentAnswersById.map((answer) => {
                    return <AssessmentEditExpandModal answer={answer} key={answer.id} />
                  })}

                  {assessmentAnswersById.map((answer) => {
                    return <AssessmentEditModal answer={answer} key={answer.id} />
                  })}
                </div>
              </div>
            </div>
            
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <Link to={evalLocation}>
                    {/* Katie/todo: Write conditional logic to say "submit and go to next bucket/
                    submit and go back to dashboard," depending on where the button takes them. */}
                    <button type="submit" className="float-end btn btn-primary" onClick={(event) => handleSubmit(event)}>Submit</button>
                  </Link>
                  <button type="button" className="float-end btn btn-primary" onClick={goToDashboard}>Cancel</button>
                </div>
              </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default AssessmentEdit;