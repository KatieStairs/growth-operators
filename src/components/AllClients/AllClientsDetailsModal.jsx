import React from 'react';

function AllClientsDetailsModal({ client }) {
  return (
    <div
    className="modal fade"
    key={`${client.id}`}
    id={`detailsModal${client.id}`}
    tabIndex="-1"
    role="dialog"
    aria-labelledby={`detailsModal${client.id}Label`}
    aria-hidden="true">
      <div
      className="modal-dialog"
      role="document">
        <div
        className="modal-content">
          <div
          className="modal-header">
            <h3
            className="modal-title"
            id={`detailsModal${client.id}Label`}
            >{client.company_name}</h3>
            <button
            type="button"
            className="btn close"
            data-bs-dismiss="modal"
            aria-label="Close">
              <span
              aria-hidden="true"
              >&times;</span>
            </button>
          </div>
          <div
          className="modal-body">
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3">Contact: {client.contact_name}</h5>
                <h5>Email: {client.contact_email}</h5>
              </div>
            </div>
          </div>
          <div
          className="modal-footer">
            <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClientsDetailsModal;