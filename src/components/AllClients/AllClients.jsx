import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllClientsRow from './AllClientsRow';
import AllClientsEditModal from './AllClientsEditModal';
import AllClientsDeleteModal from './AllClientsDeleteModal';
import AllClientsDetailsModal from './AllClientsDetailsModal';

function AllClients() {
  document.title = 'All Clients & Assessments';
  const dispatch = useDispatch();
  const clients = useSelector((store) => store.client.allClients);

  useEffect(() => {
    dispatch({type: 'SAGA/GET_ALL_CLIENTS'})
  }, [])

  useEffect(() => {
    if (clients) {
      console.log('clients: ', clients)
    }
  }, [clients]);

  if(!clients) {
    return null;
  } else {

  return (
    <div className="container-fluid">
    <div className="container-fluid">
      <div className="container g-3 mt-3">
      <h1>All Clients & Assessments</h1>
      </div>

    <div className="col py-3 px-4">
      <div className="mb-5 mt-5 g-3">
        <div className="container shadow min-vh-auto py-2 mt-3">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">Engagement Start</th>
            <th scope="col">Status</th>
            <th scope="col">Operators</th>
            <th scope="col">See Contact Details</th>
            <th scope="col">Edit Contact Details</th>
            <th scope="col">Archive</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        {clients.map((client) => {
          return <AllClientsRow key={client.assessment_id} client={client}/>
        })}
        </tbody>
      </table>
      </div>
      </div>
    </div>
      {clients.map((client) => {
        return <AllClientsEditModal key={client.assessment_id} client={client}/>
      })}
      {clients.map((client) => {
        return <AllClientsDeleteModal key={client.assessment_id} client={client}/>
      })}
      {clients.map((client) => {
        return <AllClientsDetailsModal key={client.assessment_id} client={client}/>
      })}
    </div>
    </div>
  );
}
}

export default AllClients;