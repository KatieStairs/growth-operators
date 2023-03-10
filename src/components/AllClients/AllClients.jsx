import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function AllClients() {
  const clients = useSelector((store) => store.client.allClients);
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [dispatch]);

  return (
    <div className="container-fluid">
    <div className="container-fluid text-center">
      <h2>All Clients</h2>
    </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Engagement Start</th>
            <th scope="col">Status</th>
            <th scope="col">Operators</th>
            <th scope="col">Archive</th>
            <th scope="col">See Details</th>
            <th scope="col">Edit</th>{/*Modal?*/}
            <th scope="col">Delete</th>{/*Popup confirmation*/}
          </tr>
        </thead>
        <tbody>
        {clients.map((client) => {
          return (
            <tr key={client.id}>
              <th scope="row">{client.company_name}</th>
              <td>{client.engagement_date.substring(0, 10)}</td>
              <td>Status</td>
              <td>{client.operators}</td>
              <td><button
              type="button"
              className="btn btn-secondary"
              >Archive</button></td>
              <td><button
              type="button"
              className="btn btn-secondary"
              >See Details</button></td>
              <td><button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target={`#editModal${client.id}`}
              >Edit</button></td>
              <td><button
              type="button"
              className="btn btn-secondary"
              >Delete</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      {clients.map((client) =>{
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
                  >Modal title</h5>
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
                  ...
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
                  >Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default AllClients;