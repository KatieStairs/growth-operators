function AssessmentPhases ({ answer }) {

  return (
    <>
    <hr/>
    <div className="container gx-1">
      <h1>Phases</h1>
    </div>
    <div className="container gx-1 px-2 py-2">
      <h3>{answer.bucket_name}</h3>
      <div className="container gx-1 px-2 py-2">
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
    </div>
    </>
  )
}

export default AssessmentPhases;