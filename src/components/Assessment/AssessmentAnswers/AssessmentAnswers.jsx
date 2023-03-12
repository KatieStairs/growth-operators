import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AssessmentAnswers() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const assessmentAnswersList = useSelector(store => store.assessmentAnswersList);
    const assessmentAnswersById = useSelector(store => store.assessmentAnswersById);
    useEffect(() => {
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: 1
        })
    }, []);

    const goToEditPage = () => {
        history.push(`/assessment-edit/${assessmentAnswersById.assessment_id}`)
    }

    const goToOverviewPage = () => {
        history.push(`/client-overview/${assessmentAnswersById.assessment_id}`)
    }

    return (
        <div className="assessmentAnswers">
        <h2>{assessmentAnswersById.company_name} Assessment Answers</h2>
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
                            <td><button onClick={goToEditPage}>Edit</button></td>
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
        </div>
    )
};

export default AssessmentAnswers;