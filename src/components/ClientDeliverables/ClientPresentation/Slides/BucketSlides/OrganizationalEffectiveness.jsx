import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

function OrganizationalEffectiveness () {
  const bucketData = useSelector(store => store.presentation.bucketData.bucket1)
  const bucketTags = useSelector(store => store.presentation.bucketTags.bucket1)

  console.log('Bucket 1 Tags', bucketTags)

  const ratings = [
    bucketData.mission_vision_values_rating,
    bucketData.business_goals_org_alignment_rating,
    bucketData.workflow_procedures_structures_systems_rating,
    bucketData.succession_planning_rating
  ];

  const data = {
    labels: [
      'Mission, Vision, Values',
      'Business Goals & Org Alignment',
      'Workflow, Procedures, Structures & Systems',
      'Succession Planning'
    ],
    datasets: [
      {
        label: 'Organizational Effectiveness Ratings',
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
    <>
      <section>
        <h1>Findings by Topic</h1>
      </section>

      <section>
        <h3>Organizational Effectiveness</h3>
        {bucketData.headline_text}
        <div className="container">
        <div className="row">
        <div className="col-4">
          {<Radar data={data} options={options}/>}
        </div>
        </div>
        <div className="row">
        <div className="col">
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
                if (tag.tag_id == '1') {
                  return (
                    <tr key={tag.subfunction_id}>
                      <th scope="row">{tag.function_name}</th>
                      <td>{tag.level_rating}</td>
                      <td>{tag.findings}</td>
                      <td>{tag.impact}</td>
                      <td>{tag.recommendations}</td>
                    </tr>
                  )
                } else {return}
              })}
            </tbody>
          </table>
          </div>
          <div className="row">
          <div className="col">
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
          </div>
          </div>
        </div>
        </div>
      </section>
      </>
  )
};

export default OrganizationalEffectiveness;