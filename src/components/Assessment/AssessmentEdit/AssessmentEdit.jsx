import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AssessmentEdit() {
    const params = useParams();
    const dispatch = useDispatch();
    const assessmentAnswersById = useSelector((store) => store.assessmentAnswersById);
    const history = useHistory();
    const user = useSelector(store => store.user)

    const [levelRatingInput, setLevelRatingInput] = useState(assessmentAnswersById.level_rating)

    useEffect(() => {
        console.log('params.id', params.id)
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: 1
        })
    }, []);

    const addNewHeadline = event => {
        event.preventDefault();
        console.log('assessment_id', assessmentAnswersById.assessment_id, 'headline', event.target.value);
        dispatch({
            type: 'SAGA/POST_HEADLINE_BY_ID',
            payload: {
                assessment_id: 1,
                headline_text: event.target.value
            }
        })
    }

    const updateAssessmentAnswers = (event) => {
        console.log('Updated answers:', levelRatingInput)
        event.preventDefault();
        const updatedAssessmentAnswers = {
          id: assessmentAnswersById.assessment_id,
          level_rating: levelRatingInput,
          image_url: itemImageUrl,
        }
        dispatch({
          type: 'UPDATE_ASSESSMENT_ANSWERS',
          payload: updatedItem
        })
        history.push('/shelf');
      };

    const handleSubmit = () => {
        addNewHeadline();
    }
    const goToOverviewPage = () => {
        history.push(`/client-overview/${assessmentAnswersById.assessment_id}`)
    }

    const goToDashboard = () => {
        history.push(`/dashboard`)
    }

    return (
        <div className="assessmentAnswers">
        <h1>{assessmentAnswersById.company_name} Assessment Answers</h1>
        <div className="container shadow min-vh-100 py-2">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Bucket</th>
                            <th scope="col">Function</th>
                            <th scope="col">Subfunction</th>
                            <th scope="col">Level</th>
                            <th scope="col">Phase</th>
                            <th scope="col">Tags</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1 <i className="bi bi-chevron-down"></i></th>
                            <td>{assessmentAnswersById.bucket_name || ''}</td>
                            <td>{assessmentAnswersById.function_name || ''}</td>
                            <td>{assessmentAnswersById.subfunction_name || ''}</td>
                            <td>{assessmentAnswersById.level_rating || ''}</td>
                            <td>{assessmentAnswersById.phase || ''}</td>
                            <td>{assessmentAnswersById.tag_name || ''}</td>
                            <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                Expand
                            </button></td>
                            <td><button onClick={goToOverviewPage}>See Overview</button></td>
                            {/* <td><button onClick={goToEditPage}>Edit</button></td> */}
                            <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                Edit
                            </button></td>
                        </tr>
                        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">More Assessment Answers Data</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <div>
                                <h5>Level</h5>
                                <input
                                    type='text'
                                    value={assessmentAnswersById.level_rating || ''}
                                    // onChange={(evt) => setNameInput(evt.target.value)}
                                    readOnly
                                />
                                </div>
                                <div>
                                <h5>Phase</h5>
                                <input
                                    type='text'
                                    value={assessmentAnswersById.phase || ''}
                                    // onChange={(evt) => setNameInput(evt.target.value)} 
                                    readOnly
                                />
                                </div>
                                <div>
                                <h5>Tags</h5>
                                <input
                                    type='text'
                                    value={assessmentAnswersById.tag_name || ''}
                                    // onChange={(evt) => setNameInput(evt.target.value)}
                                    readOnly
                                />
                                </div>
                                <div>
                                <h5>Findings</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.findings}
                                    // onChange={(evt) => setNameInput(evt.target.value)}
                                    readOnly 
                                />
                                </div>
                                <div>
                                <h5>Impact</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.impact}
                                    rows={12}
                                    // onChange={(evt) => setNameInput(evt.target.value)}
                                    readOnly
                                />
                                </div>
                                <div>
                                <h5>Recommendations</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.recommendations}
                                    // onChange={(evt) => setNameInput(evt.target.value)}
                                    readOnly 
                                />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Submit</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Assessment</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <div>
                                <h5>Level</h5>
                                <input
                                    type='text'
                                    value={assessmentAnswersById.level_rating || ''}
                                    onChange={(evt) => setLevelRatingInput(evt.target.value)} 
                                />
                                </div>
                                <div>
                                <h5>Phase</h5>
                                <input
                                    type='text'
                                    value={assessmentAnswersById.phase || ''}
                                    // onChange={(evt) => setNameInput(evt.target.value)} 
                                />
                                </div>
                                <div>
                                <h5>Tags</h5>
                                <input
                                    type='text'
                                    value={assessmentAnswersById.tag_name || ''}
                                    // onChange={(evt) => setNameInput(evt.target.value)}
                                />
                                </div>
                                <div>
                                <h5>Findings</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.findings}
                                    // onChange={(evt) => setNameInput(evt.target.value)} 
                                />
                                </div>
                                <div>
                                <h5>Impact</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.impact}
                                    rows={12}
                                    // onChange={(evt) => setNameInput(evt.target.value)} 
                                />
                                </div>
                                <div>
                                <h5>Recommendations</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.recommendations}
                                    // onChange={(evt) => setNameInput(evt.target.value)} 
                                />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Submit</button>
                            </div>
                            </div>
                        </div>
                        </div>

                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default AssessmentEdit;