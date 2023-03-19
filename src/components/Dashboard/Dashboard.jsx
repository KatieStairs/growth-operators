import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useLocation } from "react-router-dom";
import './Dashboard.css';

// this is the Operator Dashboard
// CUSTOM COMPONENTS
import CreateNewClientModal from './CreateNewClientModal';
import InProgressAssessmentsTable from './InProgressAssessmentsTable';
import ActiveAssessmentsTable from './ActiveAssessmentsTable';
import LogOutButton from '../LogOutButton/LogOutButton';

function Dashboard() {
  document.title = 'Dashboard';
  const dispatch = useDispatch();
  const operatorDashboard = useSelector(store => store.operatorDashboard);
  const user = useSelector((store) => store.user);
  // console.log('in dashboard', operatorDashboard.operatorDashboard);
  useEffect(() => {
    dispatch({
        type: 'SAGA/GET_OPERATOR_DASHBOARD'
    })
}, []);
 
  return (
    <>
    <div className="container mt-3">
      <h1>nextLEVEL - Operator Dashboard</h1>
      <h2>Welcome, {user.username}!</h2>
      <hr></hr>
      <div className="grid">
        <div className="grid-col grid-col_7 mt-3 mb-3">
          <div className="container shadow min-vh-auto py-2 mt-3">
            <h3>In Progress Assessments</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {operatorDashboard.operatorDashboard.map((client) => {
                      return <InProgressAssessmentsTable key={client.assessment_id} client={client}/>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="grid-col grid-col_4 mt-5 mx-auto align-middle text-center">
          <div className="container shadow min-vh-auto py-5">
          <CreateNewClientModal />
            <Link to="/all-clients">
              <button className="btn btn-outline-success mx-auto">See All Clients</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="grid-col grid-col_12 mt-3 mb-3">
          <div className="container shadow min-vh-auto py-2 mt-3">
            <h3>Active Assessments</h3>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client Name</th>                    
                    <th>Status</th>
                    <th>Engagement Start</th>
                    <th>Assessment</th>
                    <th>Client Overview</th> 
                    <th>Presentation</th>
                  </tr>
                </thead>
                <tbody>
                  {operatorDashboard.operatorDashboard.map((client) => {
                      return <ActiveAssessmentsTable key={client.assessment_id} client={client}/>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

            <div className="mt-3 mb-3">

            </div>

              
              
              {/* just putting this here for now */}
              

              

            <div className="grid-col_12">
            <LogOutButton />
            </div>
    </div>
    </>
  );
}

export default Dashboard;
