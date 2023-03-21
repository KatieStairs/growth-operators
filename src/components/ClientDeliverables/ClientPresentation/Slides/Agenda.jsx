import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

import SlideHeader from './SlideHeader';

function Agenda () {
  const title = 'Executive Summary';
  return (
    <section>
      <SlideHeader title={title} />
      <div>
      {/* <h1 className="presentation-h1">Agenda</h1> */}
      <p className="page-sub-heading">
        <strong>Assessment Results</strong>: Meeting Agenda
      </p>
      <div className="agenda-list">

      
      <ol>
        <li>Objectives</li>
        <li>Methodology Overview & Definitions</li>
        <li>Highlights of Findings</li>
        {/* <ul>
          <li>Top Strengths</li>
          <li>Top Opportunities</li>
        </ul>
        <li>Findings by Topic</li> */}
        <li>Key Initial Focus Areas & Recommendations</li>
        <li>Next Steps</li>
      </ol>
      </div>
      </div>
    </section>
  )
};

export default Agenda;