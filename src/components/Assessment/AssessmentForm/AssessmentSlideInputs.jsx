import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useLocation } from "react-router-dom";

function AssessmentEndInputs () {
  const dispatch = useDispatch();
  const [nextSteps, setNextSteps] = useState('');
  const [futureState, setFutureState] = useState('');
  const params = useParams();

  const handleSave = () => {
    event.preventDefault;
    let slideTextInputs = {
      assessment_id: params.assessment_id,
      next_steps: nextSteps,
      future_state: futureState
    }

    console.log('slideTextInputs: ', slideTextInputs)

    dispatch({
      type: 'SAGA/POST_ASSESSMENT_SLIDE_INPUTS',
      payload: slideTextInputs
    })
  }

  return (
    <div className="container g-3 mt-5">
      <h1>Test Company Assessment Form </h1>
      <h2>Final Thoughts</h2>
      <form>
        <div className="col-md-10 mt-3">
          <label htmlFor="nextStepsInput" className="form-label"><h3>Next Steps</h3></label>
          <textarea 
            type="text" 
            className="form-control" 
            name="nextStepsInput"
            rows="5"
            placeholder="Anything written here will show up on the 'Next Steps' presentation slide."
            onChange={(event) => setNextSteps(event.target.value)}
          />
        </div>
        <div className="col-md-10 mt-5 mb-4">
          <label htmlFor="futureStateInput" className="form-label"><h3>Future State</h3></label>
          <textarea 
            type="text" 
            className="form-control" 
            name="futureStateInput"
            rows="5"
            placeholder="Anything written here will show up on the 'Future is Bright' presentation slide."
            onChange={(event) => setFutureState(event.target.value)}
          />
        </div>
        <hr className="mb-4"></hr>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
          <Link to="/dashboard">
            <button className="btn btn-primary">Cancel</button>
          </Link>
          <Link to={`/assessment-edit/${params.assessment_id}`}>
            <button className="btn btn-primary" onClick={() => handleSave()}>Continue</button>
          </Link>
        </div>
        <div className="d-grid g-2 d-md-flex justify-content-md-end">
          {/* <Link to="/dashboard"> */}
            <button className="btn btn-link" type="submit" onClick={() => handleSave()}>Save for Later</button>
          {/* </Link> */}
        </div>
      </form>
    </div >
  )
}

export default AssessmentEndInputs