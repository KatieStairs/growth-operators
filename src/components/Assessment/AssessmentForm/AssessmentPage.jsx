import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useLocation } from "react-router-dom";

function AssessmentPage ({functionsArray}) {
  const dispatch = useDispatch();
  const params = useParams();
  const pathname = useLocation(); // needed for useEffect
  const structure = useSelector((store => store.structure))
  const subfunctionsArray = structure.subfunctionsReducer;
  const tags = structure.tagsReducer;
  const [formArray, setFormArray] = useState([]); // Overarching array of input objects, used to hold all input fields. 
  const [allInputFields, setAllInputFields] = useState( // Object for inputs on form subfunction sections
    {subfunctionID: null, levelRatingInput: null, findingsInput: '', impactsInput: '', 
    recommendationsInput: '', phaseInput: null, tagsInput: []}
  ); 

  useEffect(() => { // Forces page to start at the top 
    window.scrollTo(0, 0) // if removed, when user presses continue, next page loads already scrolled to bottom
  }, [pathname])

  const handleInputChange = (subfunction, event) => { // handles page inputs, allInputFields, formArray
    if (allInputFields.subfunctionID === null) {     // if no info in allInputFields, sets allInputFields where a value exists.
      setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
    } 
    else if (allInputFields.subfunctionID === subfunction.id) { // sets info if there's info in allInputFields w/ a matching subfunction
      if (event.target.name == 'tagsInput' && allInputFields.tagsInput) { 
        const newTagsInputArray = new Array(allInputFields.tagsInput, event.target.value).flat(Infinity);
        setAllInputFields({[event.target.name]: newTagsInputArray, 'subfunctionID': subfunction.id})
      } 
      else { // updates relevant allInputFields only
        setAllInputFields(prevState => ({...prevState, [event.target.name]: event.target.value}))
      }
    }

    else { // if there's already info in allInputFields *BUT* it's from a different subfunction section
      if (formArray.length >= 1) { // only runs the following logic if formArray has enough objects in it
      let formArrayToggle;
        for (const formObject of formArray) {
          if (formObject.subfunctionID === allInputFields.subfunctionID){ // checks for matching subfunction IDs
            let spliceInputIndex = formArray.indexOf(formObject)  
            let newFormObject = {
              ...formObject,
              levelRatingInput: allInputFields.levelRatingInput || formObject.levelRatingInput,
              findingsInput: allInputFields.findingsInput || formObject.findingsInput,
              impactsInput: allInputFields.impactsInput || formObject.impactsInput,
              recommendationsInput: allInputFields.recommendationsInput || formObject.recommendationsInput,
              phaseInput: allInputFields.phaseInput || formObject.phaseInput,
              tagsInput: 
                (!allInputFields.tagsInput) ? formObject.tagsInput
                : allInputFields.tagsInput
            }; 
            formArray.splice(spliceInputIndex, 1, newFormObject);
            formArrayToggle = true;
            clearInputFields();
            setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
            return formArray;
          } 
          else {
            formArrayToggle = false;
          }
        }

        if (formArrayToggle === false) { // only runs if no matching subfunctionID found above
          let newFormObject = {
            subfunctionID: allInputFields.subfunctionID,
            levelRatingInput: allInputFields.levelRatingInput,
            findingsInput: allInputFields.findingsInput,
            impactsInput: allInputFields.impactsInput,
            recommendationsInput: allInputFields.recommendationsInput,
            phaseInput: allInputFields.phaseInput,
            tagsInput: allInputFields.tagsInput,
          }; 
          formArray.push(newFormObject);
          clearInputFields();
          setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
        }

      } 
      else { // runs if formArray is empty
        let newFormObject = {
          subfunctionID: allInputFields.subfunctionID,
          levelRatingInput: allInputFields.levelRatingInput,
          findingsInput: allInputFields.findingsInput,
          impactsInput: allInputFields.impactsInput,
          recommendationsInput: allInputFields.recommendationsInput,
          phaseInput: allInputFields.phaseInput,
          tagsInput: allInputFields.tagsInput,
        }; 

        formArray.push(newFormObject);
        clearInputFields();
        setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
      }
    }
  }

  const saveToDatabase = () => { // handles formArray, dispatches to database
    if (formArray.length >= 1) { // only runs the following logic if formArray has enough objects in it
      let formArrayToggle;
      for (const formObject of formArray) {
        if (formObject.subfunctionID === allInputFields.subfunctionID){ // checks for matching subfunction IDs
          let spliceInputIndex = formArray.indexOf(formObject)  
          let newFormObject = {
            ...formObject,
            levelRatingInput: allInputFields.levelRatingInput || formObject.levelRatingInput,
            findingsInput: allInputFields.findingsInput || formObject.findingsInput,
            impactsInput: allInputFields.impactsInput || formObject.impactsInput,
            recommendationsInput: allInputFields.recommendationsInput || formObject.recommendationsInput,
            phaseInput: allInputFields.phaseInput || formObject.phaseInput,
            tagsInput: 
              (!allInputFields.tagsInput) ? formObject.tagsInput
              : (!formObject.tagsInput) ? allInputFields.tagsInput
              : evalTagsInput(allInputFields, formObject)
          }; 
          formArray.splice(spliceInputIndex, 1, newFormObject);
          formArrayToggle = true;
          clearInputFields();
          return formArray;
        } 
        else {
          formArrayToggle = false;
        }
      }

        if (formArrayToggle === false) { // only runs if no matching subfunctionID found above
          let newFormObject = {
            subfunctionID: allInputFields.subfunctionID,
            levelRatingInput: allInputFields.levelRatingInput,
            findingsInput: allInputFields.findingsInput,
            impactsInput: allInputFields.impactsInput,
            recommendationsInput: allInputFields.recommendationsInput,
            phaseInput: allInputFields.phaseInput,
            tagsInput: allInputFields.tagsInput,
          }; 
          formArray.push(newFormObject);
          clearInputFields();
        }
        // else { // Fairly certain this was an accidental extra; commenting out, may remove after testing.
        //   let newFormObject = {
        //     subfunctionID: allInputFields.subfunctionID,
        //     levelRatingInput: allInputFields.levelRatingInput,
        //     findingsInput: allInputFields.findingsInput,
        //     impactsInput: allInputFields.impactsInput,
        //     recommendationsInput: allInputFields.recommendationsInput,
        //     phaseInput: allInputFields.phaseInput,
        //     tagsInput: allInputFields.tagsInput,
        //   }; 

        //   formArray.push(newFormObject);
        //   clearInputFields();
        // }

    } 
    else { // runs if formArray is empty
      let newFormObject = {
        subfunctionID: allInputFields.subfunctionID,
        levelRatingInput: allInputFields.levelRatingInput,
        findingsInput: allInputFields.findingsInput,
        impactsInput: allInputFields.impactsInput,
        recommendationsInput: allInputFields.recommendationsInput,
        phaseInput: allInputFields.phaseInput,
        tagsInput: allInputFields.tagsInput,
      }; 
      formArray.push(newFormObject);
      clearInputFields();
    }

    // let assessmentSave = {
    //   formArray: formArray,
    //   assessmentID: params.assessment_id,
    //   bucket_id: params.bucket_id,
    //   function_id: params.function_id
    // }

    for (const formObject of formArray){
      let assessmentSave = {
        assessment_id: Number(params.assessment_id),
        bucket_id: Number(params.bucket_id),
        function_id: Number(params.function_id),
        subfunction_id: Number(formObject.subfunctionID),
        level_rating: Number(formObject.levelRatingInput),
        findings: formObject.findingsInput,
        impact: formObject.impactsInput,
        recommendations: formObject.recommendationsInput,
        phase: Number(formObject.phaseInput),
        tag_id: formObject.tagsInput
      }

      dispatch({
        type: 'SAGA/POST_ASSESSMENT_ANSWERS',
        payload: assessmentSave
      })

      // for (const tag_id of formObject.tagsInput) {
      //   dispatch({
      //     type: 'SAGA/POST_ASSESSMENT_TAG_ANSWERS',
      //     payload: tag_id
      //   })
      }
    }
  

  const handleSaveForLater = () => {
    saveToDatabase();
  }

  const handleContinue = () => {
    saveToDatabase();
  }
  
  const evalLocation = () => { // evaluates current url params, conditionally returns newRoute
    let newRoute = '';
    for (const functionObject of functionsArray ){
      if (params.function_id == functionsArray.at(-1).id){
        newRoute = `/assessment-review/${params.assessment_id}/${params.bucket_id}`;
      } 
      else if (params.function_id == functionObject.id){
        let currentLocationIndex = Number(functionsArray.indexOf(functionObject));
        let nextLocationObject = functionsArray.at(currentLocationIndex + 1)
        let nextLocationID = nextLocationObject.id;
        newRoute = `/assessment-form/${params.assessment_id}/${params.bucket_id}/${nextLocationID}`;
      }
    }
    return newRoute;
  }

  function clearInputFields() { // clears input fields
    setAllInputFields({subfunctionID: null, levelRatingInput: null, findingsInput: '',
    impactsInput: '', recommendationsInput: '', phaseInput: null, tagsInput: null})
  }

  return (
    <>
    {functionsArray.map((functionObject) => {
      if (Number(params.function_id) === functionObject.id) {
        return (
          <div key={functionObject.id}>
            <div>
              <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={functionObject.function_index} aria-valuemin="0" aria-valuemax={functionsArray.length} >
                <div className="progress-bar" style={{"width": ((functionObject.function_index)/(functionsArray.length)).toLocaleString("en", {style: "percent"})}}></div>
              </div>
              <ul id="form-page-progress-label" className="list-inline" max-width={{"width": ((functionObject.function_index)/(functionsArray.length)).toLocaleString("en", {style: "percent"})}}>
              {/* li here does not justify numbers below progress bar; needs CSS override. */}  
                <li className="list-inline-item">0</li>
                {functionsArray.map((functionListItem) => {
                  return (
                    <li className="list-inline-item"  key={functionListItem.function_index}>{functionListItem.function_index}</li>
                  )
                })}
              </ul>
            </div>
            <h3>{functionObject.name}</h3>
            {subfunctionsArray.map((subfunction) => {
              return (
                <form key={subfunction.id} className="mb-5 ">
                  <h4>{subfunction.name}</h4>
                  <div className="col-md-10 mb-3">
                    <label htmlFor="levelRatingInput" className="form-label"><h6>Level Rating</h6></label>
                    <ul>
                      <li>{(subfunction.level_criteria_strong)}</li>
                      <li>{(subfunction.level_criteria_adequate)}</li>
                      <li>{(subfunction.level_criteria_weak)}</li>
                    </ul>
                    <input 
                      type="range" 
                      className="form-range" 
                      name="levelRatingInput"
                      min="0" 
                      max="5" 
                      step="1" 
                      onChange={(event) => handleInputChange(subfunction, event)}
                    />
                  </div>

                  <div className="col mb-3">
                    <label htmlFor="findingsInput" className="form-label"><h6>Assessment Findings</h6></label>
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="findingsInput"
                      onChange={(event) => handleInputChange(subfunction, event)}
                    />
                  </div>

                  <div className="col mb-3">
                    <label htmlFor="impactsInput" className="form-label"><h6>Impacts</h6></label>
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="impactsInput"
                      onChange={(event) => handleInputChange(subfunction, event)} 
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="recommendationsInput" className="form-label"><h6>Recommendations</h6></label>
                      <textarea 
                        type="text" 
                        className="form-control" 
                        name="recommendationsInput"
                        onChange={(event) => handleInputChange(subfunction, event)}
                      />
                    </div>
                  
                    <div className="col-md-2 mb-3">
                      <label htmlFor="phaseInput" className="form-label"><h6>Phase</h6></label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="phaseInput"
                        onChange={(event) => handleInputChange(subfunction, event)}
                      />
                    </div>

                    <div className="col mb-3">
                      <h6>Tags</h6>
                      {tags.map((tag) => {
                        return (
                          <div key={tag.id} className="g-3">
                            <input 
                              type="radio" 
                              className="form-check-input" 
                              name="tagsInput"
                              value={tag.id} 
                              onChange={(event) => handleInputChange(subfunction, event)}/>
                            <label htmlFor="tagsInput" className="form-check-label"> {tag.name}</label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <hr></hr>
                  {subfunction.subfunction_index === subfunctionsArray.length
                  ?
                  <>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                    <Link to="/dashboard">
                      <button className="btn btn-primary">Cancel</button>
                    </Link>
                    <Link to={evalLocation}>
                      <button className="btn btn-primary" onClick={() => handleContinue()}>Continue</button>
                    </Link>
                  </div>
                  <div className="d-grid g-2 d-md-flex justify-content-md-end">
                    <Link to="/dashboard">
                      <button className="btn btn-link" type="submit" onClick={() => handleSaveForLater()}>Save for Later</button>
                    </Link>
                  </div>
                  </>
                  : <></>
                  }
                </form>
              )
            })}
          </div>
        )
      }
    })}
    </>
  )
}

export default AssessmentPage;