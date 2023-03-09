import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

function AssessmentSection () {
  // const dispatch = useDispatch();
  // const params = useParams();
  const structures = useSelector((store => store.structure))

  console.log('Structures: ', structures);
  console.log('Structures.subfunctionsReducer: ', structures.subfunctionsReducer);

  return (
    <>
    <div>
      <h1> Test Company Assessment Form </h1>
      <h2> {structures?.subfunctionsReducer[0].bucket_name} </h2>
    </div>
    <div>
      <h3>{structures?.subfunctionsReducer[0].function_name}</h3>
    </div>
    <div>
      {structures?.subfunctionsReducer.map((subfunction) => {
        return (
          <>
          <h4>{subfunction.name}</h4>
          <h5>Level Rating:</h5>
          {/* RATING SCALE GOES HERE */}
          <p>{subfunction.level_rating_criteria}</p>

          <h5>Assessment Findings:</h5>
          {/* TEXT INPUT HERE */}

          <h5>Impact:</h5>
          {/* TEXT INPUT HERE */}

          <h5>Recommendations:</h5>
          {/* TEXT INPUT HERE */}

          <h5>Phase:</h5>
          {/* DROPDOWN INPUT HERE */}

          <h5>Tags:</h5>
          <ul>
          {structures?.tagReducer.map((tag) => {
            return (

                <li>{tag.name}</li>

            )
          })}
          </ul>
          {/* CHECKLIST INPUT HERE */}
          </>

        )
      })}
      <h4></h4>
    </div>
    </>
  )
}

export default AssessmentSection;