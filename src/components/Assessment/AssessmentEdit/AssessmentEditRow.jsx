import React from 'react';
import { useSelector } from 'react-redux';

function AssessmentEditRow ({answer}) {
  const structure = useSelector((store => store.structure))
  const tags = structure.tagsReducer;
  
  return (
    <>
    <tr>
      <td>{answer.bucket_index}.{answer.function_index}.{answer.subfunction_index}</td>
      <td>{answer.bucket_name || ''}</td>
      <td>{answer.function_name || ''}</td>
      <td>{answer.subfunction_name || ''}</td>
      <td>{answer.level_rating || ''}</td>
      <td>
        {tags.map((tag) => {
          if (tag.id === answer.tag_id){
            return tag.name;
          }
        })}
      </td>
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
          data-bs-toggle="modal" 
          data-bs-target={`#edit-assessment-modal-${answer.id}`} 
        >Edit</button>
      </td>
    </tr>
    </>
  )
}

export default AssessmentEditRow;