import React from 'react';
import { useHistory } from 'react-router-dom';

function DashboardTable2({ client }) {
    const history = useHistory();

    const handleEditClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('edit id clicked', assessmentId);
        // history.push(`/details/${trollId}`)
    }
    const handleDetailsClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('details id clicked', assessmentId);
        // history.push(`/details/${trollId}`)
    }
    const handleSeeClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('see id clicked', assessmentId);
        // history.push(`/details/${trollId}`)
    }

return (
    <tr>
        <td>{client.company_name}</td>
        <td>{new Date(client.engagement_date).toLocaleDateString()}</td>
        <td>{client.phase}</td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleEditClick(client)}>Edit</button></td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleDetailsClick(client)}>See Details</button></td>
        <td><button type="button" className="btn btn-primary" onClick={() => handleSeeClick(client)}>See Assessment</button></td>
    </tr>
)
}

export default DashboardTable2;
