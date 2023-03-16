import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Presentation.css';

function AssessmentList () {
  const assessments = useSelector((store) => store.presentation.assessmentList);

  return (
    <div className="container-fluid">
    <div className="container-fluid text-center">
      <h2>{`${assessments.company_name} Assessments`}</h2>
    </div>
      <table className="table table-striped table-hover assessments-table">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Engagement Date</th>
            <th scope="col">Generate Presentation</th>
          </tr>
        </thead>
        <tbody>
        {/* {assessments.map((assessment) => {
          return <AssessmentRow key={assessment.id} assessment={assessment}/>
        })} */}
        </tbody>
      </table>
    </div>
  );
};



export default AssessmentList;