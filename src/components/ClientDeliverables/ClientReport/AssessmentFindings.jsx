function AssessmentFindings({ answer }) {

  return(
    <>
    <h1>{answer.bucket_name}</h1>
    <div className="container">
      <div className="row">
      <h3>{answer.bucket_index}.{answer.function_index} {answer.function_name}</h3>
      </div>
      <div className="row col-11">
        <h5>{answer.bucket_index}.{answer.function_index}.{answer.subfunction_index} {answer.subfunction_name} 
        <div className="float-end">Rating: {answer.level_rating} Phase: {answer.phase}</div></h5>
        <br></br>
        <div className="container-fluid gy-2 gx-5 col-12">
          <h6><strong>Findings:</strong></h6> 
          <h6>{answer.findings}</h6>

          <h6><strong>Recommendations:</strong></h6> 
          <h6>{answer.recommendations}</h6>

          <h6><strong>Impact:</strong></h6> 
          <h6>{answer.impact}</h6>
        </div>
      </div>
    </div>
    </>
  )
}

export default AssessmentFindings;