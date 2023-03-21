import React from 'react';

function AllClientsRow({ client }) {
  return (
    <tr key={client.id}>
      <th scope="row">{client.company_name}</th>
      <td>{client.engagement_date.substring(0, 10)}</td>
      <td>
      <button
        type="button"
        className="btn btn-link"
        data-bs-toggle="modal"
        data-bs-target={`#editStatusModal${client.id}`}
        >{client.status}</button>
        </td>
      <td>{client.operators}</td>
      <td>{client.contact_name}
      </td>
      <td>
        <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${client.id}`}
        >Edit Contact Details</button>
      </td>
      <td>
        <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target={`#delete${client.id}ConfirmModal`}
        >Delete</button>
      </td>
    </tr>
  );
}

export default AllClientsRow;