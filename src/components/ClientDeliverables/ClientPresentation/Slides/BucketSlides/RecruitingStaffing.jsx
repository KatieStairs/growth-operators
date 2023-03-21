import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import SlideHeader from '../SlideHeader';

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
    <SlideHeader title={'Recruiting & Staffing'} />
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
                })}
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
                  })}
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

export default RecruitingStaffing;