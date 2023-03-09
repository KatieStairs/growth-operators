import React from 'react';
import { useHistory } from 'react-router-dom';


function DashboardTable1({ client }) {
    const history = useHistory();

    const handleClick = (client) => {
        let assessmentId = client.assessment_id;
        console.log('edit id clicked', assessmentId);
        // history.push(`/details/${trollId}`)
    }

return (
    <tr>
        <td>{client.company_name}</td>  
        <td>{client.status}</td>
        <td><button type="button" class="btn btn-primary" onClick={() => handleClick(client)}>Edit</button></td>
    </tr>
)
}

export default DashboardTable1;