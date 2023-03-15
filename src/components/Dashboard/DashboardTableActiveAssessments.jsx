import React from 'react';
import { useHistory } from 'react-router-dom';

//this is the first table in the operator dashboard
function DashboardTableActiveAssessments({ client }) {
    const history = useHistory();
    // this will take the operator to the edit page
    const handleEditClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('edit id clicked', assessmentId);
        history.push(`/assessment-edit/${assessmentId}`)
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
            <td>{client.status}</td>
            <td><button type="button" className="btn btn-primary" onClick={() => handleEditClick(client)}>Edit</button></td>
        </tr>
        )
    }
}

export default DashboardTableActiveAssessments;