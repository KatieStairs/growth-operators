import React from 'react';
import { useHistory } from 'react-router-dom';

function DashboardTableOperatorAssessments({ client }) {
    const history = useHistory();

    const handleEditClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('edit id clicked', assessmentId);
        history.push(`/assessment-edit/${assessmentId}`)
    }
    const handleDetailsClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('details id clicked', assessmentId);
        history.push(`/assessment-answers/${assessmentId}}`)
    }
    const handleSeeClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('see id clicked', assessmentId);
        // this one will have to be changed
        history.push(`/assessment-answers/${assessmentId}`)
    }

return (
    <tr>
        <td>{client.company_name}</td>
        <td>{new Date(client.engagement_date).toLocaleDateString()}</td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleEditClick(client)}>Edit</button></td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleDetailsClick(client)}>See Details</button></td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleSeeClick(client)}>See Assessment</button></td>
    </tr>
)
}

export default DashboardTableOperatorAssessments;
