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
          <table className="table">
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
                <td>Edit In Process</td>
                <td><button type="button" className="btn btn-primary">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>


        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Create New Client
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Create New Client</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <div>
                  <h5>Company Name</h5>
                  <input
                    type='text'
                    // value={nameInput}
                    // onChange={(evt) => setNameInput(evt.target.value)} 
                  />
                </div>
                <div>
                  <h5>Contact Person</h5>
                  <input
                    type='text'
                    // value={nameInput}
                    // onChange={(evt) => setNameInput(evt.target.value)} 
                  />
                </div>
                <div>
                <h5>E-mail Address</h5>
                  <input
                    type='text'
                    // value={nameInput}
                    // onChange={(evt) => setNameInput(evt.target.value)} 
                  />
                </div>
                <div>
                <h5>Engagement Date</h5>
                  <input
                    type='date'
                    // value={nameInput}
                    // onChange={(evt) => setNameInput(evt.target.value)} 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
          {/* <div className="grid-col grid-col_4">
            <button type="button" className="btn btn-primary">Create New Client</button>
          </div> */}

        <div className="grid-col grid-col_10">
          <table className="table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Engagement Start</th>
                <th>Current Phase</th>
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
                <td><button type="button" className="btn btn-primary">Edit</button></td>
                <td><button type="button" className="btn btn-primary">See Details</button></td>
                <td><button type="button" className="btn btn-primary">Save Assessment</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
