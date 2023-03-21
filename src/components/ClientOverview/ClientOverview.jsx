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

  const summaryRatings = useSelector((store) => store.presentation.summaryRatings);
  const ratings = [
    summaryRatings.organizational_effectiveness_rating,
    summaryRatings.employee_engagement_rating,
    summaryRatings.training_development_rating,
    summaryRatings.benefits_compensation_rating,
    summaryRatings.recruiting_staffing_rating,
    summaryRatings.hris_payroll_compliance_rating
  ];

  useEffect(() => {
    dispatch({
      type: 'SAGA/GET_CLIENT_OVERVIEW',
      payload: { clientId: params.client_id }
    })
  }, [dispatch])

  // function to get level rating average for each bucket
  function getLevelRatingAverage (search, criteria, value){
    const levelRatingsAverages = [];

    clientOverview.forEach(function(x) {
      if (x[criteria] === value) {
        levelRatingsAverages.push(x[search]);
      }
    });

    const sum = levelRatingsAverages.reduce((a, b) => a + b, 0);
    const average = sum / levelRatingsAverages.length

    if (isNaN(average)) {
      return '?'
    } else {
      return average
    }
  
  }

  // Level rating average of each bucket
  // const orgEffLevelRating = getLevelRatingAverage("level_rating", "bucket_name", "Organizational Effectiveness" );
  // const empEngLevelRating = getLevelRatingAverage("level_rating", "bucket_name", "Employee Engagement" );
  // const trainingLevelRating = getLevelRatingAverage("level_rating", "bucket_name", "Training & Development" );
  // const benefitsLevelRating = getLevelRatingAverage("level_rating", "bucket_name", "Benefits & Compensation" );
  // const recruitingLevelRating = getLevelRatingAverage("level_rating", "bucket_name", "Recruiting & Staffing" );
  // const hrisLevelRating = getLevelRatingAverage("level_rating", "bucket_name", "HRIS, Payroll & Compliance" );

  // Chart data nd configuration  
  const chartData = {
    labels: ["Organizational Effectiveness", "Employee Engagement", "Training & Development", "Benefits & Compensation", "Recruiting & Staffing", "HRIS, Payroll & Compliance"],
    datasets: [
      {
        label: 'Assessment Overview Ratings',
        data: ratings,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  };

  function findValueInBucket (search, criteria1, criteria2, value1, value2){
    const findings = [];

    clientOverview.forEach(function(x) {
      if (x[criteria1] === value1 & x[criteria2] === value2) {
        findings.push(x[search]);
      }
    });

    return findings
  }

  const orgEffStrengths = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Organizational Effectiveness", "💪 Strength - Add to Slide");
  const orgEffOpps = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Organizational Effectiveness", "✍️ Opportunity - Add to Slide");

  const empEngStrengths = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Employee Engagement", "💪 Strength - Add to Slide");
  const empEngOpps = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Employee Engagement", "✍️ Opportunity - Add to Slide");
  
  const trainingStrengths = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Training & Development", "💪 Strength - Add to Slide");
  const trainingOpps = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Training & Development", "✍️ Opportunity - Add to Slide");
  
  const benefitsStrengths = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Benefits & Compensation", "💪 Strength - Add to Slide");
  const benefitsOpps = findValueInBucket("subfunction_name", "bucket_name", "tag_name","Benefits & Compensation", "✍️ Opportunity - Add to Slide");
  
  const recruitingStrengths = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Recruiting & Staffing", "💪 Strength - Add to Slide");
  const recruitingOpps = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "Recruiting & Staffing", "✍️ Opportunity - Add to Slide");
  
  const hrisStrengths = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "HRIS, Payroll & Compliance", "💪 Strength - Add to Slide");
  const hrisOpps = findValueInBucket("subfunction_name", "bucket_name", "tag_name", "HRIS, Payroll & Compliance", "✍️ Opportunity - Add to Slide");
  




  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        {/* <div className="col-1 py-3 ">
          <button data-bs-toggle="collapse" data-bs-target="#sidebar" class="btn btn-primary">Toggle Menu</button>
        </div> */}
        <div className="col py-3">
          <div class="container-fluid text-center">
            <div class="row">
              <div class="col">
                <h1>{clientOverview[0] && clientOverview[0].company_name} Summary View</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-2 background-dark">
                <ul class="nav nav-tabs align-items-center flex-column">
                  <li><a class="nav-link active" data-bs-toggle="tab" data-bs-target="#overview">Overview</a></li>
                  {/* {clientOverview.map((bucket) => (
                      <li key={bucket.id}><a class="nav-link" data-bs-toggle="tab" data-bs-target={`#menu${bucket.id.toString()}`}>{bucket.bucket_name}</a></li>  
                  ))} */}
                  <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu2">Organizational Effectiveness</a></li>
                  <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu3">Employee Engagement</a></li>
                  <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu4">Training & Development</a></li>
                  <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu5">Benefits & Compensation</a></li>
                  <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu6">Recruiting & Staffing</a></li>
                  <li><a class="nav-link" data-bs-toggle="tab" data-bs-target="#menu7">HRIS, Payroll & Compliance</a></li>
                </ul>
              </div>
                <div class="tab-content col">
                  <div id="overview" class="tab-pane active container-fluid text-center">
                    <div class="row">
                      <div class="col">
                        <h2>Overview</h2>
                        <Radar data ={chartData} options={options}/>
                      </div>
                      <div class="col">
                        <h2>To-Dos</h2>
                          {clientOverview.map((tag) => (
                            <>
                            <ul class="list-group">
                              {tag.tag_name === '🏆 Quick Win'  &&
                                <li class="list-group-item">{tag.tag_name} - {tag.subfunction_name}</li>
                              }
                              {tag.tag_name === '🔥 Fire Drill'  &&
                                <li class="list-group-item">{tag.tag_name} - {tag.subfunction_name}</li>
                              }
                            </ul>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  {/* {clientOverview.map((bucket) => (
                     <div id={`menu${bucket.id.toString()}`} class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>{bucket.bucket_name}</h2>
                            <h4>Level Rating: {bucket.level_rating}</h4>
                            <Radar data ={chartData}/>
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul class="list-group">
                              {bucket.tag_name === '💪 Strength - Add to Slide' &&
                                <li class="list-group-item">{bucket.subfunction_name}</li>
                              }
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul class="list-group">
                            {bucket.tag_name === '✍️ Opportunity - Add to Slide' &&
                              <li class="list-group-item">{bucket.subfunction_name}</li>
                            }
                            </ul>
                          </div>
                        </div>
                      </div>
                  ))} */}
                    <div id="menu2" class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>Organizational Effectivness</h2>
                            <h4>Level Rating: {summaryRatings.organizational_effectiveness_rating}</h4>
                            <Radar data ={chartData} options={options} />
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul class="list-group">
                              {orgEffStrengths.map((strength) => (
                                <li class="list-group-item">{strength}</li>
                              ))}
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul class="list-group">
                            {orgEffOpps.map((opp) => (
                                <li class="list-group-item">{opp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div id="menu3" class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>Employee Engagement</h2>
                            <h4>Level Rating: {summaryRatings.employee_engagement_rating}</h4>
                            <Radar data ={chartData} options={options} />
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul class="list-group">
                              {empEngStrengths.map((strength) => (
                                <li class="list-group-item">{strength}</li>
                              ))}
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul class="list-group">
                            {empEngOpps.map((opp) => (
                                <li class="list-group-item">{opp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div id="menu4" class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>Training & Development</h2>
                            <h4>Level Rating: {summaryRatings.training_development_rating}</h4>
                            <Radar data ={chartData} options={options} />
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul class="list-group">
                              {trainingStrengths.map((strength) => (
                                <li class="list-group-item">{strength}</li>
                              ))}
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul class="list-group">
                            {trainingOpps.map((opp) => (
                                <li class="list-group-item">{opp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div id="menu5" class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>Benefits & Compensation</h2>
                            <h4>Level Rating: {summaryRatings.benefits_compensation_rating}</h4>
                            <Radar data ={chartData} options={options} />
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul class="list-group">
                              {benefitsStrengths.map((strength) => (
                                <li class="list-group-item">{strength}</li>
                              ))}
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul class="list-group">
                            {benefitsOpps.map((opp) => (
                                <li class="list-group-item">{opp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div id="menu6" class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>Recruiting & Staffing</h2>
                            <h4>Level Rating: {summaryRatings.recruiting_staffing_rating}</h4>
                            <Radar data ={chartData} options={options} />
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul class="list-group">
                              {recruitingStrengths.map((strength) => (
                                <li class="list-group-item">{strength}</li>
                              ))}
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul class="list-group">
                            {recruitingOpps.map((opp) => (
                                <li class="list-group-item">{opp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div id="menu7" class="tab-pane container-fluid text-center">
                        <div class="row">
                          <div class="col">
                            <h2>HRIS, Payroll & Compliance</h2>
                            <h4>Level Rating: {summaryRatings.hris_payroll_compliance_rating}</h4>
                            <Radar data ={chartData} options={options} />
                          </div>
                          <div class="col">
                            <h3>Strengths</h3>
                            <ul class="list-group">
                              {hrisStrengths.map((strength) => (
                                <li class="list-group-item">{strength}</li>
                              ))}
                            </ul>          
                          </div>
                          <div class="col">
                            <h3>Opportunities</h3>
                            <ul class="list-group">
                            {hrisOpps.map((opp) => (
                                <li class="list-group-item">{opp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
            <div class="row justify-content-end">
              <div class='col-1'>
                <a class="btn btn-primary" href={clientOverview[0] && `#/assessment-edit/${clientOverview[0].assessment_id}`}>See Assessment</a>
              </div>
              <div class='col-1'>
                <a class="btn btn-primary" href={clientOverview[0] && `#/client-report/${clientOverview[0].assessment_id}`}>See Report</a>
              </div>
              <div class='col-1'>
                <a class="btn btn-primary" href={clientOverview[0] && `#/presentation/${clientOverview[0].assessment_id}`}>See Presentation</a>
              </div>
              <div class='col-1'>
                <a class="btn btn-secondary" href='#/dashboard'>Return to Dashboard</a>
              </div>
            </div>
        </div>  
    </div>
  </div>
</div>

  );
}

export default ClientOverview;
