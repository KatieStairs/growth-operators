import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

function AssessmentPage ({functionsArray}) {

  return (
    <>
    {functionsArray.map((functionObject) => {
      return (
        <h4 key={functionObject.id}>{functionObject.name}</h4>
      )
    })}
    </>
    
  )
}

export default AssessmentPage;