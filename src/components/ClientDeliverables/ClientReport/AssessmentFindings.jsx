function AssessmentFindings({ answer }) {

  return(
    <>
    <h1>{answer.bucket_name}</h1>
    <div className="container">
      <div className="row">
      <h3>{answer.bucket_index}.{answer.function_index} {answer.function_name}</h3>
      </div>
      <div className="row">
        <div className="col-md-8">
        <h5>{answer.bucket_index}.{answer.function_index}.{answer.subfunction_index} {answer.subfunction_name}</h5> 
        <h6>Rating: {answer.level_rating} Phase: {answer.phase}</h6>
        </div>
      </div>
      <div className="row">
        <h6><strong>Findings:</strong></h6> 
        <h6>{answer.findings}</h6>
      </div>
      <div className="row">
        <h6><strong>Recommendations:</strong></h6> 
        <h6>{answer.recommendations}</h6>
      </div>
      <div className="row">
        <h6><strong>Impact:</strong></h6> 
        <h6>{answer.impact}</h6>
      </div>
      

    </div>
    </>
  )
}

export default AssessmentFindings;