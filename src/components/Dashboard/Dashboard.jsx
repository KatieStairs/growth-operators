import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

// CUSTOM COMPONENTS
// import RegisterForm from '../RegisterForm/RegisterForm';

function Dashboard() {
  // const [heading, setHeading] = useState('Welcome');
  // const history = useHistory();
  const user = useSelector((store) => store.user);
  // const onLogin = (event) => {
  //   history.push('/login');
  // };

  return (
    <div className="container">
      {/* <h2>{heading}</h2> */}
      <h1>nextLEVEL - Operator Dashboard</h1>
      <h2>Welcome, {user.username}!</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <table class="table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Process Step</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Test Client</td>
                <td>1</td>
                <td><button>Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
          <div className="grid-col grid-col_4">
            <button>Create New Client</button>
          </div>

        <div className="grid-col grid-col_10">
          <table class="table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Engagement Start</th>
                <th>Current Phase</th>
                <th>Level</th>
                <th>Edit</th>
                <th>See Detail</th>
                <th>See Assessment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Test Client</td>
                <td>02/28/2023</td>
                <td>Phase 2</td>
                <td>3</td>
                <td><button>Edit</button></td>
                <td><button>See Details</button></td>
                <td><button>Save Assessment</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
