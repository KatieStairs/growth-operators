import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import SlideHeader from '../SlideHeader';

function HRISPayrollCompliance () {
  const bucketData = useSelector(store => store.presentation.bucketData.bucket6)
  const bucketTags = useSelector(store => store.presentation.bucketTags.bucket6)

  const ratings = [
    bucketData.federal_state_local_requirements_rating,
    bucketData.employee_handbook_rating,
    bucketData.employee_data_rating,
    bucketData.unemployment_rating,
    bucketData.hr_legal_risk_management_rating,
    bucketData.payroll_rating,
    bucketData.ethics_corp_governance_rating,
    bucketData.safety_workers_compensation_rating,
    bucketData.labor_relations_rating,
    bucketData.safety_policies_rating
  ];

  const data = {
    labels: [
      'Federal, State & Local Requirements',
      'Employee Handbook',
      'Employee Data',
      'Unemployment',
      'HR Legal & Risk Management',
      'Payroll',
      'Ethics/Corp Governance',
      'Safety & Workers Compensation',
      'Labor Relations',
      'Safety Policies'
    ],
    datasets: [
      {
        label: 'HRIS, Payroll & Compliance Ratings',
        data: ratings,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  }; // Contains the data for the chart

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  }; // Contains the options for the chart


  return (
    <section>
    <SlideHeader title={'HRIS, Payroll & Compliance'} />
    {bucketData.headline_text}
    <div className="container mt-3">
      <div className="grid">
        <div className="grid-col grid-col_8 mt-3 mb-3">
          <div className="container shadow min-vh-auto py-2 mt-3">
          <h4>Quick Fixes</h4>
            <div className="table-responsive">
            <table className="table bucket-table">
              <thead>
                <tr>
                  <th>Subfunction</th>
                  <th>Rating</th>
                  <th>Findings</th>
                  <th>Impact</th>
                  <th>Recommendations</th>
                </tr>
              </thead>
              <tbody>
                {bucketTags.map((tag) => {
                  if (tag.tag_id == '1') {
                    return (
                      <tr key={tag.subfunction_id}>
                        <td>{tag.function_name}</td>
                        <td>{tag.level_rating}</td>
                        <td>{tag.findings}</td>
                        <td>{tag.impact}</td>
                        <td>{tag.recommendations}</td>
                      </tr>
                    )
                  } else {return}
                })} {/*Creates a table of the quick win tags for this bucket*/}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div  className="bucket-chart">
              <div style={{ position: "relative", marginTop: 25, width: "30vw"}}>
                {<Radar data={data} options={options}  marginLeft={256} width={10} height={10}/>}
              </div>
      </div>
        <div className="grid-col grid-col_8 mt-3 mb-3">
          <div className="container shadow min-vh-auto py-2 mt-3">
            <h4>Fire Drills</h4>
            <div className="table-responsive">
              <table className="table bucket-table">
                <thead>
                  <tr>
                    <th>Subfunction</th>
                    <th>Rating</th>
                    <th>Findings</th>
                    <th>Impact</th>
                    <th>Recommendations</th>
                  </tr>
                </thead>
                <tbody>
                  {bucketTags.map((tag) => {
                    if (tag.tag_id == 2) {
                      return (
                        <tr key={tag.subfunction_id}>
                          <td>{tag.function_name}</td>
                          <td>{tag.level_rating}</td>
                          <td>{tag.findings}</td>
                          <td>{tag.impact}</td>
                          <td>{tag.recommendations}</td>
                        </tr>
                      )
                    }
                  })} {/*Creates a table of the fire drill tags for this bucket*/}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
};

export default HRISPayrollCompliance;