import React from 'react';
import { useHistory,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//this is the first table in the operator dashboard
function DashboardTableActiveAssessments({ client }) {
    const history = useHistory();
    const user = useSelector((store) => store.user);
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
    const handleStartClick = (client) => {
        let assessmentId = client.assessment_id;
        // console.log('client id clicked', clientId);
        history.push(`assessment-form/${assessmentId}/1/1`)
    }
    if(client.status === 'Edit in Progress'){
        return (
            <tr>
                <td>{client.company_name}</td>  
                <td>{client.status}</td>
                <td><button type="button" className="btn btn-primary" onClick={() => handleEditClick(client)}>Edit</button></td>
            </tr>
            )
    } else if(client.status === 'Not Yet Started'){
        return (
            <tr>
                <td>{client.company_name}</td>  
                <td>{client.status}</td>
                <td><button type="button" className="btn btn-primary" onClick={() => handleStartClick(client)}>Start</button></td>
            </tr>
            )
    }
}

export default DashboardTableActiveAssessments;

// /assessment-form/:assessment_id/:bucket_id/:function_id