import { React, useState } from 'react';
import { useDispatch } from 'react-redux';

function AllClientsEditModal({ client }) {
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState(client.company_name);
  const [contactName, setContactName] = useState(client.contact_name);
  const [contactEmail, setContactEmail] = useState(client.contact_email);

  const submitEdits = (event) => {
    event.preventDefault();
    dispatch({
      type: "SAGA/PUT_CLIENT_INFO_BY_ID",
      payload: {
        id: client.id,
        company_name: companyName,
        contact_name: contactName,
        contact_email: contactEmail
      }
    });
    setTimeout(function(){window.location.reload();},100);
  };

  return (
    <div
    className="modal fade"
    key={`${client.id}`}
    id={`editModal${client.id}`}
    tabIndex="-1"
    role="dialog"
    aria-labelledby={`editModal${client.id}Label`}
    aria-hidden="true">
      <div
      className="modal-dialog"
      role="document">
        <div
        className="modal-content">
          <div
          className="modal-header">
            <h5
            className="modal-title"
            id={`editModal${client.id}Label`}
            >Edit Client Info</h5>
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
            <div className="mb-3">
              <label
              htmlFor={`editForm${client.id}ControlInput1`}
              className="form-label"
              >Company Name</label>
              <input
              type="text"
              className="form-control"
              id={`editForm${client.id}ControlInput1`}
              placeholder={client.company_name}
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}/>
            </div>
            <div className="mb-3">
              <label
              htmlFor={`editForm${client.id}ControlInput2`}
              className="form-label"
              >Contact Name</label>
              <input
              type="text"
              className="form-control"
              id={`editForm${client.id}ControlInput2`}
              placeholder={client.contact_name}
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}/>
            </div>
            <div className="mb-3">
              <label
              htmlFor={`editForm${client.id}ControlInput3`}
              className="form-label"
              >Contact Email</label>
              <input
              type="email"
              className="form-control"
              id={`editForm${client.id}ControlInput3`}
              placeholder={client.contact_email}
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}/>
            </div>
          </div>
          <div
          className="modal-footer">
            <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            >Close</button>
            <button
            type="button"
            className="btn btn-secondary"
            onClick={submitEdits}
            data-bs-dismiss="modal"
            >Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClientsEditModal;