import { React, useState } from 'react';
import { useDispatch } from 'react-redux';

function AllClientsDeleteModal({ client }) {
  const dispatch = useDispatch();

  const deleteClient = () => {
    dispatch({
      type: "SAGA/DELETE_CLIENT_BY_ID",
      payload: client.id
    });
  };

  return (
    <div
      className="modal fade"
      id={`delete${client.id}ConfirmModal`}
      tabIndex="-1"
      aria-labelledby={`delete${client.id}ConfirmModalLabel`}
      aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
              className="modal-title"
              id={`delete${client.id}ConfirmModalLabel`}
              >Are you sure you want to delete this client?</h5>
              <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            This action will permanently delete all client data, and cannot be undone.
            </div>
            <div className="modal-footer">
              <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              >Cancel</button>
              <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={deleteClient}
              >Delete Client</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AllClientsDeleteModal;