import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import SlideHeader from '../SlideHeader';

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
    <SlideHeader title={'Training & Development'} />
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

export default TrainingDevelopment;