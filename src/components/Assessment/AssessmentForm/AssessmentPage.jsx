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
  console.log('functionsArray: ', functionsArray)
  console.log('subfunctionsArray: ', subfunctionsArray)

  return (
    <>
    {functionsArray.map((functionObject) => {
      if (Number(params.function_id) === functionObject.id) {
        return (
          <div key={functionObject.id}>
            <h4>{functionObject.name}</h4>
            {/* <AssessmentSection subfunctionsArray={subfunctionsArray}/> */}
            {subfunctionsArray.map((subfunction) => {
              return (
                <form key={subfunction.id} className="mb-5 g-3">
                  <h5>{subfunction.name}</h5>
                  <div className="col-md-10">
                    <label htmlFor="levelInput" class="form-label">Level Rating</label>
                    <p>{(subfunction.level_criteria_strong)}</p>
                    <p>{(subfunction.level_criteria_adequate)}</p>
                    <p>{(subfunction.level_criteria_weak)}</p>
                    <input type="range" className="form-range" id="levelInput" min="0" max="5" step="1"/>
                  </div>

                  <div className=" col-md-10">
                    <label htmlFor="findingsInput" className="form-label">Assessment Findings</label>
                    <input className="form-control" id="findingsInput" />
                  </div>

                  <div className=" col-md-10">
                    <label htmlFor="impactsInput" className="form-label">Impacts</label>
                    <input className="form-control" id="impactsInput" />
                  </div>

                  <div className="">
                    <label htmlFor="recommendationsInput" className="form-label">Recommendations</label>
                    <input className="form-control" id="recommendationsInput"/>
                  </div>

                  <div className="row">
                  <div className="">
                    <label htmlFor="phaseInput" className="form-label">Phase</label>
                  </div>

                  <div className="input-group row">
                    Tags
                    {tags.map((tag) => {
                      return (
                        <div key={tag.id}>
                        <input type="checkbox" className="form-check-input" id={tag.id}></input>
                        <label htmlFor={tag.id} className="form-check-label">{tag.name}</label>

                      </div>
                      )
                    })}
                    
                    {/* CHECKBOX INPUT HERE */}
                  </div>
                  </div>
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