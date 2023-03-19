import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

function RecruitingStaffing () {
  const bucketData = useSelector(store => store.presentation.bucketData.bucket5)
  const bucketTags = useSelector(store => store.presentation.bucketTags.bucket5)

  const ratings = [
    bucketData.team_rationalization_synergies_rating,
    bucketData.selection_process_design_rating,
    bucketData.staffing_execution_admin_rating
  ];

  const data = {
    labels: [
      'Team Rationalization & Synergies',
      'Selection Process Design',
      'Staffing Execution/Admin'
    ],
    datasets: [
      {
        label: 'Recruiting & Staffing Ratings',
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
      <h3>Recruiting & Staffing</h3>
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
            {[bucketTags].map((tag) => {
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
            {[bucketTags].map((tag) => {
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
        </table> */}

      {<Radar data={data} options={options}/>}
    </section>
  )
};

export default RecruitingStaffing;