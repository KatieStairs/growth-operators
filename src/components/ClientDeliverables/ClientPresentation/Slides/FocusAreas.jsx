import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

function FocusAreas () {
  const opportunities = useSelector(store => store.presentation.opportunityTags)
  return (
    <section>
      <table className="table table-hover table-striped">
        <thead>
        <tr>
          <th scope="col">Bucket</th>
          <th scope="col">Area of Focus</th>
          <th scope="col">Findings</th>
          <th scope="col">Impact</th>
          <th scope="col">Recommendations</th>
          </tr>
        </thead>
        <tbody>
          {[opportunities].map((opportunity) =>{
            return (
              <tr key={opportunity.subfunction_id}>
                <th scope="row">{opportunity.bucket_name}</th>
                <td>{opportunity.function_name}</td>
                <td>{opportunity.findings}</td>
                <td>{opportunity.impact}</td>
                <td>{opportunity.recommendations}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
};

export default FocusAreas;