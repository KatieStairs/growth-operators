import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useRouteMatch, Route, Switch, Link, BrowserRouter, useLocation } from "react-router-dom";

import AssessmentPage from "./AssessmentPage";

function AssessmentForm () {
  document.title = 'Assessment Form';
  const dispatch = useDispatch();
  const params = useParams();
  const structure = useSelector((store => store.structure))
  const bucketsArray = structure.bucketsReducer;
  const functionsArray = structure.functionsReducer;

  useEffect(() => {   
    dispatch({type: 'SAGA/FETCH_ALL_TAGS'});
    dispatch({type: 'SAGA/FETCH_ALL_BUCKETS'});
    dispatch({type: 'SAGA/FETCH_FUNCTIONS_BY_BUCKET', payload: params.bucket_id});
    dispatch({type: 'SAGA/FETCH_SUBFUNCTIONS_BY_FUNCTION', payload: params.function_id});
  }, [])

  return (
    <>

    {bucketsArray.map((bucket) => {
      if (Number(params.bucket_id) === bucket.id) {
        return (
          <div key={bucket.id} className="container g-3 mt-3">
            <h1> Test Company Assessment Form </h1>
            <h2>{bucket.name}</h2>
            <AssessmentPage functionsArray={functionsArray}/>
          </div>

        )
      }
    })}
    </>
  )
}

export default AssessmentForm;