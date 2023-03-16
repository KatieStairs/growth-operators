import React from 'react';
import { useDispatch, useHistory } from 'react-router-dom';

function AssessmentRow({ assessment }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch({
      type: 'SAGA/GET_PRESENTATION_DATA',
      payload: assessment.id
    });
    history.push(`/presentation-prompts/${assessment.id}`);
  };
  
  return (
    <tr key={assessment.id}>
      <th scope="row">{assessment.status}</th>
      <td>{assessment.engagement_date.substring(0, 10)}</td>
      <td>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleClick}
        >Create Presentation</button>
      </td>
    </tr>
  );
}

export default AllClientsRow;