import React from 'react';
import { useHistory } from 'react-router-dom';
// this is the second table in the operator dashboard
function DashboardTableOperatorAssessments({ client }) {
    const history = useHistory();
    // this will take the operator to the edit page
    const handleEditClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('edit id clicked', assessmentId);
        history.push(`/assessment-edit/${assessmentId}`)
    }
    // this will take the operator to the Details/assessment answers page
    const handleDetailsClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('details id clicked', assessmentId);
        history.push(`/assessment-answers/${assessmentId}`)
    }
    // this will take the operator to see the assessment
    const handleSeeClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('see id clicked', assessmentId);
        // this one will have to be changed to see assessment
        history.push(`/assessment-answers/${assessmentId}`)
    }
    const handleClientClick = (client) => {
        let clientId = client.client_id;
        // console.log('client id clicked', clientId);
        history.push(`/client-overview/${clientId}`)
    }
    if(client.status === 'Edit in Progress'){
return (
    <tr>
        <td onClick={() => handleClientClick(client)}><a href="#" className="pe-auto">{client.company_name}</a></td>
        <td>{new Date(client.engagement_date).toLocaleDateString()}</td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleEditClick(client)}>Edit</button></td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleDetailsClick(client)}>See Details</button></td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleSeeClick(client)}>See Assessment</button></td>
    </tr>
)
}
}

export default DashboardTableOperatorAssessments;
