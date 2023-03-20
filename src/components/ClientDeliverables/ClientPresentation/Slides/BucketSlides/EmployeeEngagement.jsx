import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

function EmployeeEngagement () {
  const bucketData = useSelector(store => store.presentation.bucketData.bucket2)
  const bucketTags = useSelector(store => store.presentation.bucketTags.bucket2)

  const ratings = [
    bucketData.employee_communication_rating,
    bucketData.measurement_rating,
    bucketData.workflow_procedures_structures_systems_rating,
    bucketData.succession_planning_rating,
    bucketData.recognition_rating,
    bucketData.charitable_giving_rating,
    bucketData.health_wellness_rating,
    bucketData.diversity_equity_inclusion_rating,
  ];

  const data = {
    labels: [
      'Employee Communication',
      'Measurement',
      'Problem Resolution',
      'Retention Planning & Analysis',
      'Recognition',
      'Charitable Giving',
      'Health & Wellness',
      'Diversity, Equity & Inclusion',
    ],
    datasets: [
      {
        label: 'Employee Engagement Ratings',
        data: ratings,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
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


  return (
    <section>
      <h3>Employee Engagement</h3>
      {bucketData.headline_text}

      <h4>Quick Fixes</h4>
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
              if (tag.tag_id == 2) {
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

      {<Radar data={data} options={options}/>}
    </section>
  )
};

export default EmployeeEngagement;