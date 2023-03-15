import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';


// CUSTOM COMPONENTS
import CreateNewClientModal from './CreateNewClientModal';
import DashboardTableActiveAssessments from './DashboardTableActiveAssessments';
import DashboardTableOperatorAssessments from './DashboardTableOperatorAssessments';

function Dashboard() {
  const dispatch = useDispatch();
  const operatorDashboard = useSelector(store => store.operatorDashboard);
  const user = useSelector((store) => store.user);
  console.log('in dashboard', operatorDashboard.operatorDashboard);
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
                  {operatorDashboard.operatorDashboard.map((client) => {
                      return <DashboardTableActiveAssessments key={client.assessment_id} client={client}/>
                  })}
                </tbody>
              </table>
            </div>
            <CreateNewClientModal />
            <div className="grid-col grid-col_10">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Engagement Start</th>
                    <th>Edit</th>
                    <th>See Detail</th>
                    <th>See Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {operatorDashboard.operatorDashboard.map((client) => {
                      return <DashboardTableOperatorAssessments key={client.assessment_id} client={client}/>
                  })}
                </tbody>
              </table>
            </div>
          </div>

    </div>
    </>
  );
}

export default Dashboard;