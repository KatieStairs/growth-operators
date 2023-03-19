function AssessmentPhases ({ answer }) {

  return (
    <>
    <hr/>
    <h1>Phases</h1>
    <div className="container">
    <h3>{answer.bucket_name}</h3>
    <table className="table table-bordered">
    <thead>
      <tr>
        <th scope="col">Phase</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
      <tbody>
        <tr>
          <td>{answer.phase}</td>
          <td>{answer.recommendations}</td>
        </tr>
      </tbody>
    </table>
    </div>
    </>
  )
}

export default AssessmentPhases;