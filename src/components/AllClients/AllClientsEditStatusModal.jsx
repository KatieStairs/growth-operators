import { React, useState } from 'react';
import { useDispatch } from 'react-redux';

function AllClientsEditStatusModal({ client }) {
  const dispatch = useDispatch();
  const [statusInput, setStatusInput] = useState(client.status)

  const updateAssessmentStatus = () => {
    const statusUpdateData = {status: statusInput, id: client.assessment_id}
    dispatch({type: 'SAGA/UPDATE_ASSESSMENT_STATUS_BY_ID', payload: statusUpdateData})
  };

  return (
    <>
    <div 
      className="modal fade" 
      key={`${client.assessment_id}`}
      id={`editStatusModal${client.id}`} 
      tabIndex="-1" 
      role="dialog"
      aria-labelledby={`editStatusModal${client.id}-label`} 
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`editStatusModal${client.id}-label`}>Edit Client Assessment Status</h5>
            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor={`editStatusModal${client.id}-input`} className="form-label">
                <h5>Status</h5>
              </label>
              <select 
                className="form-select" 
                id={`editStatusModal${client.id}-input`} 
                aria-label="Default select example"
                onChange={(event)=> setStatusInput(event.target.value)}
              >
                <option defaultValue>Select one:</option>
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
  );
};

export default AllClientsEditStatusModal;