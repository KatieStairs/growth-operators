import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AllClientsRow({ client }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleArchive= () => {
    dispatch({
      type: 'SAGA/PUT_CLIENT_STATUS_BY_ID',
      payload: client.id});
  }
  
  return (
    <tr key={client.id}>
      <th scope="row">{client.company_name}</th>
      <td>{client.engagement_date.substring(0, 10)}</td>
      <td>{client.status}</td>
      <td>{client.operators}</td>
      <td>
        <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#detailsModal${client.id}`}
        >See Contact Details</button>
      </td>
      <td>
        <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${client.id}`}
        >Edit Contact Details</button>
      </td>
      <td>
        {client.status !== 'Archived'
        ? <button type="button" className="btn btn-primary" onClick={handleArchive}>Archive</button>
        // onClick={() => history.push(`/client-overview/${client.id}`)}
        : <button type="button" className="btn btn-primary" disabled >Archive</button>
        }
      </td>
      <td>
        <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#delete${client.id}ConfirmModal`}
        >Delete</button>
      </td>
    </tr>
  );
}

export default AllClientsRow;