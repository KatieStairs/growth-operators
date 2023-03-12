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
        <>
        <h2>{assessmentAnswersById.company_name} Assessment Answers</h2>
        <div class="container shadow min-vh-100 py-2">
            <div class="table-responsive">
                <table class="table accordion">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Bucket</th>
                            <th scope="col">Function</th>
                            <th scope="col">Subfunction</th>
                            <th scope="col">Level</th>
                            <th scope="col">Phase</th>
                            <th scope="col">Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-bs-toggle="collapse" data-bs-target="#r1">
                            <th scope="row">1 <i class="bi bi-chevron-down"></i></th>
                            <td>{assessmentAnswersById.bucket_name || ''}</td>
                            <td>{assessmentAnswersById.function_name || ''}</td>
                            <td>{assessmentAnswersById.subfunction_name || ''}</td>
                            <td>{assessmentAnswersById.level_rating || ''}</td>
                            <td>{assessmentAnswersById.phase || ''}</td>
                            <td>{assessmentAnswersById.tag_name || ''}</td>
                        </tr>
                        <tr class="collapse accordion-collapse" id="r1" data-bs-parent=".table">
                        <table class="table accordion">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Findings</th>
                                    <th scope="col">Impact</th>
                                    <th scope="col">Recommendation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr data-bs-toggle="collapse" data-bs-target="#r1">
                                    <th scope="row">1 <i class="bi bi-chevron-down"></i></th>
                                    <td>{assessmentAnswersById.findings || ''}</td>
                                    <td>{assessmentAnswersById.function_name || ''}</td>
                                    <td>{assessmentAnswersById.subfunction_name || ''}</td>
                                    <td>{assessmentAnswersById.level_rating || ''}</td>
                                    <td>{assessmentAnswersById.phase || ''}</td>
                                    <td>{assessmentAnswersById.tag_name || ''}</td>
                                </tr>
                                </tbody>
                        </table>
                        </tr>
                        <tr data-bs-toggle="collapse" data-bs-target="#r2">
                            <th scope="row">2 <i class="bi bi-chevron-down"></i></th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="collapse accordion-collapse" id="r2" data-bs-parent=".table">
                            <td colspan="5"> Item 2 detail .. This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow. </td>
                        </tr>
                        <tr data-bs-toggle="collapse" data-bs-target="#r3">
                            <th scope="row">3 <i class="bi bi-chevron-down"></i></th>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="collapse accordion-collapse" id="r3" data-bs-parent=".table">
                            <td colspan="5"> Item 3 detail .. This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow. </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
};

export default AssessmentAnswers;