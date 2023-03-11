import React from 'react';
import { useSelector } from 'react-redux';
import AllClientsRow from './AllClientsRow';
import AllClientsEditModal from './AllClientsEditModal';
import AllClientsDeleteModal from './AllClientsDeleteModal';

function AllClients() {
  const clients = useSelector((store) => store.client.allClients);

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
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>{/*Popup confirmation*/}
          </tr>
        </thead>
        <tbody>
        {clients.map((client) => {
          return <AllClientsRow key={client.id} client={client}/>
        })}
        </tbody>
      </table>
      {clients.map((client) => {
        return <AllClientsEditModal key={client.id} client={client}/>
      })}
      {clients.map((client) => {
        return <AllClientsDeleteModal key={client.id} client={client}/>
      })}
    </div>
  );
}

export default AllClients;