import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

function AssessmentSection ({subfunctionsArray}) {
  const structure = useSelector((store => store.structure))
  const tags = structure.tagsReducer;
  console.log('{subfunctionsArray}: ', subfunctionsArray);

  return (
    <>
    <div>
      {subfunctionsArray.map((subfunction) => {
        return (
          <div key={subfunction.id}>
          <h5>{subfunction.name}</h5>
          <div>
            <h6>Level Rating</h6>
            <p>{(subfunction.level_criteria_strong)}</p>
            <p>{(subfunction.level_criteria_adequate)}</p>
            <p>{(subfunction.level_criteria_weak)}</p>
            {/* LEVEL SCALE GOES HERE */}
          </div>

          <div>
            <h6>Assessment Findings</h6>
            {/* TEXT INPUT HERE */}
          </div>

          <div>
            <h6>Impacts</h6>
            {/* TEXT INPUT HERE */}
          </div>

          <div>
            <h6>Recommendations</h6>
            {/* TEXT INPUT HERE */}
          </div>

          <div>
            <h6>Phase</h6>
            {/* DROPDOWN INPUT HERE */}
          </div>

          <div>
            <h6>Tags</h6>
            <ul>
            {tags.map((tag) => {
              return <li key={tag.id}>{tag.name}</li>
            })}
            </ul>
            {/* CHECKBOX INPUT HERE */}
          </div>
          
          </div>
        )
      })}
    </div>
    </>
  )
}

export default AssessmentSection;