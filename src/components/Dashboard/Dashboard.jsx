import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function Dashboard() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <table>
            
          </table>
          <p>
            Dashboard - In Progress needs table
          </p>
          <p>
          Client Name Process Step Edit
          </p>
        </div>
        {/* <form className="form-panel"> */}
          <div className="grid-col grid-col_4">
          <button>Create New Client</button>

            {/* <RegisterForm /> */}
            {/* <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
            </center> */}
          </div>
        {/* </form> */}
        <div className="grid-col grid-col_10">
          <p>
            Dashboard - Current Clients needs table
          </p>
          <p>
            Client Name, Engagement Start, Current Phase, Level, Edit Button, See Details Button, Save Assessment Button
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
