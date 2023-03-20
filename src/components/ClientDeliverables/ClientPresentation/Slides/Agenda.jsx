import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

function Agenda () {
  return (
    <section>
      <h2>Agenda</h2>
      <ul>
        <li>Objectives</li>
        <li>Methodology Overview & Definitions</li>
        <li>Highlights of Findings</li>
        <ul>
          <li>Top Strengths</li>
          <li>Top Opportunities</li>
        </ul>
        <li>Findings by Topic</li>
        <li>Key Initial Focus Areas & Recommendations</li>
        <li>Next Steps</li>
      </ul>
    </section>
  )
};

export default Agenda;