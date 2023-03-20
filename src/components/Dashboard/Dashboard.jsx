import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useLocation } from "react-router-dom";
import './Dashboard.css';

// this is the Operator Dashboard
// CUSTOM COMPONENTS
import CreateNewClientModal from './CreateNewClientModal';
import DashboardTableActiveAssessments from './DashboardTableActiveAssessments';
import DashboardTableOperatorAssessments from './DashboardTableOperatorAssessments';
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
    <div className="container">
      <h1>nextLEVEL - Operator Dashboard</h1>

        <h2>Welcome, {user.username}!</h2>
          <div className="grid">
            <div className="grid-col grid-col_8 mt-3 mb-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Status</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {operatorDashboard.operatorDashboard.map((client) => {
                      return <DashboardTableActiveAssessments key={client.assessment_id} client={client}/>
                  })}
                </tbody>
              </table>
            </div>
            <CreateNewClientModal />

            <div className="grid-col grid-col_10 mt-3 mb-3 g-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Engagement Start</th>
                    <th>Edit</th>
                    {/* <th>See Client Detail</th> */}
                    {/* <th>See Assessment</th> */}
                  </tr>
                </thead>
                <tbody>
                  {operatorDashboard.operatorDashboard.map((client) => {
                      return <DashboardTableOperatorAssessments key={client.assessment_id} client={client}/>
                  })}
                </tbody>
              </table>
              {/* just putting this here for now */}
              
              <div className="col-auto g-3">

              <Link to="/all-clients">
                <button className="btn btn-link">All Clients</button>
              </Link>//
              <Link to="/assessment-edit/2">
                <button className="btn btn-link">Edit (All Answers)</button>
              </Link>//
              <Link to="/assessment-form/2/2/5">
                <button className="btn btn-link">Assessment Form</button>
              </Link>//
              <Link to="/assessment-review/2/2">
                <button className="btn btn-link">Review Assessment Submission</button>
              </Link>//
              <Link to="/assessment-form/2/final-slide-inputs">
                <button className="btn btn-link">Assessment Form (End)</button>
              </Link>//
              <Link to="/presentation">
                <button className="btn btn-link">Presentation</button>
              </Link>
              </div>
              <LogOutButton />
            </div>
            
          </div>

    </div>
    </>
  );
}

export default Dashboard;