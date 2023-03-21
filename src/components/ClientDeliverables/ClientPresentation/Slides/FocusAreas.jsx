import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import SlideHeader from './SlideHeader';

function FocusAreas () {
  const opportunities = useSelector(store => store.presentation.opportunityTags)
  return (
    <section>
      <SlideHeader title={'Focus Areas'} />
      <div className="container mt-3">
        <div className="grid">
          <div className="grid-col grid-col_12 mt-3 mb-3">
            <div className="container shadow min-vh-auto py-2 mt-3">
              <div className="table-responsive">
                <table className="table bucket-table">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default FocusAreas;