import React from 'react'; 

function AssessmentEditExpandModal ({answer}) {
  return (
    <>
    <div
      className="modal fade"
      id={`expanded-assessment-modal-${answer.id}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`expanded-assessment-modal-${answer.id}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
              <h5 
                className="modal-title" 
                id={`expanded-assessment-modal-${answer.id}-label`}
              >Expanded Assessment</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close">
              </button>
          </div>
          <div className="modal-body">
            <div>
              <h5>Phase</h5>
              <p>{answer.phase}</p>
            </div>
            <div>
              <h5>Findings</h5>
              <p>{answer.findings}</p>
            </div>
            <div>
              <h5>Impact</h5>
              <p>{answer.impact}</p>
            </div>
            <div>
              <h5>Recommendations</h5>
              <p>{answer.recommendations}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AssessmentEditExpandModal;