import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import AssessmentSection from "./AssessmentSection";

function AssessmentPage ({functionsArray}) {
  const params = useParams();
  const structure = useSelector((store => store.structure))
  const tags = structure.tagsReducer;
  const subfunctionsArray = structure.subfunctionsReducer;

  console.log('Params: ', Number(params.function_id))
  console.log('functionsArray: ', functionsArray.length)
  console.log('subfunctionsArray: ', subfunctionsArray)
  // console.log('functionsArray: ', functionsArray[9].function_index)

  return (
    <>
    {functionsArray.map((functionObject) => {
      console.log('Function Object: ', functionObject);
      if (Number(params.function_id) === functionObject.id) {
        return (
          <div key={functionObject.id}>
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={functionObject.function_index} aria-valuemin="0" aria-valuemax={functionsArray.length}>
              <div className="progress-bar w-75"></div>
            </div>
            <h3>{functionObject.name}</h3>

            {/* <AssessmentSection subfunctionsArray={subfunctionsArray}/> */}
            {subfunctionsArray.map((subfunction) => {
              return (
                <form key={subfunction.id} className="mb-5 ">
                  <h4>{subfunction.name}</h4>
                  <div className="col-md-10 mb-3">
                    <label htmlFor="levelInput" className="form-label"><h6>Level Rating</h6></label>
                    <ul>
                      <li>{(subfunction.level_criteria_strong)}</li>
                      <li>{(subfunction.level_criteria_adequate)}</li>
                      <li>{(subfunction.level_criteria_weak)}</li>
                    </ul>
                    <input type="range" className="form-range" id="levelInput" min="0" max="5" step="1"/>
                  </div>

                  <div className="col-md-10 mb-3">
                    <label htmlFor="findingsInput" className="form-label"><h6>Assessment Findings</h6></label>
                    <input type="text" className="form-control" id="findingsInput" />
                  </div>

                  <div className="col-md-10 mb-3">
                    <label htmlFor="impactsInput" className="form-label"><h6>Impacts</h6></label>
                    <input type="text" className="form-control" id="impactsInput" />
                  </div>
                  <div className="row mb-3">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="recommendationsInput" className="form-label"><h6>Recommendations</h6></label>
                    <input type="text" className="form-control" id="recommendationsInput"/>
                  </div>

                  
                  <div className="col mb-3">
                    <label htmlFor="phaseInput" className="form-label"><h6>Phase</h6></label>
                    <input type="text" className="form-control" id="phaseInput"/>
                  </div>

                  <div className="col mb-3">
                    <h6>Tags</h6>
                    {tags.map((tag) => {
                      return (
                        <div key={tag.id} className="g-3">
                        <input type="checkbox" className="form-check-input" data-id={tag.id}></input>
                        <label htmlFor={tag.id} className="form-check-label"> {tag.name}</label>

                      </div>
                      )
                    })}
                    
                    {/* CHECKBOX INPUT HERE */}
                  </div>
                  </div>
                  <hr></hr>
                </form>
              )
            })}
          </div>
        )
      }
    })}
    </>
    
  )
}

export default AssessmentPage;