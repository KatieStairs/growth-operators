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
  };

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
  };


  return (
    <section>
      <SlideHeader title={'Payroll & Compliance'} />
      {/* <h3>HRIS, Payroll & Compliance</h3> */}
      {bucketData.headline_text}

      {/* <h4>Quick Fixes</h4>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Subfunction</th>
              <th scope="col">Rating</th>
              <th scope="col">Findings</th>
              <th scope="col">Impact</th>
              <th scope="col">Recommendations</th>
            </tr>
          </thead>
          <tbody>
            {bucketTags.map((tag) => {
              if (tag.tag_id == 1) {
                return (
                  <tr key={tag.subfunction_id}>
                    <th scope="row">{tag.function_name}</th>
                    <td>{tag.level_rating}</td>
                    <td>{tag.findings}</td>
                    <td>{tag.impact}</td>
                    <td>{tag.recommendations}</td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>

        <h4>Fire Drills</h4>
        <table className="table table-hover table-striped">
          <thead>
            <tr key={tag.subfunction_id}>
              <th scope="col">Subfunction</th>
              <th scope="col">Rating</th>
              <th scope="col">Findings</th>
              <th scope="col">Impact</th>
              <th scope="col">Recommendations</th>
            </tr>
          </thead>
          <tbody>
            {bucketTags.map((tag) => {
              if (tag.tag_id == 2) {
                return (
                  <tr>
                    <th scope="row">{tag.function_name}</th>
                    <td>{tag.level_rating}</td>
                    <td>{tag.findings}</td>
                    <td>{tag.impact}</td>
                    <td>{tag.recommendations}</td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table> */}

        <div style={{ position: "relative", marginTop: 25, width: "30vw"}}>
          {<Radar data={data} options={options}  marginLeft={256} width={10} height={10}/>}
        </div>
    </section>
  )
};

export default HRISPayrollCompliance;