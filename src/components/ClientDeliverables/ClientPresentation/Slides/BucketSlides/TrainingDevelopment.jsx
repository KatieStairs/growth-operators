import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

function TrainingDevelopment () {
  const bucketData = useSelector(store => store.presentation.bucketData.bucket3)
  const bucketTags = useSelector(store => store.presentation.bucketTags.bucket3)

  const ratings = [
    bucketData.company_wide_compliance_rating,
    bucketData.employee_resources_rating,
    bucketData.new_hire_orientation_onboarding_rating,
    bucketData.assessment_tracking_measurement_rating
  ];

  const data = {
    labels: [
      'Company-Wide Compliance',
      'Employee Resources',
      'New Hire Orientation & Onboarding',
      'Training & Tools',
      'Assessment, Tracking, Measurement'
    ],
    datasets: [
      {
        label: 'Training & Development Ratings',
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
      <h3>Training & Development</h3>
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

export default TrainingDevelopment;