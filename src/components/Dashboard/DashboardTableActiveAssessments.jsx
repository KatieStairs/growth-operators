import React from 'react';
import { useHistory } from 'react-router-dom';


function DashboardTableActiveAssessments({ client }) {
    const history = useHistory();

    const handleClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('edit id clicked', assessmentId);
        history.push(`/assessment-edit/${assessmentId}`)
    }

return (
    <tr>
        <td>{client.company_name}</td>  
        <td>{client.status}</td>
        <td><button type="button" class="btn btn-primary" onClick={() => handleClick(client)}>Edit</button></td>
    </tr>
)
}

export default DashboardTableActiveAssessments;