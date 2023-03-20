import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

function BenefitsCompensation () {
  const bucketData = useSelector(store => store.presentation.bucketData.bucket4)
  const bucketTags = useSelector(store => store.presentation.bucketTags.bucket4)

  const ratings = [
    bucketData.compensation_plan_philosophy_rating,
    bucketData.benefits_strategy_rating,
    bucketData.enrollment_rating,
    bucketData.employee_education_rating,
    bucketData.administer_benefit_comp_plans_rating,
    bucketData.compliance_rating
  ];

  const data = {
    labels: [
      'Compensation Plan/Philosophy',
      'Benefits Strategy',
      'Enrollment',
      'Employee Education',
      'Administer Benefit & Comp Plans',
      'Compliance'
    ],
    datasets: [
      {
        label: 'Benefits & Compensation Ratings',
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
      <h3>Benefits & Compensation</h3>
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
        <div style={{ position: "relative", marginTop: 25, width: "30vw"}}>
          {<Radar data={data} options={options}  marginLeft={256} width={10} height={10}/>}
        </div>
    </section>
  )
};

export default BenefitsCompensation;