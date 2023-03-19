import React from 'react';
import { useParams, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssessmentFindings from './AssessmentFindings'
import AssessmentPhases from './AssessmentPhases'

function ClientReport () {

  return (
    <>
    <h1>This is the client report</h1>
    <AssessmentFindings />
    <AssessmentPhases />
    </>
  )
}

export default ClientReport;