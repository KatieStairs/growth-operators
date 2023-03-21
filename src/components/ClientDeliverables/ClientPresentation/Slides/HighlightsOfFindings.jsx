import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import SlideHeader from './SlideHeader';

function HighlightsOfFindings () {
  const strengths = useSelector(store => store.presentation.strengthTags)
  const opportunities = useSelector(store => store.presentation.opportunityTags)
  const title = 'Highlights of Findings'
  // I commented out the first section as it seems redundant
  return (
    <>
      {/* <section>
        <SlideHeader title={title} />
        <h1>Highlights of Findings</h1>
      </section> */}

      <section>
        <SlideHeader title={title} />
        <h3>Top Strengths</h3>
        <table>
          <thead>
          <tr>
            <td>Bucket</td>
            <td>Area of Focus</td>
            <td>Findings</td>
            <td>Impact</td>
            </tr>
          </thead>
          <tbody>
            {[strengths].map((strength) => {
              return (
            <tr key={strength.subfunction_id}>
              <td>{strength.bucket_name}</td>
              <td>{strength.function_name}</td>
              <td>{strength.findings}</td>
              <td>{strength.impact}</td>
            </tr>
            )})}
          </tbody>
        </table>
      </section>

      <section>
      <SlideHeader title={title} />
      <h3>Top Opportunities</h3>
        <table>
          <thead>
          <tr>
            <td>Bucket</td>
            <td>Area of Focus</td>
            <td>Findings</td>
            <td>Impact</td>
            </tr>
          </thead>
          <tbody>
            {[opportunities].map((opportunity) => {
              return (
            <tr key={opportunity.subfunction_id}>
              <td>{opportunity.bucket_name}</td>
              <td>{opportunity.function_name}</td>
              <td>{opportunity.findings}</td>
              <td>{opportunity.impact}</td>
            </tr>
            )})}
          </tbody>
        </table>
      </section>
    </>
  )
};

export default HighlightsOfFindings;