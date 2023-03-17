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
  const [dataLoaded, setDataLoaded] = useState(false);
  const assessmentItems = useSelector((store) => store.assessmentItems);
  const assessmentAnswersById = assessmentItems.assessmentAnswersById;
  const structure = useSelector((store => store.structure));
  const tags = structure.tagsReducer;
  const functionsArray = structure.functionsReducer;
  const history = useHistory();
 

  const [headlineInput, setHeadlineInput] = useState(assessmentAnswersById.headline_text)

  useEffect(() => {
    // const companyName = structure[0].company_name;
    setStage();
  }, [dataLoaded]);

 function setStage(){
    dispatch({
      type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
      payload: params.assessment_id
    })
    dispatch({
      type: 'SAGA/FETCH_ALL_TAGS',
      payload: params.assessemnt_id
    })
    setDataLoaded(true)
  }

  const addNewHeadline = (event) => {
    dispatch({
      type: 'SAGA/POST_HEADLINE_BY_ID',
      payload: {
        assessment_id: params.assessment_id,
        bucket_id: params.bucket_id,
        headline_text: headlineInput
      }
    })
  }

  const goToDashboard = () => {
    history.push(`/dashboard`)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container-fluid">
          {/* <Nav /> */}

            {/* <button data-bs-toggle="collapse" data-bs-target="#sidebar">Toggle Menu</button> */}
            <div className="col py-3 px-4 mb-5">
              <h1></h1>
            <hr className="mt-5"></hr>
              <div className="container shadow min-vh-auto py-2 mt-5">
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
                        return <AssessmentEditRow answer={answer} key={answer.id}/>
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
                  <Link to={'/dashboard'}>
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