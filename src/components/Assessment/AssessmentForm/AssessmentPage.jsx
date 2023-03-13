import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from "react-router-dom";

import AssessmentSection from "./AssessmentSection";

function AssessmentPage ({functionsArray}) {
  const params = useParams();
  const structure = useSelector((store => store.structure))
  const tags = structure.tagsReducer;
  const subfunctionsArray = structure.subfunctionsReducer;
  const [formArray, setFormArray] = useState([]); 
  // Overarching array of input objects, used to hold all input fields. 

  const [allInputFields, setAllInputFields] = useState(
    {subfunctionID: null, levelRatingInput: null, findingsInput: '', impactsInput: '', 
    recommendationsInput: '', phaseInput: null, tagsInput: []}
  ); // Object for inputs on form subfunction sections

  

  const handleInputChange = (subfunction, index, event) => {

    if (allInputFields.subfunctionID === null) { 
    // if there is no info at all in allInputFields,
        setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
      // sets allInputFields where a value exists. Also gives allInputFields that subfunction section ID.
    } 
 
    else if (allInputFields.subfunctionID === subfunction.id) { 
    // if there's already info in allInputFields, and the input change comes from the same subfunction section,
      if (event.target.name == 'tagsInput' && allInputFields.tagsInput) {
        const newTagsInputArray = new Array(allInputFields.tagsInput, event.target.value)
        setAllInputFields({[event.target.name]: newTagsInputArray})
      } else {
      setAllInputFields(prevState => ({...prevState, [event.target.name]: event.target.value}))
      // this updates relevant allInputFields only.
      }
    } 

    else {    
    // if there's already info in allInputFields *BUT* it's from a different subfunction section
      if (formArray.length >= 1) { 
      let test;
      // only runs the following logic if formArray has enough objects in it
        for (const formObject of formArray) {
          console.log('forEach // subfunction ID:', subfunction.id);
          console.log('forEach // formObject ID:', formObject.subfunctionID);
          console.log('forEach // Inputs ID:', allInputFields.subfunctionID);

          if (formObject.subfunctionID === allInputFields.subfunctionID){
            console.log('MATCH // formObject ID: ', formObject.subfunctionID);
            console.log('MATCH // Inputs ID:', allInputFields.subfunctionID);
            let spliceInputIndex = formArray.indexOf(formObject)  
            console.log('spliceInputIndex: ', spliceInputIndex);
            let newFormObject = {
              ...formObject,
              levelRatingInput: allInputFields.levelRatingInput || formObject.levelRatingInput,
              findingsInput: allInputFields.findingsInput || formObject.findingsInput,
              impactsInput: allInputFields.impactsInput || formObject.impactsInput,
              recommendationsInput: allInputFields.recommendationsInput || formObject.recommendationsInput,
              phaseInput: allInputFields.phaseInput || formObject.phaseInput,
              tagsInput: allInputFields.tagsInput || formObject.tagsInput,
            }; 
            formArray.splice(spliceInputIndex, 1, newFormObject);
            test = true;

            console.log('allInputFields: ', allInputFields);
            console.log('formArray: ', formArray);

            clearInputFields();
            setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
            return formArray;
          } else {
            test = false;
          }
        }

        console.log('Test: ', test)
        if (test === false) {
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
            console.log('allInputFields: ', allInputFields);
            console.log('formArray: ', formArray);
        }
      } else {
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
        console.log('allInputFields: ', allInputFields);
        console.log('formArray: ', formArray);
      }
        // for (const formObject of formArray) { 
        // // evaluates each object in formArray
        //   // if (formObject.subfunctionID === allInputFields.subfunctionID){ 
        //   if (formObject.subfunctionID === subfunction.id){ 
        //   // SubfunctionIDs in formArray and allInputsFields match (i.e. if there's already an object in formArray with
        //   // that subfunctionID, to prevent duplicates)
        //     let newInput = {
        //       subfunctionID: formObject.subfunctionID,
        //       levelRatingInput: allInputFields.levelRatingInput || formObject.levelRatingInput,
        //       findingsInput: allInputFields.findingsInput || formObject.findingsInput,
        //       impactsInput: allInputFields.impactsInput || formObject.impactsInput,
        //       recommendationsInput: allInputFields.recommendationsInput || formObject.recommendationsInput,
        //       phaseInput: allInputFields.phaseInput || formObject.phaseInput,
        //       tagsInput: allInputFields.tagsInput || formObject.tagsInput,
        //     }; 
        //     console.log('Splicing in // newInput: ', newInput);
        //     console.log('Splicing out // formObject: ', formObject);
        //     // new variable for whatever is currently in allInputsFields + formObject
        //     let spliceInputIndex = formArray.indexOf(formObject)  
        //     console.log('spliceInputIndex: ', spliceInputIndex);
        //     // new variable for index/location of matching formArray object
        //     formArray.splice(spliceInputIndex, 1, newInput);
        //     // removes 1 object at spliceInputIndex location, adds in newInput in its place
        //     // This is where I think the error is coming in -- currently growing exponentially rather than removing.

        //     clearInputFields();
        //     // clears allInputFields
        //     setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
        //     // sets allInputFields where a value exists, gives subfunction section ID.
        //     break;
        //   } 
        //   else {
        //     let newInput = {
        //       subfunctionID: allInputFields.subfunctionID,
        //       levelRatingInput: allInputFields.levelRatingInput,
        //       findingsInput: allInputFields.findingsInput,
        //       impactsInput: allInputFields.impactsInput,
        //       recommendationsInput: allInputFields.recommendationsInput,
        //       phaseInput: allInputFields.phaseInput,
        //       tagsInput: allInputFields.tagsInput,
        //     }; 
        //     formArray.push(newInput);
        //     // if subfunctionIDs in formArray and allInputsFields do NOT match, (i.e. there is no object in formArray with
        //     // that subfunctionID), pushes allInputFields into formArray.
        //   }
        // }
    
    // clearInputFields();
    // // clears allInputFields
    // setAllInputFields({[event.target.name]: event.target.value, 'subfunctionID': subfunction.id})
    // // sets allInputFields where a value exists, gives subfunction section ID.
    }
    console.log('allInputFields: ', allInputFields);
    console.log('formArray: ', formArray);
  }

  const handleSubfunctions = (event) => {
    event.preventDefault();
    if (formArray.length >= 1) {
      for (const formObject in formArray) {
        if (formArray[formObject].subfunctionID === allInputFields.subfunctionID){
          let newInput = formArray[formObject];
          newInput = {[event.target.name]: event.target.value}
          formArray.splice(formObject, 1, newInput);
        } 
        else {
          formArray.push(allInputFields);
        }
      }
    } 
    else {
      formArray.push(allInputFields);
    }
    console.log('allInputFields: ', allInputFields);
    console.log('formArray: ', formArray);
  }
  
  function clearInputFields() {
    setAllInputFields({subfunctionID: null, levelRatingInput: null, findingsInput: '',
    impactsInput: '', recommendationsInput: '', phaseInput: null, tagsInput: null})
  }

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  return (
    <>
    {functionsArray.map((functionObject) => {
      if (Number(params.function_id) === functionObject.id) {
        return (
          <div key={functionObject.id}>
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={functionObject.function_index} aria-valuemin="0" aria-valuemax={functionsArray.length}>
              <div className="progress-bar w-75"></div>
            </div>
            <h3>{functionObject.name}</h3>
            {subfunctionsArray.map((subfunction, input, index) => {
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
                      // id={subfunction.id} 
                      min="0" 
                      max="5" 
                      step="1" 
                      // value={input.levelRatingInput}
                      onChange={(event) => handleInputChange(subfunction, index, event)}
                    />
                  </div>

                  <div className="col mb-3">
                    <label htmlFor="findingsInput" className="form-label"><h6>Assessment Findings</h6></label>
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="findingsInput"
                      // id={subfunction.id} 
                      // value={input.findingsInput}
                      onChange={(event) => handleInputChange(subfunction, index, event)}
                    />
                  </div>

                  <div className="col mb-3">
                    <label htmlFor="impactsInput" className="form-label"><h6>Impacts</h6></label>
                    <textarea 
                      type="text" 
                      className="form-control" 
                      name="impactsInput"
                      // id={subfunction.id} 
                      // value={input.impactsInput}
                      onChange={(event) => handleInputChange(subfunction, index, event)} 
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="recommendationsInput" className="form-label"><h6>Recommendations</h6></label>
                      <textarea 
                        type="text" 
                        className="form-control" 
                        name="recommendationsInput"
                        // id={subfunction.id} 
                        // value={input.recommendationsInput}
                        onChange={(event) => handleInputChange(subfunction, index, event)}
                      />
                    </div>
                  
                    <div className="col-md-2 mb-3">
                      <label htmlFor="phaseInput" className="form-label"><h6>Phase</h6></label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="phaseInput"
                        // id={subfunction.id} 
                        // value={input.phaseInput}
                        onChange={(event) => handleInputChange(subfunction, index, event)}
                      />
                    </div>

                    <div className="col mb-3">
                      <h6>Tags</h6>
                      {tags.map((tag) => {
                        return (
                          <div key={tag.id} className="g-3">
                            <input 
                              type="checkbox" 
                              className="form-check-input" 
                              name="tagsInput"
                              // id={subfunction.id} 
                              value={tag.id} 
                              onChange={(event) => handleInputChange(subfunction, index, event)}/>
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
                      <button className="btn btn-primary">
                      Cancel
                      </button>
                    </Link>
                    <button className="btn btn-primary" onClick={(event) => handleSubfunctions(event)}>Continue</button>
                  </div>
                  <div className="d-grid g-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-link" type="submit">Save for Later</button>
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