import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import AssessmentSection from "./AssessmentSection";

function AssessmentPage ({functionsArray}) {
  const params = useParams();
  const structure = useSelector((store => store.structure))
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
            <AssessmentSection subfunctionsArray={subfunctionsArray}/>

            
          </div>

        )
      }
    })}
    </>
    
  )
}

export default AssessmentPage;