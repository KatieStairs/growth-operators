import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import '../Presentation.css';
import SlideHeader from './SlideHeader';

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
  const title = 'Executive Summary';

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
        // backgroundColor: 'rgba(255, 99, 132, 0.2)',
        backgroundColor: '#655dc6',
        // borderColor: 'rgba(255, 99, 132, 1)',
        borderColor: '#001e61',
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
    <section className='bucket-chart'>
    <SlideHeader title={title} />
      <div style={{ position: "relative", margin: "auto", width: "80vw"}}>
      <Radar data={data} options={options} width={50} height={50}/>
      </div>
    </section> 
    </>
  )
};

export default ExecutiveSummary;