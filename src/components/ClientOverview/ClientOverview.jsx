import React from 'react';
import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import Nav from '../Nav/Nav';
// importing Chart.js
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
// importing Radar chart for Chart.js
import { Radar } from 'react-chartjs-2';
// Registering Chart
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


function ClientOverview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const clientOverview = useSelector((store) => store.client.clientOverview);

  useEffect(() => {
    dispatch({
      type: 'SAGA/GET_CLIENT_OVERVIEW',
      payload: clientObj
    })
  }, [dispatch])

  //Data for Radar Chart
  const chartLabels = clientOverview.map(client => client.bucket_name);
  console.log('chart labels', chartLabels)
  const chartLevelRatings = clientOverview.map(client => client.level_rating);
  console.log('chart data', chartLevelRatings);

  
  
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Level Rating',
        data: chartLevelRatings,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ],
    options: {
      plugins: {
        label: {
          display: false
        }
      }
    }
  };

  console.log("client side overview", clientOverview);


  const clientObj = {
    clientId: 1
  }


  return (
    <div className="container-fluid">
	    <div className="row flex-nowrap">
          <Nav />
          <div className="col-1 py-3 ">
          <button data-bs-toggle="collapse" data-bs-target="#sidebar">Toggle Menu</button>
          </div>
          <div className="col py-3">
            <div class="container-fluid text-center">
              <div class="row">
                <div class="col">
                  <h1>{clientOverview[0].company_name} Summary View</h1>
                </div>
              </div>
              <div class="row">
                <div class="col-1 background-dark">
                  <ul class="nav nav-tabs align-items-center flex-column">
                    <li><a class="nav-link active" data-toggle="tab" data-bs-target="#overview">Overview</a></li>
                    <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu2">Organizational Effectiveness</a></li>
                    <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu3">Employee Engagement</a></li>
                    <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu4">Training & Development</a></li>
                    <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu5">Benefits & Compensation</a></li>
                    <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu6">Recruiting & Staffing</a></li>
                    <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu7">HRIS, Payroll & Compliance</a></li>
                  </ul>
                </div>
                  <div class="tab-content col">
                    <div id="overview" class="tab-pane active container-fluid text-center">
                      <div class="row">
                        <div class="col">
                          <h2>Overview</h2>
                          <Radar data ={chartData}/>
                        </div>
                        <div class="col">
                          <h2>To-Dos</h2>
                            {clientOverview.map((tag) => (
                              <p>{tag.tag_name}</p>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div id="menu2" class="tab-pane container-fluid text-center tab">
                      <div class="row">
                        <div class="col">
                          <h2>{clientOverview[0].bucket_name}</h2>
                          <Radar data ={chartData}/>
                        </div>
                        <div class="col">
                          <h2>To-Dos</h2>
                            {clientOverview.map((tag) => (
                              <p>{tag.tag_name}</p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>	
      </div>
    </div>
  </div>
  );
}

export default ClientOverview;
