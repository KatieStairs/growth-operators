import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';


// CUSTOM COMPONENTS
import CreateNewClientModal from './CreateNewClientModal';
import DashboardTable1 from './DashboardTable1';
import DashboardTable2 from './DashboardTable2';

function Dashboard() {
  const dispatch = useDispatch();
  const clientDashboard = useSelector(store => store.clientDashboard);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
        type: 'SAGA/GET_CLIENT_DASHBOARD'
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
                  {clientDashboard.map((client) => {
                      return <DashboardTable1 key={client.assessment_id} client={client}/>
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
                    <th>Current Phase</th>
                    <th>Edit</th>
                    <th>See Detail</th>
                    <th>See Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {clientDashboard.map((client) => {
                      return <DashboardTable2 key={client.assessment_id} client={client}/>
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
