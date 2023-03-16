import React from 'react';
import { useSelector} from 'react-redux';
import AllClientsRow from './AllClientsRow';
import AllClientsEditModal from './AllClientsEditModal';
import AllClientsDeleteModal from './AllClientsDeleteModal';
import AllClientsDetailsModal from './AllClientsDetailsModal';

function AllClients() {
  const clients = useSelector((store) => store.client.allClients);

  return (
    <div className="container-fluid">
    <div className="container-fluid text-center">
      <h1>All Clients</h1>
    </div>
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
      {clients.map((client) => {
        return <AllClientsDetailsModal key={client.id} client={client}/>
      })}
    </div>
  );
}

export default AllClients;