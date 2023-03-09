import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

function AllClients() {
  const clients = useSelector((store) => store.client.allClients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SAGA/GET_ALL_CLIENTS' })
  }, []);

  return (
    <>
    <div className="container">

    </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Client Name</th>
            <th scope="col">Contact Name</th>
            <th scope="col">Contact Email</th>
            <th scope="col">Archive</th>
            <th scope="col">See Details</th>
            <th scope="col">Edit</th> {/*Modal?*/}
            <th scope="col">Delete</th> {/*Popup confirmation*/}
          </tr>
        </thead>
        <tbody>
        {clients.map(client => {
          return (
            <tr key={client.id}>
              <th scope="row">{client.company_name}</th>
              <td>{client.contact_name}</td>
              <td>{client.contact_email}</td>
              <td><button>Archive</button></td>
              <td><button>See Details</button></td>
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </>
  );
}

export default AllClients;