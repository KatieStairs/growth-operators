import React from 'react';

function AllClientsRow({ client }) {
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
        >Archive</button>
      </td>
      <td>
        <button
        type="button"
        className="btn btn-secondary"
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
        >Delete</button>
      </td>
    </tr>
  );
}

export default AllClientsRow;