import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// this is the second table in the operator dashboard
function DashboardTableOperatorAssessments({ client }) {
    const history = useHistory();
      const user = useSelector((store) => store.user);
    // this will take the operator to the edit page
    const handleEditClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('edit id clicked', assessmentId);
        history.push(`/assessment-edit/${assessmentId}`)
    }
    // this will take the operator to the client overview answers page
    const handleClientOverviewClick = (client) => {
        let clientId = client.client_id;
        // console.log('details id clicked', assessmentId);
        history.push(`/client-overview/${clientId}`)
    }
    // this will take the operator to see the assessment answers
    const handleSeeOverviewClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('see id clicked', assessmentId);
        // this one will have to be changed to see assessment
        history.push(`/assessment-answers/${assessmentId}`)
    }
    const handleStartClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('client id clicked', clientId);
        history.push(`assessment-form/${assessmentId}/1/1`)
    }

    if(client.status === 'Edit in Progress'){
    return (
        <tr>
            <td>{client.company_name}</td>
            <td>{new Date(client.engagement_date).toLocaleDateString()}</td>
            <td><button type="button" className="btn btn-primary" onClick={() => handleEditClick(client)}>Edit</button></td>
            {/* <td><button type="button" className="btn btn-primary" onClick={() => handleClientOverviewClick(client)}>See Client Details</button></td> */}
            {/* <td><button type="button" className="btn btn-primary" onClick={() => handleSeeOverviewClick(client)}>See Assessment</button></td> */}
        </tr>
        )
        } else if(client.status === 'Not Yet Started'){
            return(
                <tr>
                    <td>{client.company_name}</td>
                    <td>{new Date(client.engagement_date).toLocaleDateString()}</td>
                    <td><button type="button" className="btn btn-primary" onClick={() => handleStartClick(client)}>Start Assessment</button></td>
                    {/* <td><button type="button" className="btn btn-primary" onClick={() => handleClientOverviewClick(client)}>See Client Details</button></td> */}
                    {/* <td><button type="button" className="btn btn-primary" onClick={() => handleSeeOverviewClick(client)}>See Assessment</button></td> */}
                </tr>
                )
        }
}

export default DashboardTableOperatorAssessments;
