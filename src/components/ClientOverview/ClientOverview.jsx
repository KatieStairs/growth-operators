import React from 'react';
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
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
  const params = useParams();
  const clientOverview = useSelector((store) => store.client.clientOverview || []);

  useEffect(() => {
    dispatch({
      type: 'SAGA/GET_CLIENT_OVERVIEW',
      payload: { clientId: params.client_id }
    })
  }, [dispatch])



  //Data for Radar Chart
  let chartLabels = [];
  let chartLevelRatings = [];
   if (clientOverview.length > 0) {
    chartLabels = clientOverview.map(client => client.bucket_name);
    chartLevelRatings = clientOverview.map(client => client.level_rating);
   }
 

  
  
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




  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <Nav />
        <div className="col-1 py-3 ">
          <button data-bs-toggle="collapse" data-bs-target="#sidebar" class="btn btn-primary">Toggle Menu</button>
        </div>
        <div className="col py-3">
          <div class="container-fluid text-center">
            <div class="row">
              <div class="col">
                <h1>{clientOverview[0] && clientOverview[0].company_name} Summary View</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-1 background-dark">
                <ul class="nav nav-tabs align-items-center flex-column">
                  <li><a class="nav-link active" data-bs-toggle="tab" data-bs-target="#overview">Overview</a></li>
                  {clientOverview.map((bucket) => (
                      <li key={bucket.id}><a class="nav-link" data-bs-toggle="tab" data-bs-target={`#menu${bucket.id.toString()}`}>{bucket.bucket_name}</a></li>  
                  ))}
                  {/* <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu2">Organizational Effectiveness</a></li>
                  <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu3">Employee Engagement</a></li>
                  <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu4">Training & Development</a></li>
                  <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu5">Benefits & Compensation</a></li>
                  <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu6">Recruiting & Staffing</a></li>
                  <li><a class="nav-link" data-toggle="tab" data-bs-target="#menu7">HRIS, Payroll & Compliance</a></li> */}
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
                            <>
                            <ul>
                              {tag.tag_name === '🏆 Quick Win'  &&
                                <li>{tag.tag_name} - {tag.subfunction_name}</li>
                              }
                              {tag.tag_name === '🔥 Fire Drill'  &&
                                <li>{tag.tag_name} - {tag.subfunction_name}</li>
                              }
                            </ul>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  {clientOverview.map((bucket) => (
                     <div id={`menu${bucket.id.toString()}`} class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>{bucket.bucket_name}</h2>
                            <h4>Level Rating: {bucket.level_rating}</h4>
                            <Radar data ={chartData}/>
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul>
                              {bucket.tag_name === '💪 Strength - Add to Slide' &&
                                <li>{bucket.subfunction_name}</li>
                              }
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul>
                            {bucket.tag_name === '✍️ Opportunity - Add to Slide' &&
                              <li>{bucket.subfunction_name}</li>
                            }
                            </ul>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
            </div>
            <div class="row justify-content-end">
              <div class='col-2'>
                <a class="btn btn-primary" href={`/assessment-edit/${clientOverview[0].assessment_id}`}>See Assessment</a>
              </div>
              <div class='col-2'>
                <a class="btn btn-primary" href={`/client-report/${clientOverview[0].assessment_id}`}>Download Report</a>
              </div>
              <div class='col-2'>
                <a class="btn btn-primary" href={`/presentation/${clientOverview[0].assessment_id}`}>See Presentation</a>
              </div>
            </div>
        </div>  
    </div>
  </div>
</div>

  );
}

export default ClientOverview;
