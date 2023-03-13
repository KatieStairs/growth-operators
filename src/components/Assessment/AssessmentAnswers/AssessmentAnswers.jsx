import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../../Nav/Nav'

function AssessmentAnswers() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const assessmentAnswersList = useSelector(store => store.assessmentAnswersList);
    const assessmentAnswersById = useSelector(store => store.assessmentAnswersById);

    
    useEffect(() => {
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: assessmentAnswersById.assessment_id || 1
        })
    }, []);

    // console.log('############', assessmentAnswersById.assessment_id)

    const goToEditPage = () => {
        history.push(`/assessment-edit/${assessmentAnswersById.assessment_id}`)
    }

    const goToOverviewPage = () => {
        history.push(`/client-overview/${assessmentAnswersById.assessment_id}`)
    }

    return (
        <>
        <div className="col py-3">
            {/* <Nav /> */}
        <button data-bs-toggle="collapse" data-bs-target="#sidebar">Toggle Menu</button>
        <div className="col px-4 py-3">
        <h1>{assessmentAnswersById.company_name} Assessment Answers</h1>
        <div className="container shadow min-vh-100 py-3">
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
                            <td><button onClick={goToEditPage}>Edit</button></td>
                        </tr>
                        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Expanded Assessment Answers</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-center">
                                <div>
                                <h5>Findings</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.findings}
                                    readOnly 
                                />
                                </div>
                                <div>
                                <h5>Impact</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.impact}
                                    rows={12}
                                    readOnly
                                />
                                </div>
                                <div>
                                <h5>Recommendations</h5>
                                <textarea
                                    type='text'
                                    value={assessmentAnswersById.recommendations}
                                    readOnly 
                                />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        </div>
        </>
    )
};

export default AssessmentAnswers;