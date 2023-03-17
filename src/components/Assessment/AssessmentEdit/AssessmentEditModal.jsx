import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link} from 'react-router-dom';

function AssessmentEditModal ({answer}) {
  const params = useParams();
  const dispatch = useDispatch();
  const structure = useSelector((store => store.structure));
  const tags = structure.tagsReducer;

  const [levelRatingInput, setLevelRatingInput] = useState(answer.level_rating || '')
  const [tagsInput, setTagsInput] = useState(answer.tags || '')
  const [phaseInput, setPhaseInput] = useState(answer.phase || '')
  const [findingsInput, setFindingsInput] = useState(answer.findings || '')
  const [impactInput, setImpactInput] = useState(answer.impact || '')
  const [recommendationsInput, setRecommendationsInput] = useState(answer.recommendations || '')
  


  const updateAssessmentAnswers = (event) => {
    event.preventDefault();

    const updatedAssessmentAnswers = {
      assessment_id: params.assessment_id,
      bucket_id: answer.bucket_id,
      function_id: answer.function_id,
      subfunction_id: answer.subfunction_id,
      level_rating: Number(levelRatingInput),
      phase: Number(phaseInput),
      tags_id: Number(tagsInput),
      findings: findingsInput,
      impact: impactInput,
      recommendations: recommendationsInput
    }

    dispatch({
      type: 'SAGA/UPDATE_ASSESSMENT_BY_ID',
      payload: updatedAssessmentAnswers
    })
  };

  return (
    <>
    <div 
      className="modal fade" 
      key={`${answer.id}`}
      id={`edit-assessment-modal-${answer.id}`} 
      tabIndex="-1" 
      role="dialog"
      aria-labelledby={`edit-assessment-modal-${answer.id}-label`} 
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`edit-assessment-modal-${answer.id}-label`}>Edit Assessment</h5>
            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label
              htmlFor={`edit-assessment-modal-${answer.id}-control-level-input`}
              className="form-label"
              ><h5>Level</h5>
              </label>
              <input 
                type='number'
                className="form-control"
                id={`edit-assessment-modal-${answer.id}-control-level-input`} 
                value={levelRatingInput}
                placeholder={answer.level_rating}
                onChange={(evt) => setLevelRatingInput(evt.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
              htmlFor={`edit-assessment-modal-${answer.id}-control-phase-input`}
              className="form-label"
              ><h5>Phase</h5>
              </label>
              <input 
                type='number'
                className="form-control"
                id={`edit-assessment-modal-${answer.id}-control-phase-input`} 
                value={phaseInput}
                placeholder={answer.phase}
                onChange={(evt) => setPhaseInput(evt.target.value)}
              />
            </div>
            <div className="mb-3">
              <hr></hr>
              <label
                htmlFor={`edit-assessment-modal-${answer.id}-control-tag-input`} 
                className="form-label"
              >
                <h5>Tags</h5>
              </label>
              {tags.map((tag) => {
                return (
                <div key={tag.id} className="g-3">
                  {tag.id === answer.tag_id
                  ?
                  <input 
                  type="radio" 
                  className="form-check-input" 
                  id={`edit-assessment-modal-${answer.id}-control-tag-input-${tag.id}`} 
                  value={tagsInput} 
                  placeholder={answer.tag_id}
                  onChange={(evt) => setTagsInput(evt.target.value)}
                  checked
                  />
                  :
                  <input 
                    type="radio" 
                    className="form-check-input" 
                    id={`edit-assessment-modal-${answer.id}-control-tag-input-${tag.id}`} 
                    value={tagsInput} 
                    placeholder={answer.tag_id}
                    onChange={(evt) => setTagsInput(evt.target.value)}
                  />
                  }
                  <label htmlFor={`edit-assessment-modal-${answer.id}-control-tag-input-${tag.id}`} className="form-check-label"> {tag.name}</label>
                </div>
                )
              })}
            </div>
            <hr></hr>
            <div>
              <label
                htmlFor={`edit-assessment-modal-${answer.id}-control-findings-input`}
                className="form-label"
              ><h5>Findings</h5>
              </label>
              <textarea
                type='text'
                className="form-control"
                id={`edit-assessment-modal-${answer.id}-control-findings-input`}
                value={findingsInput}
                placeholder={answer.findings}
                onChange={(evt) => setFindingsInput(evt.target.value)} 
              />
            </div>
            <br></br>
            <div>
              <label
                htmlFor={`edit-assessment-modal-${answer.id}-control-impact-input`}
                className="form-label"
              ><h5>Impact</h5>
              </label>
              <textarea
                type='text'
                className="form-control"
                id={`edit-assessment-modal-${answer.id}-control-impact-input`}
                value={impactInput}
                placeholder={answer.impact}
                onChange={(evt) => setImpactInput(evt.target.value)} 
              />
            </div>
            <br></br>
            <div>
            <label
                htmlFor={`edit-assessment-modal-${answer.id}-control-recommendations-input`}
                className="form-label"
              ><h5>Recommendations</h5>
              </label>
              <textarea
                type='text'
                className="form-control"
                id={`edit-assessment-modal-${answer.id}-control-recommendations-input`}
                value={recommendationsInput}
                placeholder={answer.recommendations}
                onChange={(evt) => setRecommendationsInput(evt.target.value)} 
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateAssessmentAnswers}>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AssessmentEditModal