import React from 'react';
import { useHistory,  } from 'react-router-dom';
import { useSelector } from 'react-redux';

//this is the first table in the operator dashboard
function InProgressAssessmentsTable({ client }) {
    const history = useHistory();
    const user = useSelector((store) => store.user);

    // this will take the operator to the edit page
    const handleEditClick = (client) => {
        let assessmentId = client.assessment_id;
        history.push(`/assessment-edit/${assessmentId}`)
    }
    const handleClientClick = (client) => {
        let clientId = client.client_id;
        history.push(`/client-overview/${clientId}`)
    }
    const handleStartClick = (client) => {
        let assessmentId = client.assessment_id;
        history.push(`assessment-form/${assessmentId}/1/1`)
    }
    if(client.status === 'Edit in Progress' ){
        return (
            <tr>
                <td>{client.company_name}</td>  
                <td>{client.status}</td>
                <td><button type="button" className="btn btn-primary" onClick={() => handleEditClick(client)}>Review Assessment</button></td>
            </tr>
            )
    } else if(client.status === 'Not Yet Started'){
        return (
            <tr>
                <td>{client.company_name}</td>  
                <td>{client.status}</td>
                <td><button type="button" className="btn btn-primary" onClick={() => handleStartClick(client)}>Start Assessment</button></td>
            </tr>
            )
    }
}

export default InProgressAssessmentsTable;