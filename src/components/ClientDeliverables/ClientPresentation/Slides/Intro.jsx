import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

function Intro ({ companyName }) {
  return (
   <section>
      <h2>nextLEVEL<small>&reg;</small> Assessment</h2>
      <h4>{companyName}</h4>
   </section>
   )
};

export default Intro;