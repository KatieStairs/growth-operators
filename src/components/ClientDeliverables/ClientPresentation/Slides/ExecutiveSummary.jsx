import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

function ExecutiveSummary () {
  const summaryRatings = useSelector((store) => store.presentation.summaryRatings);
  const ratings = [
    summaryRatings.organizational_effectiveness_rating,
    summaryRatings.employee_engagement_rating,
    summaryRatings.training_development_rating,
    summaryRatings.benefits_compensation_rating,
    summaryRatings.recruiting_staffing_rating,
    summaryRatings.hris_payroll_compliance_rating
  ];

  const data = {
    labels: [
      'Organizational Effectiveness',
      'Employee Engagement',
      'Training & Development',
      'Benefits & Compensation',
      'Recruiting & Staffing',
      'HRIS, Payroll & Compliance'
    ],
    datasets: [
      {
        label: 'Assessment Overview Ratings',
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
      <Radar data={data} options={options}/>
    </section>
  )
};

export default ExecutiveSummary;