import React from 'react';
import { useHistory } from 'react-router-dom';

function AllClientsRow({ client }) {
  const history = useHistory();
  
  return (
    <tr key={client.id}>
      <th scope="row">{client.company_name}</th>
      <td>{client.engagement_date.substring(0, 10)}</td>
      <td>Status</td>
      <td>{client.operators}</td>
      <td>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/client-overview/${client.id}`)}
        >See Overview</button>
      </td>
      <td>
        <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#detailsModal${client.id}`}
        >See Details</button>
      </td>
      <td>
        <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${client.id}`}
        >Edit</button>
      </td>
      <td>
        <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#delete${client.id}ConfirmModal`}
        >Delete</button>
      </td>
    </tr>
  );
}

export default AllClientsRow;