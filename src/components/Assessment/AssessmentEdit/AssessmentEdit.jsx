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
        <div className="assessmentEdit">
        <h1>{assessmentAnswersById.company_name} Assessment</h1>
        <h2>{assessmentAnswersById.bucket_name} - Review & Submit</h2>
        <form>
            <div className="input-group">
                <span className="input-group-text" style={{ fontSize: 22 }}>Headline: </span>
                <input type="text" class="form-control" id={assessmentAnswersById.assessment_id}/>
            </div>
        <div className="container shadow min-vh-100 py-2">
            <div className="table-responsive">
                <table className="table accordion">
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
                        <tr data-bs-toggle="collapse" data-bs-target="#r1">
                            <th scope="row">1 <i className="bi bi-chevron-down"></i></th>
                            <td>{assessmentAnswersById.bucket_name || ''}</td>
                            <td>{assessmentAnswersById.function_name || ''}</td>
                            <td>{assessmentAnswersById.subfunction_name || ''}</td>
                            <td>{assessmentAnswersById.level_rating || ''}</td>
                            <td>{assessmentAnswersById.phase || ''}</td>
                            <td>{assessmentAnswersById.tag_name || ''}</td>
                            <td><button>Expand</button></td>
                            <td><button onClick={goToOverviewPage}>See Overview</button></td>
                            <td><button>Edit</button></td>
                        </tr>
                        <tr className="collapse accordion-collapse" id="r1" data-bs-parent=".table">
                        <table className="table accordion">
                            <thead>
                                <tr>
                                    {/* <th scope="col"></th> */}
                                    <th scope="col">Findings:</th>
                                    {/* <th scope="col">Impact</th>
                                    <th scope="col">Recommendation</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr data-bs-toggle="collapse" data-bs-target="#r1">
                                    {/* <th scope="row"> <i className="bi bi-chevron-down"></i></th> */}
                                    <td>{assessmentAnswersById.findings || ''}</td>
                                    {/* <td>{assessmentAnswersById.impact || ''}</td>
                                    <td>{assessmentAnswersById.recommendations || ''}</td> */}
                                </tr>
                                </tbody>
                        </table>
                        <table className="table accordion">
                            <thead>
                                <tr>
                                    {/* <th scope="col"></th> */}
                                    {/* <th scope="col">Findings</th> */}
                                    <th scope="col">Impact:</th>
                                    {/* <th scope="col">Recommendation</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr data-bs-toggle="collapse" data-bs-target="#r1">
                                    {/* <th scope="row"> <i className="bi bi-chevron-down"></i></th> */}
                                    {/* <td>{assessmentAnswersById.findings || ''}</td> */}
                                    <td>{assessmentAnswersById.impact || ''}</td>
                                    {/* <td>{assessmentAnswersById.recommendations || ''}</td> */}
                                </tr>
                                </tbody>
                        </table>
                        <table className="table accordion">
                            <thead>
                                <tr>
                                    {/* <th scope="col"></th>
                                    <th scope="col">Findings</th>
                                    <th scope="col">Impact</th> */}
                                    <th scope="col">Recommendation:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr data-bs-toggle="collapse" data-bs-target="#r1">
                                    {/* <th scope="row"> <i className="bi bi-chevron-down"></i></th>
                                    <td>{assessmentAnswersById.findings || ''}</td>
                                    <td>{assessmentAnswersById.impact || ''}</td> */}
                                    <td>{assessmentAnswersById.recommendations || ''}</td>
                                </tr>
                                </tbody>
                        </table>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button onClick={goToDashboard}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
        </form>
        </div>
    )
}

export default AssessmentEdit;