import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function AssessmentEditStatusModal ({firstAnswer}) {
  const params = useParams();
  const dispatch = useDispatch();
  const [statusInput, setStatusInput] = useState(firstAnswer?.status || '')

  const updateAssessmentStatus = () => {
    const statusUpdateData = {status: statusInput, id: params.assessment_id}
    dispatch({type: 'SAGA/UPDATE_ASSESSMENT_STATUS_BY_ID', payload: statusUpdateData})
  };

  return (
    <>
    <div>
      <button className="btn btn-link" data-bs-toggle="modal" data-bs-target={`#edit-assessment-status-modal-${params.assessment_id}`}>
        Click to Change
      </button>
    </div>

    <div 
      className="modal fade" 
      key={`${params.assessment_id}`}
      id={`edit-assessment-status-modal-${params.assessment_id}`} 
      tabIndex="-1" 
      role="dialog"
      aria-labelledby={`edit-assessment-status-modal-${params.assessment_id}-label`} 
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`edit-assessment-status-modal-${params.assessment_id}-label`}>Edit Assessment Status</h5>
            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor={`edit-assessment-status-modal-${params.assessment_id}`} className="form-label">
                <h5>Status</h5>
              </label>
              <select 
                className="form-select" 
                id={`edit-assessment-status-modal-${params.assessment_id}`} 
                aria-label="Default select example"
                onChange={(event)=> setStatusInput(event.target.value)}
              >
                <option selected>Select one:</option>
                <option value='Not Yet Started'>Not Yet Started</option>
                <option value='Edit in Progress'>Edit in Progress</option>
                <option value='Active'>Active</option>
                <option value='Archived'>Archived</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateAssessmentStatus}>Submit</button>
          </div> 
        </div>
      </div>
    </div>
    </>
  )
}

export default AssessmentEditStatusModal