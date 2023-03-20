import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// this is the second table in the operator dashboard
function ActiveAssessmentsTable({ client }) {
    const history = useHistory();
      const user = useSelector((store) => store.user);
    // this will take the operator to the edit page
    const handleEditClick = (client) => {
        let assessmentId = client.assessment_id;
        history.push(`/assessment-edit/${assessmentId}`)
    }
    // this will take the operator to the client overview answers page
    const handleClientOverviewClick = (client) => {
        let clientId = client.client_id;
        history.push(`/client-overview/${clientId}`)
    }
    // this will take the operator to see the assessment's presentation
    const handlePresentationClick = (client) => {
        let assessmentId = client.assessment_id;
        history.push(`/presentation/${assessmentId}`)
    }
    // this will take the operator to see the assessment's report
    const handleReportClick = (client) => {
        let assessmentId = client.assessment_id;
        history.push(`/client-report/${assessmentId}`)
    }

    if(client.status === 'Active'){
    return (
        <tr>
            <td>{client.company_name}</td>
            <td>{client.status}</td>
            <td>{new Date(client.engagement_date).toLocaleDateString()}</td>
            <td><button type="button" className="btn btn-outline-primary" onClick={() => handleEditClick(client)}>Review Assessment</button></td>
            <td><button type="button" className="btn btn-outline-primary" onClick={() => handleClientOverviewClick(client)}>See Overview</button></td>
            <td><button type="button" className="btn btn-outline-primary" onClick={() => handlePresentationClick(client)}>See Presentation</button></td>
            <td><button type="button" className="btn btn-outline-primary" onClick={() => handleReportClick(client)}>See Report</button></td>
        </tr>
        )
        } 
}

export default ActiveAssessmentsTable;
