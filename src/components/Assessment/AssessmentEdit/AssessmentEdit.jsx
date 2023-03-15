import React, { useState } from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AssessmentEdit.css'
import Nav from '../../Nav/Nav'

function AssessmentEdit() {
    const params = useParams();
    const dispatch = useDispatch();
    const assessmentAnswersById = useSelector((store) => store.assessmentAnswersById);
    const structure = useSelector((store => store.structure));
    const tags = structure.tagsReducer;
    const functionsArray = structure.functionsReducer;
    const history = useHistory();

    const [headlineInput, setHeadlineInput] = useState(assessmentAnswersById.headline_text)
    const [levelRatingInput, setLevelRatingInput] = useState(assessmentAnswersById.level_rating)
    const [tagsInput, setTagsInput] = useState(assessmentAnswersById.tags)
    const [findingsInput, setFindingsInput] = useState(assessmentAnswersById.findings)
    const [impactInput, setImpactInput] = useState(assessmentAnswersById.impact)
    const [recommendationsInput, setRecommendationsInput] = useState(assessmentAnswersById.recommendations)

    useEffect(() => {
        // console.log('params.id', params.id)
        dispatch({
            type: 'SAGA/GET_ASSESSMENT_ANSWERS_BY_ID',
            payload: params.id
        })
        dispatch({
            type: 'SAGA/FETCH_ALL_TAGS',
            payload: params.id
        })
        dispatch({
            type: 'SAGA/FETCH_FUNCTIONS_BY_BUCKET', 
            payload: assessmentAnswersById.bucket_id
        });
    }, []);

    const addNewHeadline = (event) => {
        // console.log('assessment_id', assessmentAnswersById.assessment_id, 'bucket id', assessmentAnswersById.bucket_id, 'headline', headlineInput);
        dispatch({
            type: 'SAGA/POST_HEADLINE_BY_ID',
            payload: {
                assessment_id: assessmentAnswersById.assessment_id,
                bucket_id: assessmentAnswersById.bucket_id,
                headline_text: headlineInput
            }
        })
    }

    const handleSubmit = (event) => {
        addNewHeadline();
    }

    const evalLocation = () => {
        let newRoute = '';
        // console.log('functions array', functionsArray)
        // console.log('tag id', assessmentAnswersById.tag_id)
        if (assessmentAnswersById.function_id < functionsArray && functionsArray.at(-1).id){
            let nextBucket = Number(assessmentAnswersById.bucket_id) + 1;
            newRoute = `/assessment-form/${assessmentAnswersById.assessment_id}/${nextBucket}`;
        } 
        if (assessmentAnswersById.function_id === functionsArray && functionsArray.at(-1).id){
            newRoute = `/dashboard`;
        }
            return newRoute;
    }


    const updateAssessmentAnswers = (event) => {
        // console.log('Updated answers:', assessmentAnswersById.function_id, assessmentAnswersById.subfunction_id)
        const updatedAssessmentAnswers = {
            assessment_id: assessmentAnswersById.assessment_id,
            bucket_id: assessmentAnswersById.bucket_id,
            function_id: assessmentAnswersById.function_id,
            subfunction_id: assessmentAnswersById.subfunction_id,
            level_rating: levelRatingInput,
            phase: phaseInput,
            tags_id: tagsInput,
            findings: findingsInput,
            impact: impactInput,
            recommendations: recommendationsInput
        }
        dispatch({
            type: 'SAGA/UPDATE_ASSESSMENT_BY_ID',
            payload: updatedAssessmentAnswers
        })
    };

    const goToOverviewPage = () => {
        history.push(`/client-overview/${assessmentAnswersById.assessment_id}`)
    }

    const goToDashboard = () => {
        history.push(`/dashboard`)
    }

    // I'm not super attached to the <hr>'s & <br>'s in the modal, may want to change.
    return (
        <>
        {/* <div className="container-fluid">
            <div className="row flex-nowrap">
                <Nav />
                <div className="col py-3"> */}
                    <button data-bs-toggle="collapse" data-bs-target="#sidebar">Toggle Menu</button>
        <div className="col py-3 px-4">
        <h1>{assessmentAnswersById.bucket_name} - Review & Submit</h1>
        <div className="row g-3 align-items-center">
            <div className="col-auto">
                <label className="col-form-label-lg py-4">Headline: </label>
            </div>
            <div className="col-10">
                <input 
                type="text" 
                id={assessmentAnswersById.assessment_id || ''} 
                className="form-control" 
                aria-describedby="passwordHelpInline" 
                onChange={(event) => setHeadlineInput(event.target.value)}
                />
            </div>
        </div>
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
                            <td>{assessmentAnswersById.tag_name || ''}</td>
                            <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                Expand
                            </button></td>
                            <td><button onClick={goToOverviewPage}>See Overview</button></td>
                            <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                Edit
                            </button></td>
                        </tr>
                        <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Expanded Assessment Answers</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            <div className="modal-body text-center">
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
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Assessment</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-center">
                                <div>
                                <h5>Level</h5>
                                <input
                                    type='text'
                                    value={levelRatingInput || ''}
                                    placeholder={assessmentAnswersById.level_rating || ''}
                                    onChange={(evt) => setLevelRatingInput(evt.target.value)}
                                />
                                </div>
                                <div>
                                    <hr></hr>
                                <h5>Tags</h5>
                                {tags.map((tag) => {
                                    return (
                                    <div key={tag.id} className="g-3">
                                        <input 
                                        type="checkbox" 
                                        className="form-check-input" 
                                        name="tagsInput"
                                        value={tagsInput} 
                                        // defaultValue={assessmentAnswersById.tag_id}
                                        onChange={(evt) => setTagsInput(evt.target.value)}/>
                                        <label htmlFor="tagsInput" className="form-check-label"> {tag.name}</label>
                                    </div>
                                    )
                                })}
                                </div>
                                    <hr></hr>
                                <div>
                                <h5>Findings</h5>
                                <textarea
                                    type='text'
                                    value={findingsInput || ''}
                                    placeholder={assessmentAnswersById.findings || ''}
                                    onChange={(evt) => setFindingsInput(evt.target.value)} 
                                />
                                </div>
                                    <br></br>
                                <div>
                                <h5>Impact</h5>
                                <textarea
                                    type='text'
                                    value={impactInput || ''}
                                    placeholder={assessmentAnswersById.impact || ''}
                                    rows={12}
                                    onChange={(evt) => setImpactInput(evt.target.value)} 
                                />
                                </div>
                                    <br></br>
                                <div>
                                <h5>Recommendations</h5>
                                <textarea
                                    type='text'
                                    value={recommendationsInput || ''}
                                    placeholder={assessmentAnswersById.recommendations || ''}
                                    onChange={(evt) => setRecommendationsInput(evt.target.value)} 
                                />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={updateAssessmentAnswers}>Submit</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-12 bg-light float-right">
                    <Link to={evalLocation}>
                    <button type="submit" className="float-end" onClick={(event) => handleSubmit(event)}>Submit and Continue to Next Bucket</button>
                    </Link>
                    <button type="button" className="float-end px-2" onClick={goToDashboard}>Cancel</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default AssessmentEdit;