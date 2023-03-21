import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import SlideHeader from './SlideHeader';

function Objectives () {
  const title = 'Objectives of this Assessment'
  return (
    <section>
      {/* <h2>Objectives of this Assessment:</h2> */}
      <SlideHeader title={title} />
      <ol>
      <li>Assess your current HR practices compared to HR industry best practices</li>
      <li>Develop and share actionable recommendations</li>
      <li>Prioritize potential work to address top areas of concern</li>
      <li>Provide insights into potential HR capabilities for the future</li>
      </ol>
    </section>
  )
};

export default Objectives;