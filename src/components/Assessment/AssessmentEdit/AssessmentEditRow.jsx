import React from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';

function AssessmentEditRow ({answer}) {
  const history = useHistory();
  
  const goToOverviewPage = () => {
    history.push(`/client-overview/${answer.client_id}`)
  }
  
  return (
    <>
    <tr>
      <td>{answer.bucket_index}.{answer.function_index}.{answer.subfunction_index}</td>
      <td>{answer.bucket_name || ''}</td>
      <td>{answer.function_name || ''}</td>
      <td>{answer.subfunction_name || ''}</td>
      <td>{answer.level_rating || ''}</td>
      <td>{answer.tag_name || ''}</td>
      <td>
          <button 
            type="button" 
            className="btn btn-primary"
            data-bs-toggle="modal" 
            data-bs-target={`#expanded-assessment-modal-${answer.id}`} 
          >Expand</button>
      </td>
      <td>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={goToOverviewPage}
        >See Overview</button>
      </td>
      <td>
        <button 
          type="button" 
          className="btn btn-primary"
          data-bs-toggle="modal" 
          data-bs-target={`#edit-assessment-modal-${answer.id}`} 
        >Edit</button>
      </td>
    </tr>
    </>
  )
}

export default AssessmentEditRow;