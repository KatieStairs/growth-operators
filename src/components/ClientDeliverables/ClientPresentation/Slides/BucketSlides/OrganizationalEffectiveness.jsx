import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import SlideHeader from '../SlideHeader';

function OrganizationalEffectiveness () {
  const bucketData = useSelector(store => store.presentation.bucketData.bucket1)
  const bucketTags = useSelector(store => store.presentation.bucketTags.bucket1)

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

  const title = 'Organizational Effectiveness';

  return (
    <>
      <section>
        <h1>Findings by Topic</h1>
      </section>

      <section>
      <div className="container mt-3">
      <SlideHeader title={title}/>
      <div className="grid">
        <div className="grid-col grid-col_8 mt-3 mb-3">
          <div className="container shadow min-vh-auto py-2 mt-3">

          </div>
        </div>
        </div>
        <div className="grid">
        <div className="grid-col grid-col_3 mt-5 ms-2">

            </div>
            </div>
        </div>
        <div className="grid">
        <div className="grid-col grid-col_8 mt-3 mb-3">
          <div className="container shadow min-vh-auto py-2 mt-3">

          </div>
        </div>
      </div>
          </div>
      </section>
      </>
  )
};

export default OrganizationalEffectiveness;


// <div style={{ position: "relative", marginTop: 25, width: "30vw"}}>
// {<Radar data={data} options={options}  marginLeft={256} width={10} height={10}/>}
// </div>

//           <h4>Fire Drills</h4>
//           <div className="table-responsive">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Subfunction</th>
//                 <th>Rating</th>
//                 <th>Findings</th>
//                 <th>Impact</th>
//                 <th>Recommendations</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bucketTags.map((tag) => {
//                 if (tag.tag_id == 2) {
//                   return (
//                     <tr key={tag.subfunction_id}>
//                       <td>{tag.function_name}</td>
//                       <td>{tag.level_rating}</td>
//                       <td>{tag.findings}</td>
//                       <td>{tag.impact}</td>
//                       <td>{tag.recommendations}</td>
//                     </tr>
//                   )
//                 }
//               })}
//             </tbody>
//           </table>
//           </div>

//                     <h4>Quick Fixes</h4>
//           <div className="table-responsive">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Subfunction</th>
//                 <th>Rating</th>
//                 <th>Findings</th>
//                 <th>Impact</th>
//                 <th>Recommendations</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bucketTags.map((tag) => {
//                 if (tag.tag_id == '1') {
//                   return (
//                     <tr key={tag.subfunction_id}>
//                       <td>{tag.function_name}</td>
//                       <td>{tag.level_rating}</td>
//                       <td>{tag.findings}</td>
//                       <td>{tag.impact}</td>
//                       <td>{tag.recommendations}</td>
//                     </tr>
//                   )
//                 } else {return}
//               })}
//             </tbody>
//           </table>
//           </div>